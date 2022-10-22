use async_trait::async_trait;
use carrel_commons::generic::api::query::v1::StandardQuery;
use carrel_db::entities::file;
use carrel_db::entities::file::{ActiveModel, Column, Model};
use carrel_db::entities::prelude::*;
use carrel_db::errors::database_error::SeaOrmDatabaseError;

use carrel_commons::implementations::generic_api_query_v1::QueryMutator;
use carrel_db::errors::database_error::SeaOrmDatabaseError::DatabaseUpdateError;
use carrel_db::query::query_file::{PebbleQueryFile, PebbleQueryFileTrait};
use pebble_query::pebble_query_result::PebbleQueryResult;
use sea_orm::ActiveValue::Set;
use sea_orm::{ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, PaginatorTrait, QueryFilter};

use crate::project::archivist::archive_query_conditions::CarrelDbConditions;
use crate::project::db_manager::carrel_db_manager::{CarrelDbManager, CarrelDbManagerTrait};
use sea_orm::sea_query::SimpleExpr;

#[async_trait]
pub trait ManageFileTrait {
    // add list of files to the project
    async fn archive_add_files(
        &self,
        archive_id: i32,
        files: &Vec<String>,
    ) -> Result<(), SeaOrmDatabaseError>;

    // list all files in the archive
    async fn archive_list_files(
        &self,
        archive_id: i32,
    ) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;

    // query files in specific the archive
    async fn archive_query_files(
        &self,
        archive_id: i32,
        query: &mut StandardQuery,
    ) -> Result<PebbleQueryResult<file::Entity>, SeaOrmDatabaseError>;

    // filter archive_files
    async fn archive_filter_files(
        &self,
        archive_id: i32,
        filter: SimpleExpr,
    ) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;

    // remove files from the archive
    async fn archive_remove_files(
        &self,
        archive_id: i32,
        files: Vec<i32>,
    ) -> Result<(), SeaOrmDatabaseError>;

    // list all files
    async fn file_list_all_files(&self) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;

    // count all files
    async fn file_count_all_files(&self) -> Result<i64, SeaOrmDatabaseError>;

    // get file by uuid
    async fn file_get_file_by_uuid(
        &self,
        archive_id: i32,
        uuid: &str,
    ) -> Result<Option<file::Model>, SeaOrmDatabaseError>;

    // get files by uuid
    async fn file_get_files_by_uuid(
        &self,
        archive_id: i32,
        uuid: Vec<String>,
    ) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;

    // remove files by uuid
    async fn archive_remove_files_by_uuid(
        &self,
        archive_id: i32,
        uuid: Vec<String>,
    ) -> Result<u64, SeaOrmDatabaseError>;

    // update one file
    async fn file_update_file(
        &self,
        db: &DatabaseConnection,
        file: file::ActiveModel,
    ) -> Result<file::Model, SeaOrmDatabaseError>;

    // filter file
    async fn file_filter_file(
        &self,
        filter: SimpleExpr,
    ) -> Result<Vec<file::Model>, SeaOrmDatabaseError>;

    // query files
    async fn query_files(
        &self,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<file::Entity>, SeaOrmDatabaseError>;
}

#[async_trait]
impl ManageFileTrait for CarrelDbManager {
    async fn archive_add_files(
        &self,
        archive_id: i32,
        files: &Vec<String>,
    ) -> Result<(), SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        // let files
        let files: Vec<file::ActiveModel> = files
            .iter()
            .map(|file| {
                let mut file = file::ActiveModel::from(file.as_str());
                file.archive_id = Set(archive_id);
                file
            })
            .collect::<Vec<file::ActiveModel>>();

        // File::insert_many(files).exec(&db).await.map_err(SeaOrmDatabaseError::DatabaseInsertError)?;

        // do the above in chunks
        // break the file insert into chunks, to avoid the error: "too many SQL variables" which is Sqlite specific limitation
        for chunk in files
            .chunks(self.batch_insert_size)
            .map(|chunk| chunk.to_vec())
        {
            File::insert_many(chunk)
                .exec(&db)
                .await
                .map_err(SeaOrmDatabaseError::DatabaseInsertError)?;
        }

        Ok(())
    }

    async fn archive_list_files(
        &self,
        archive_id: i32,
    ) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let files = File::find()
            .filter(Column::ArchiveId.eq(archive_id))
            .all(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn archive_query_files(
        &self,
        archive_id: i32,
        query: &mut StandardQuery,
    ) -> Result<PebbleQueryResult<file::Entity>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;

        let belong_to_archive_condition = CarrelDbConditions::archive_eq_id_condition(archive_id);

        let final_query = query.must_have(vec![belong_to_archive_condition]);

        let result = PebbleQueryFile::query_files(&db, final_query)
            .await
            .map_err(SeaOrmDatabaseError::PebbleQueryError)?;

        Ok(result)
    }

    async fn archive_filter_files(
        &self,
        archive_id: i32,
        filter_conditions: SimpleExpr,
    ) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let files = file::Entity::find()
            .filter(Column::ArchiveId.eq(archive_id))
            .filter(filter_conditions)
            .all(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn archive_remove_files(
        &self,
        archive_id: i32,
        files: Vec<i32>,
    ) -> Result<(), SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        file::Entity::delete_many()
            .filter(file::Column::ArchiveId.eq(archive_id))
            .filter(file::Column::Id.is_in(files))
            .exec(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseDeleteError)?;
        Ok(())
    }

    async fn file_list_all_files(&self) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let files = File::find()
            .all(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn file_count_all_files(&self) -> Result<i64, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let count = File::find()
            .count(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(count as i64)
    }

    async fn file_get_file_by_uuid(
        &self,
        archive_id: i32,
        uuid: &str,
    ) -> Result<Option<Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let file = File::find()
            .filter(Column::ArchiveId.eq(archive_id))
            .filter(Column::Uuid.eq(uuid))
            .one(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(file)
    }

    async fn file_get_files_by_uuid(
        &self,
        archive_id: i32,
        uuids: Vec<String>,
    ) -> Result<Vec<Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let files = File::find()
            .filter(Column::ArchiveId.eq(archive_id))
            .filter(Column::Uuid.is_in(uuids))
            .all(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn archive_remove_files_by_uuid(
        &self,
        archive_id: i32,
        uuid: Vec<String>,
    ) -> Result<u64, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let res = File::delete_many()
            .filter(Column::ArchiveId.eq(archive_id))
            .filter(Column::Uuid.is_in(uuid))
            .exec(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseDeleteError)?;

        if res.rows_affected > 0 {
            Ok(res.rows_affected)
        } else {
            Ok(0)
        }
    }

    // since this usually involves a large amount of files, the DB needs to be passed in and shared with other processes in order not to exceed the Sqlite resource limit.
    async fn file_update_file(
        &self,
        db: &DatabaseConnection,
        file: file::ActiveModel,
    ) -> Result<file::Model, SeaOrmDatabaseError> {
        let updated = file.update(db).await.map_err(DatabaseUpdateError)?;
        Ok(updated)
    }

    async fn file_filter_file(
        &self,
        filter: SimpleExpr,
    ) -> Result<Vec<file::Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let files = File::find()
            .filter(filter)
            .all(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn query_files(
        &self,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<File>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let result = PebbleQueryFile::query_files(&db, query)
            .await
            .map_err(SeaOrmDatabaseError::PebbleQueryError)?;
        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use crate::project::file_manager::file_manager::ManageFileTrait;
    use crate::test_utils::carrel_tester::CarrelTester;
    use crate::test_utils::project_tester::ProjectTester;
    use carrel_commons::generic::api::query::v1::{SortCondition, SortDirection, StandardQuery, StandardQueryResultMetadata};
    use carrel_db::entities::file;
    use carrel_utils::test::faker::Language;
    use pebble_query::pebble_query_result::PebbleQueryResultUtilTrait;
    use sea_orm::ActiveValue::Set;
    use sea_orm::{ColumnTrait, IntoActiveModel};
    use super::*;

    #[tokio::test]
    async fn test_archive_list_files() {
        // get seeded db
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;

        let files_in_archive_1 = project_manager.db.archive_list_files(1).await.unwrap();
        // one file is seeded
        assert_eq!(files_in_archive_1.len(), 1);
        let files_in_archive_2 = project_manager.db.archive_list_files(2).await.unwrap();
        // three files are seeded
        assert_eq!(files_in_archive_2.len(), 3);
    }

    #[tokio::test]
    async fn test_archive_filter_files() {
        // get seeded db
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;
        let pdf_files_in_archive_2 = project_manager
            .db
            .archive_filter_files(2, file::Column::Extension.like("pdf"))
            .await
            .unwrap();
        // two archived pdf files are seeded
        assert_eq!(pdf_files_in_archive_2.len(), 2);

        let md_files_in_archive_2 = project_manager
            .db
            .archive_filter_files(2, file::Column::Extension.like("md"))
            .await
            .unwrap();
        // one archived md file is seeded
        assert_eq!(md_files_in_archive_2.len(), 1);

        let pdf_file_with_name_1 = project_manager
            .db
            .archive_filter_files(
                2,
                file::Column::Extension
                    .like("pdf")
                    .and(file::Column::FileName.like("seed_file_name_2_1")),
            )
            .await
            .unwrap();

        // one archived pdf file with name seed_file_name_2_1 is seeded
        assert_eq!(pdf_file_with_name_1.len(), 1);
        let non_existing_file = project_manager
            .db
            .archive_filter_files(
                2,
                file::Column::Extension
                    .like("pdf")
                    .and(file::Column::FileName.like("non_existing_file")),
            )
            .await
            .unwrap();
        assert_eq!(non_existing_file.len(), 0);
    }

    // update file
    #[tokio::test]
    async fn test_file_update_file() {
        // get seeded db
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;
        let file = project_manager
            .db
            .file_filter_file(file::Column::FileName.eq("seed_file_name_1"))
            .await
            .unwrap()
            .pop()
            .unwrap();
        let mut file_model = file.into_active_model();
        file_model.file_name = Set("new_file_name".to_string());

        let db = &project_manager.db.get_connection().await;

        let updated_file = project_manager
            .db
            .file_update_file(db, file_model)
            .await
            .unwrap();
        assert_eq!(updated_file.file_name, "new_file_name");
    }

    // test batch inserting files into archives
    #[tokio::test]
    async fn test_archive_insert_files() {
        // get seeded db

        // time performance
        let start = std::time::Instant::now();
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;
        let random_file_paths =
            carrel_utils::test::faker::get_random_number_of_file_paths(10_000, Language::English);
        let inserted_files = project_manager
            .db
            .archive_add_files(1, &random_file_paths)
            .await
            .unwrap();
        let end = std::time::Instant::now();
        // println!("Time elapsed in test_archive_insert_files() is: {:?} seconds", end.duration_since(start).as_secs());
        // print inserted files
        // println!("Inserted files: {:?}", random_file_paths.len());

        // should take less than 1 second to insert 10_000 files
        assert!(end.duration_since(start).as_secs() <= 1);
    }

    // test query archive files
    #[tokio::test]
    async fn test_inserting_files() {
        // get seeded db
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;
        let random_file_paths =
            carrel_utils::test::faker::get_random_number_of_file_paths(10_000, Language::English);
        let inserted_files = project_manager
            .db
            .archive_add_files(1, &random_file_paths)
            .await
            .unwrap();
        let start = std::time::Instant::now();
        let _files_in_archive_1 = project_manager.db.archive_list_files(1).await.unwrap();
        let end = std::time::Instant::now();
        // println!("Time elapsed in test_archive_query_files() is: {:?} seconds", end.duration_since(start).as_secs());
        // print inserted files
        // println!("Inserted files: {:?}", random_file_paths.len());

        // should take less than 1 second to query 10_000 files
        assert!(end.duration_since(start).as_secs() <= 1);
    }

    // test query metadata completeness
    #[tokio::test]
    async fn test_query_metadata_completeness() {
        // get seeded db
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;
        let query_first_file_entry = StandardQuery {
            sort: None,
            offset: 0,
            length: 1,
            page: 0,
            filter: None,
            find_one: false,
        };

        let query_first_file_entry_result = project_manager
            .db
            .query_files(query_first_file_entry)
            .await
            .unwrap();
        let first_file_entry = query_first_file_entry_result.first().unwrap().clone();
        assert_eq!(first_file_entry.id, 1);

        let query_first_metadata: StandardQueryResultMetadata = query_first_file_entry_result.metadata;
        assert_eq!(query_first_metadata.result_items, 1);
        assert_eq!(query_first_metadata.result_total_items, 4);

        let query_last_file_entiry_result = project_manager
            .db
            .query_files(StandardQuery {
                sort: None,
                offset: 3,
                length: 1,
                page: 0,
                filter: None,
                find_one: false,
            })
            .await
            .unwrap();

        let last_file_entry = query_last_file_entiry_result.first().unwrap().clone();
        // assert id
        assert_eq!(last_file_entry.id, 4);
        let query_last_metadata = query_last_file_entiry_result.metadata;
        assert_eq!(query_last_metadata.result_items, 1);
        assert_eq!(query_last_metadata.result_total_items, 4);
    }

    #[tokio::test]
    async fn test_should_sort_query_files() {
        // get seeded db
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;
        let query_reverse_id = StandardQuery {
            sort: Some(SortCondition {
                field: "id".to_string(),
                order: SortDirection::Desc as i32,
            }),
            offset: 0,
            length: 1,
            page: 0,
            filter: None,
            find_one: false,
        };

        let all_results = project_manager
            .db
            .query_files(query_reverse_id)
            .await
            .unwrap();

        let first_file_entry = all_results.first().unwrap().clone();
        assert_eq!(first_file_entry.id, 4);

        let query_id_asc = StandardQuery {
            sort: Some(SortCondition {
                field: "id".to_string(),
                order: SortDirection::Asc as i32,
            }),
            offset: 0,
            length: 1,
            page: 0,
            filter: None,
            find_one: false,
        };

        let all_results = project_manager.db.query_files(query_id_asc).await.unwrap();

        let first_file_entry = all_results.first().unwrap().clone();
        assert_eq!(first_file_entry.id, 1);
    }
}
