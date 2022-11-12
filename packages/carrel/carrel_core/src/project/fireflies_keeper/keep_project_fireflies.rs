//! Methods for managing the fireflies of a project.
//!
//! Compared to `KeepFireflies` trait, this handles project level operations such as scan all project files etc.
//!
//! The specific operations are done by the KeepFireflies trait which provides more general APIs.
//!
//! E.g. add_firefly is a general API, but add_firefly_from_project_files is a project level API.
use std::borrow::Borrow;
use std::ops::Deref;
use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use carrel_db::entities::file;
use itertools::Itertools;
use pdf_gongju::extract::errors::PdfGongjuError;
use pdf_gongju::extract::extractor::{PdfExtractor, PdfGongju};
use pdf_gongju::extract::extractor_options::ExtractorOption;
use rayon::prelude::ParallelSliceMut;
use sea_orm::ActiveValue::Set;
use sea_orm::IntoActiveModel;
use tokio::spawn;
use tokio::sync::Mutex;

use crate::project::db_manager::carrel_db_manager::CarrelDbManagerTrait;
use crate::project::error::project_error::ProjectError;
use crate::project::file_manager::file_manager::ManageFileTrait;
use crate::project::project_manager::project_manager::CarrelProjectManager;
use crate::project::to_manager::to_manager::KeepFireflies;

#[async_trait]
pub trait KeepProjectFireflies {
    /// Go over all archive flies and extract all outdated files and store them into to database.
    async fn sync_all_project_files(&self) -> Result<(), ProjectError>;
    /// Check project archive files for:
    /// - out of sync files
    /// - missing files
    /// Store the result in the database
    async fn update_project_file_status(&self) -> Result<(), ProjectError>;
    async fn sync_file_fireflies(
        &self,
        files: Vec<file::Model>,
    ) -> Result<(), ProjectError>;
}

#[async_trait]
impl KeepProjectFireflies for CarrelProjectManager {
    async fn sync_all_project_files(&self) -> Result<(), ProjectError> {
        // update project file status.
        self.update_project_file_status().await.unwrap();
        // list all files that are out of sync.
        let all_files = self.db.file_list_all_files().await.unwrap();
        let outdated_files = pick_outdated_files(all_files);
        // sync outdated files.
        self.sync_file_fireflies(outdated_files).await.unwrap();
        Ok(())
        // Ok(vec![])
    }

    async fn update_project_file_status(&self) -> Result<(), ProjectError> {
        let all_files = self.db.file_list_all_files().await.unwrap();
        // get active model from modes
        // this needs to be done in batches otherwise Sqlite Db will panic with "resource unavailable" at around 8000 recents.

        let db = self.db.get_connection().await;
        for chunk in all_files
            .chunks(self.db.batch_insert_size)
            .map(|chunk| chunk.to_vec())
        {
            for file in chunk {
                // model to active model
                let mut file_active_model = file.clone().into_active_model();

                let mut file_missing_file_changed = false;
                // load file path
                let file_path = PathBuf::from(file.full_path.as_str());
                // check if the file exists
                if !file_path.exists() && (file_active_model.is_missing_file.clone().unwrap() == 0) {
                    file_active_model.is_missing_file = Set(1);
                    file_missing_file_changed = true;
                }


                let mut file_modified_changed = false;
                // this modifies the active model but does not save it to the database
                let modified_at = file_active_model.get_file_latested_modified_at();


                // check if the file is outdated (modified_at is different from the one in the database)
                if modified_at != file.modified_at {
                    file_active_model.modified_at = Set(modified_at.clone());
                    file_modified_changed = true;
                }

                let synced_at = file_active_model.synced_at.clone().unwrap();

                let mut is_modified_later_than_synced = false;

                if synced_at.is_none() || synced_at.unwrap() < modified_at {
                    is_modified_later_than_synced = true;
                }

                let mut file_is_out_of_sync_changed = false;
                // use the above stats to decide whether the file model is out of sync
                file_active_model.is_out_of_sync = if file_modified_changed || is_modified_later_than_synced {
                    Set(1)
                } else {
                    Set(0)
                };
                if file_missing_file_changed || file_modified_changed || file_is_out_of_sync_changed {
                    let result = self.db.file_update_file(&db, file_active_model).await.unwrap();
                    // println!("Updated file: {:?}", result);
                }
            }
        }
        Ok(())
    }

    async fn sync_file_fireflies(
        &self,
        files: Vec<file::Model>,
    ) -> Result<(), ProjectError> {
        // break all pdf files to be processed into batches of 20s.
        let mut chunks_of_20 = files.into_iter().chunks(20).into_iter().map(
            |chunk| chunk.collect())
            .collect::<Vec<Vec<file::Model>>>();

        let length = chunks_of_20.len();

        let shared_db_conn = self.db.get_connection().await;
        let shared_db = Arc::new(Mutex::new(shared_db_conn));
        for i in 0..length {
            // take a chunk
            let chunk = chunks_of_20.remove(i);

            let mut handles = vec![];

            for file_cloned in chunk {
                let db = Arc::clone(&shared_db);
                let firefly_keeper = self.to.clone();
                let carrel_db_manager = self.db.clone();
                let handle = spawn(
                    async move {
                        // extract results with pdf-gongju
                        let extraction_result =
                            PdfGongju::extract_fireflies(file_cloned.full_path.as_str(), &ExtractorOption::default());
                        match extraction_result {
                            Ok(fireflies) => {
                                // skip if no fireflies
                                if !fireflies.is_empty() {
                                    // save fireflies to db.
                                    let _receipt = firefly_keeper.save_firefly_to_to_db(fireflies).await.unwrap();
                                }
                                let mut file_model = file_cloned.clone().into_active_model();
                                file_model.set_synced_at_now();
                                let borrowed_db = db.lock().await;
                                let _ = carrel_db_manager.file_update_file(borrowed_db.deref(), file_model).await.unwrap();
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
                );
                handles.push(handle);
            };
            // join_all(handles).await; // wait for 10 handles to finish
            for handle in handles {
                handle.await.unwrap();
            }
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
    use carrel_db::entities::file::Column;
    use carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf;
    use carrel_utils::uuid::new_v4;
    use sea_orm::ColumnTrait;
    use to_core::to_db::to_orm::ToOrmTrait;

    use crate::test_utils::carrel_tester::CarrelTester;
    use crate::test_utils::project_tester::ProjectTester;

    use super::*;

    #[tokio::test]
    async fn test_sync_files() {
        // get chn fixture file
        let pdf_path = get_test_fixture_module_folder_path_buf("pdfs");
        let chn_pdf_path = pdf_path.join("chn.pdf");
        let html_path = get_test_fixture_module_folder_path_buf("unsupported_file.html");
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
            .archive_add_files(1, &vec![
                chn_pdf_path.to_str().unwrap().to_string(),
                html_path.to_str().unwrap().to_string(),
            ])
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

        // should have synced the chn.pdf file
        pm.sync_file_fireflies(file_result).await.unwrap();

        let count_one_result = to_no_result.to_orm.count_tos().await.unwrap();
        assert_eq!(count_one_result, 3);



        // list all synced fireflies
        let list_all_firelies = pm.to.list_all_fireflies().await;
        assert_eq!(list_all_firelies.len(), 3);

        // first firefly
        let first_firefly = list_all_firelies.first().unwrap();
        // comment should include Page 0
        assert!(first_firefly.comment.contains("Highlight Text"));

        // first firefly should have a tag
        assert_eq!(first_firefly.tags.len(), 1);

        // assert first tag is importance
        let first_tag = first_firefly.tags.first().unwrap();
        assert_eq!(first_tag.key, "highlight");
        assert_eq!(first_tag.value.clone().unwrap(), "ARGUMENT");

        // find file unsupported
        let file_unsupported_result = pm
            .db
            .file_filter_file(Column::FileName.eq("unsupported_file.html"))
            .await
            .unwrap();

        // check if file is in db
        assert_eq!(file_unsupported_result.len(), 1);

        let first_unsupported_file = file_unsupported_result.first().unwrap();




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
        let _ = pm.db.file_update_file(&pm.db.get_connection().await, first_file_model).await.unwrap();

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
