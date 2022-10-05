use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::AddArchiveRequest;
use carrel_db::errors::database_error::SeaOrmDatabaseError;

// #[async_trait]
// pub trait ManageFileTrait {
//     // add list of files to the project
//     async fn archive_add_files(&self, archive_id: i32, files: &Vec<String>) -> Result<(), SeaOrmDatabaseError>;
//
//     // list all files in the archive
//     async fn archive_list_files(&self, archive_id: i32) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;
//
//     // filter archive_files
//     async fn archive_filter_files(&self, archive_id: i32, filter: SimpleExpr) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;
//
//     // remove files from the archive
//     async fn archive_remove_files(&self, archive_id: i32, files: Vec<i32>) -> Result<(), SeaOrmDatabaseError>;
// }
//
//
// #[async_trait]
// impl ManageFileTrait for CarrelDbManager {
//     async fn archive_add_files(&self, archive_id: i32, files: &Vec<String>) -> Result<(), SeaOrmDatabaseError> {
//         let db = self.get_connection().await;
//         // let files
//         let files: Vec<file::ActiveModel> = files.iter().map(|file| {
//             let mut file = file::ActiveModel::from(file.as_str());
//             file.archive_id = Set(archive_id);
//             file
//         }).collect::<Vec<file::ActiveModel>>();
//         File::insert_many(files).exec(&db).await.map_err(SeaOrmDatabaseError::DatabaseInsertError)?;
//
//         Ok(())
//     }
//
//     async fn archive_list_files(&self, archive_id: i32) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
//         let db = self.get_connection().await;
//         let files = File::find()
//             .filter(
//                 Column::ArchiveId.eq(archive_id)
//             )
//             .all(&db)
//             .await.map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
//         Ok(files)
//     }
//
//     async fn archive_filter_files(&self, archive_id: i32, filter_conditions:SimpleExpr) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
//         let db = self.get_connection().await;
//         let files = File::find()
//             .filter(
//                 Column::ArchiveId.eq(archive_id)
//             )
//             .filter(filter_conditions)
//             .all(&db)
//             .await.map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
//         Ok(files)
//     }
//
//     async fn archive_remove_files(&self, archive_id: i32, files: Vec<i32>) -> Result<(), SeaOrmDatabaseError> {
//         let db = self.get_connection().await;
//         File::delete_many()
//             .filter(
//                 Column::ArchiveId.eq(archive_id)
//             )
//             .filter(
//                 Column::Id.is_in(files)
//             )
//             .exec(&db)
//             .await
//             .map_err(SeaOrmDatabaseError::DatabaseDeleteError)?;
//         Ok(())
//     }
// }



#[async_trait]
pub trait Archivist {
       

}

