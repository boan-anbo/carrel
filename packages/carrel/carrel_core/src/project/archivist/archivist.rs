use crate::project::db_manager::carrel_db_manager::{CarrelDbManager, CarrelDbManagerTrait};
use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::AddArchiveDto;
use carrel_db::entities::archive;
use carrel_db::entities::prelude::Archive;
use carrel_db::errors::database_error::SeaOrmDatabaseError;
use sea_orm::ColumnTrait;
use sea_orm::{ActiveModelTrait, EntityTrait, PaginatorTrait, QueryFilter};

#[async_trait]
pub trait Archivist {
    // add archive to the project
    async fn project_add_archive(
        &self,
        add_archive: AddArchiveDto,
    ) -> Result<i32, SeaOrmDatabaseError>;

    // list all archives in the project
    async fn project_list_archives(&self) -> Result<Vec<archive::Model>, SeaOrmDatabaseError>;

    // remove archive from the project
    async fn project_remove_archive(&self, archive_id: i32) -> Result<(), SeaOrmDatabaseError>;

    // count number of archives in the project
    async fn project_count_archives(&self) -> Result<i64, SeaOrmDatabaseError>;
}

#[async_trait]
impl Archivist for CarrelDbManager {
    async fn project_add_archive(
        &self,
        add_archive: AddArchiveDto,
    ) -> Result<i32, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let archive = archive::ActiveModel::from(add_archive);
        let inserted = archive
            .insert(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseInsertError)?;
        Ok(inserted.id)
    }

    async fn project_list_archives(&self) -> Result<Vec<archive::Model>, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let archives = Archive::find()
            .all(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(archives)
    }

    async fn project_remove_archive(&self, archive_id: i32) -> Result<(), SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        Archive::delete_many()
            .filter(archive::Column::Id.eq(archive_id))
            .exec(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseDeleteError)?;
        Ok(())
    }

    async fn project_count_archives(&self) -> Result<i64, SeaOrmDatabaseError> {
        let db = self.get_connection().await;
        let count = Archive::find()
            .count(&db)
            .await
            .map_err(SeaOrmDatabaseError::DatabaseQueryError)?;
        Ok(count as i64)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::project::file_manager::file_manager::ManageFileTrait;
    use crate::test_utils::carrel_tester::CarrelTester;
    use crate::test_utils::project_tester::ProjectTester;

    // make sure delete archive cascade deletes files
    #[tokio::test]
    async fn test_delete_archive_and_archive_files() {
        let db_manager = CarrelTester::get_seeded_db().await;

        // theres should be four files in total
        let all_files_initial = db_manager.file_list_all_files().await.unwrap();
        assert_eq!(all_files_initial.len(), 4);

        // delete the first archive
        db_manager.project_remove_archive(1).await.unwrap();
        let all_files_after_delete_first_archive = db_manager.file_list_all_files().await.unwrap();
        assert_eq!(all_files_after_delete_first_archive.len(), 3);

        // delete the second archive
        db_manager.project_remove_archive(2).await.unwrap();
        let all_files_after_delete_second_archive = db_manager.file_list_all_files().await.unwrap();
        assert_eq!(all_files_after_delete_second_archive.len(), 0);
    }
}
