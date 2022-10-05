use async_trait::async_trait;
use carrel_db::entities::file;
use carrel_db::entities::file::Column;
use sea_orm::{ColumnTrait};
use carrel_db::entities::prelude::*;
use carrel_db::errors::database_error::SeaOrmDatabaseError;
use sea_orm::ActiveValue::Set;
use sea_orm::{EntityTrait, QueryFilter};
use sea_orm::sea_query::{SimpleExpr};
use crate::project::db_manager::carrel_db_manager::{CarrelDbManager, CarrelDbManagerTrait};

#[async_trait]
pub trait ManageFileTrait {
    // add list of files to the project
    async fn archive_add_files(&self, archive_id: i32, files: &Vec<String>) -> Result<(), SeaOrmDatabaseError>;

    // list all files in the archive
    async fn archive_list_files(&self, archive_id: i32) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;

    // filter archive_files
    async fn archive_filter_files(&self, archive_id: i32, filter: SimpleExpr) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;

    // remove files from the archive
    async fn archive_remove_files(&self, archive_id: i32, files: Vec<i32>) -> Result<(), SeaOrmDatabaseError>;

    // list all files
    async fn file_list_all_files(&self) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;
}


#[async_trait]
impl ManageFileTrait for CarrelDbManager {
    async fn archive_add_files(&self, archive_id: i32, files: &Vec<String>) -> Result<(), SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        // let files
        let files: Vec<file::ActiveModel> = files.iter().map(|file| {
            let mut file = file::ActiveModel::from(file.as_str());
            file.archive_id = Set(archive_id);
            file
        }).collect::<Vec<file::ActiveModel>>();
        File::insert_many(files).exec(&db).await.map_err(SeaOrmDatabaseError::DatabaseInsertError)?;

        Ok(())
    }

    async fn archive_list_files(&self, archive_id: i32) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let files = File::find()
            .filter(
                Column::ArchiveId.eq(archive_id)
            )
            .all(&db)
            .await.map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn archive_filter_files(&self, archive_id: i32, filter_conditions:SimpleExpr) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let files = File::find()
            .filter(
                Column::ArchiveId.eq(archive_id)
            )
            .filter(filter_conditions)
            .all(&db)
            .await.map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn archive_remove_files(&self, archive_id: i32, files: Vec<i32>) -> Result<(), SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        File::delete_many()
            .filter(
                Column::ArchiveId.eq(archive_id)
            )
            .filter(
                Column::Id.is_in(files)
            )
            .exec(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseDeleteError)?;
        Ok(())
    }

    async fn file_list_all_files(&self) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let files = File::find()
            .all(&db)
            .await.map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(files)
    }

}

#[cfg(test)]
mod tests {
    use carrel_db::entities::file;
    use sea_orm::ColumnTrait;
    use crate::project::file_manager::file_manager::ManageFileTrait;
    use crate::project::project_manager::project_manager::ProjectManager;
    use crate::test_utils::test_entities::{CarrelTester, TestEntities};

    #[tokio::test]
    async fn test_archive_list_files(){
        // get seeded db
        let db = CarrelTester::get_seeded_db().await;
        let project_manager = ProjectManager{
            db_manager: db,
            ..Default::default()
        };

        let files_in_archive_1 = project_manager.db_manager.archive_list_files(1).await.unwrap();
        // one file is seeded
        assert_eq!(files_in_archive_1.len(), 1);
        let files_in_archive_2 = project_manager.db_manager.archive_list_files(2).await.unwrap();
        // three files are seeded
        assert_eq!(files_in_archive_2.len(), 3);
    }

    #[tokio::test]
    async fn test_archive_filter_files(){
        // get seeded db
        let db = CarrelTester::get_seeded_db().await;
        let project_manager = ProjectManager{
            db_manager: db,
            ..Default::default()
        };

        let pdf_files_in_archive_2 = project_manager.db_manager.archive_filter_files(2, file::Column::Extension.like("pdf")).await.unwrap();
        // two archived pdf files are seeded
        assert_eq!(pdf_files_in_archive_2.len(), 2);

        let md_files_in_archive_2 = project_manager.db_manager.archive_filter_files(2, file::Column::Extension.like("md")).await.unwrap();
        // one archived md file is seeded
        assert_eq!(md_files_in_archive_2.len(), 1);

        let pdf_file_with_name_1
               = project_manager.db_manager.archive_filter_files(2,
                                                      file::Column::Extension.like("pdf")
                                                          .and(file::Column::FileName.like("seed_file_name_2_1")
                                                      )
        ).await.unwrap();

        // one archived pdf file with name seed_file_name_2_1 is seeded
        assert_eq!(pdf_file_with_name_1.len(), 1);
        let non_existing_file
               = project_manager.db_manager.archive_filter_files(2,
                                                      file::Column::Extension.like("pdf")
                                                          .and(file::Column::FileName.like("non_existing_file")
                                                      )
        ).await.unwrap();
         assert_eq!(non_existing_file.len(), 0);
    }
}
