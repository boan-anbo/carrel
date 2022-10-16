//! Methods for managing the fireflies of a project.
//!
//! Compared to `KeepFireflies` trait, this handles project level operations such as scan all project files etc.
//!
//! The specific operations are done by the KeepFireflies trait which provides more general APIs.
//!
//! E.g. add_firefly is a general API, but add_firefly_from_project_files is a project level API.

use crate::project::error::project_error::ProjectError;
use crate::project::file_manager::file_manager::ManageFileTrait;
use crate::project::project_manager::CarrelProjectManager;
use crate::project::to_manager::to_manager::KeepFireflies;
use async_trait::async_trait;
use carrel_db::entities::file;
use pdf_gongju::extract::errors::PdfGongjuError;
use pdf_gongju::extract::extractor::{PdfExtractor, PdfGongju};
use pdf_gongju::extract::extractor_options::ExtractorOption;
use sea_orm::ActiveValue::Set;
use sea_orm::IntoActiveModel;
use std::path::PathBuf;

#[async_trait]
pub trait KeepProjectFireflies {
    /// Go over all archive flies and extract all outdated files and store them into to database.
    async fn sync_all_project_files(&self) -> Result<Vec<file::Model>, ProjectError>;
    /// Check project archive files for:
    /// - out of sync files
    /// - missing files
    /// Store the result in the database
    async fn update_project_file_status(&self) -> Result<(), ProjectError>;
    async fn sync_file_fireflies(
        &self,
        files: Vec<file::Model>,
    ) -> Result<Vec<file::Model>, ProjectError>;
}

#[async_trait]
impl KeepProjectFireflies for CarrelProjectManager {
    async fn sync_all_project_files(&self) -> Result<Vec<file::Model>, ProjectError> {
        let all_files = self.db.file_list_all_files().await.unwrap();
        self.update_project_file_status().await.unwrap();
        let outdated_files = pick_outdated_files(all_files);
        let synced_files = self.sync_file_fireflies(outdated_files).await.unwrap();
        Ok(synced_files)
    }

    async fn sync_file_fireflies(
        &self,
        files: Vec<file::Model>,
    ) -> Result<Vec<file::Model>, ProjectError> {
        let mut updated_files: Vec<file::Model> = Vec::new();
        let extractor_opt = &ExtractorOption::default();
        for file in files {
            let extraction_result =
                PdfGongju::extract_fireflies(file.full_path.as_str(), extractor_opt);

            match extraction_result {
                Ok(fireflies) => {
                    let _receipt = self.to.save_firefly_to_to_db(fireflies).await.unwrap();
                    let mut file_model = file.into_active_model();
                    file_model.set_synced_at_now();
                    let updated_file = self.db.file_update_file(file_model).await.unwrap();
                    updated_files.push(updated_file);
                }
                Err(e) => match e {
                    PdfGongjuError::LoadPdfiumError => {
                        println!("Error: {:?}", e);
                    }
                    PdfGongjuError::LoadPdfError(_) => {
                        println!("Error: {:?}", e);
                    }
                    PdfGongjuError::LoadPdfPageError => {
                        println!("Error: {:?}", e);
                    }
                    PdfGongjuError::LoadPdfAnnotationError => {
                        println!("Error: {:?}", e);
                    }
                },
            }
        }
        Ok(updated_files)
    }

    async fn update_project_file_status(&self) -> Result<(), ProjectError> {
        let all_files = self.db.file_list_all_files().await.unwrap();
        // get active model from modes
        for file in all_files {
            // model to active model
            let mut file_model = file.into_active_model();

            let file_path = PathBuf::from(file_model.full_path.clone().unwrap());
            if !file_path.exists() {
                file_model.is_missing_file = Set(1);
            }

            // this modifies the active model but does not save it to the database
            let modified_at = file_model.get_file_latested_modified_at();

            file_model.modified_at = Set(modified_at);

            file_model.is_out_of_sync = if file_model.is_out_of_sync() {
                Set(1)
            } else {
                Set(0)
            };

            let _ = self.db.file_update_file(file_model).await.unwrap();
        }
        Ok(())
    }
}

/// return all files that are "outdated", that's file whose modified date is later than the last synced date.
fn pick_outdated_files(files: Vec<file::Model>) -> Vec<file::Model> {
    // loop over files and check the modified date of the file using fs library
    // if the modified date is later than the last synced date, add the file to the list of outdated files
    let result = files
        .into_iter()
        .filter(|file| file.is_out_of_sync == 1 && file.is_missing_file == 0)
        .collect();
    result
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_utils::carrel_tester::CarrelTester;
    use crate::test_utils::project_tester::ProjectTester;
    use carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf;
    use carrel_utils::uuid::new_v4;
    use sea_orm::sea_query::SimpleExpr::Column;
    use to_core::to_db::to_orm::{ToOrm, ToOrmTrait};

    #[tokio::test]
    async fn test_sync_files() {
        // get chn fixture file
        let pdf_path = get_test_fixture_module_folder_path_buf("pdfs");
        let chn_pdf_path = pdf_path.join("chn.pdf");
        assert!(chn_pdf_path.exists());

        let pm = CarrelTester::get_project_manager_with_seeded_db().await;

        // find by file name
        let file_no_result = pm
            .db
            .file_filter_file(Column::FileName.eq("chn.pdf"))
            .await
            .unwrap();

        //
        assert_eq!(file_no_result.len(), 0);

        // add file to db
        pm.db
            .archive_add_files(1, &vec![chn_pdf_path.to_str().unwrap().to_string()])
            .await
            .unwrap();

        // find by file name
        let file_result = pm
            .db
            .file_filter_file(Column::FileName.eq("chn.pdf"))
            .await
            .unwrap();

        // check if file is in db
        assert_eq!(file_result.len(), 1);

        let first_file = file_result.first().unwrap();
        assert_eq!(first_file.file_name, "chn.pdf");
        assert_eq!(first_file.synced_at.is_some(), false);

        // clear orm seeded data first
        pm.to.get_to_orm().await.clear().await.unwrap();

        // sync files

        let to_no_result = pm.to.get_tm().await.unwrap();
        let count_no_result = to_no_result.to_orm.count_tos().await.unwrap();
        assert_eq!(count_no_result, 0);

        let synced_files = pm.sync_file_fireflies(file_result).await.unwrap();

        assert_eq!(synced_files.len(), 1);

        let count_one_result = to_no_result.to_orm.count_tos().await.unwrap();
        assert_eq!(count_one_result, 3);

        let first_synced_file = synced_files.first().unwrap();
        assert_eq!(first_synced_file.synced_at.is_some(), true);
    }

    #[tokio::test]
    async fn test_update_project_file_status() {
        let pm = CarrelTester::get_project_manager_with_seeded_db().await;
        let pdf_path = get_test_fixture_module_folder_path_buf("pdfs");
        let chn_pdf_path = pdf_path.join("chn.pdf");
        assert!(chn_pdf_path.exists());

        // add file to db
        pm.db
            .archive_add_files(1, &vec![chn_pdf_path.to_str().unwrap().to_string()])
            .await
            .unwrap();

        // find by file name
        let file_result = pm
            .db
            .file_filter_file(Column::FileName.eq("chn.pdf"))
            .await
            .unwrap();

        // check if file is in db
        assert_eq!(file_result.len(), 1);

        let first_file = file_result.first().unwrap();
        assert_eq!(first_file.file_name, "chn.pdf");
        assert_eq!(first_file.synced_at.is_some(), false);
        assert_eq!(first_file.is_missing_file, 0);
        assert_eq!(first_file.is_out_of_sync, 1);

        // update file status
        pm.update_project_file_status().await.unwrap();

        // find by file name
        let file_result = pm
            .db
            .file_filter_file(Column::FileName.eq("chn.pdf"))
            .await
            .unwrap();

        // update file name
        let first_file = file_result.first().unwrap().to_owned();
        let mut first_file_model = first_file.into_active_model();
        first_file_model.file_name = Set("chn2.pdf".to_string());
        first_file_model.full_path = Set(new_v4().to_string());
        let _ = pm.db.file_update_file(first_file_model).await.unwrap();

        // update file status
        pm.update_project_file_status().await.unwrap();

        // find by file name
        let find_result_after_update = pm
            .db
            .file_filter_file(Column::FileName.eq("chn2.pdf"))
            .await
            .unwrap();

        // check if file is in db
        assert_eq!(find_result_after_update.len(), 1);

        let first_file_after_remove = find_result_after_update.first().unwrap();

        assert_eq!(first_file_after_remove.file_name, "chn2.pdf");
        assert_eq!(first_file_after_remove.synced_at.is_some(), false);
        assert_eq!(first_file_after_remove.is_missing_file, 1);
        assert_eq!(first_file_after_remove.is_out_of_sync, 1);
    }
}
