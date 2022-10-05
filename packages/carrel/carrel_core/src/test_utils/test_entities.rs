use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::{CarrelDbType, CreateProjectRequest};
use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;
use crate::project::db_manager::carrel_db_manager::{CarrelDbManager, CarrelDbManagerTrait};

#[async_trait]
pub trait TestEntities {
    fn get_test_create_project() -> CreateProjectRequest;
    fn get_test_db_manager() -> CarrelDbManager;
    async fn get_seeded_db() -> CarrelDbManager;
}

// helper to test the project manager
pub(crate) struct CarrelTester {}

#[async_trait]
impl TestEntities for CarrelTester {
    fn get_test_create_project() -> CreateProjectRequest {
        CreateProjectRequest {
            name: "test_project".to_string(),
            description: "test_description".to_string(),
            directory: get_random_test_temp_folder_path_buf().to_str().unwrap().to_string(),
            db_name: "test_db.db".to_string(),
            to_name: "test_to.db".to_string(),
        }
    }

    fn get_test_db_manager() -> CarrelDbManager {
        let random_db_dir = get_random_test_temp_folder_path_buf();
        let db_path = random_db_dir.join("test.db");
        CarrelDbManager::new(db_path.to_str().unwrap(), CarrelDbType::SqliteUnspecified)
    }

    async fn get_seeded_db() -> CarrelDbManager {
        let random_db_dir = get_random_test_temp_folder_path_buf();
        let db_path = random_db_dir.join("test.db");
        let db_manager = CarrelDbManager::new(db_path.to_str().unwrap(), CarrelDbType::SqliteUnspecified);

        let _created_db_path = db_manager.init_db().await.unwrap();
        db_manager
    }
}


#[cfg(test)]
mod test {
    use std::path::PathBuf;
    use carrel_db::entities::prelude::{Archive, Project};
    use sea_orm::EntityTrait;
    use crate::project::db_manager::carrel_db_manager::CarrelDbManagerTrait;
    use crate::test_utils::test_entities::{CarrelTester, TestEntities};

    #[tokio::test]
    async fn test_get_seeded_db() {
        let db_manager = CarrelTester::get_seeded_db().await;
        let connection = db_manager.get_connection().await;
        let project = Project::find_by_id(1).one(&connection).await.unwrap().unwrap();
        assert_eq!(project.name, "seed_name");
        assert_eq!(project.description, "seed_description");

        let archive2 = Archive::find_by_id(2).one(&connection).await.unwrap().unwrap();
        assert_eq!(archive2.name, "seed_archive_2");

        // clear the dr
        let db_path = PathBuf::from(db_manager.db_path.as_str());
        let db_folder = db_path.parent().unwrap();


        let remove_result = std::fs::remove_dir_all(db_folder);
        // if the remove fails, it's probably because the db is still in use
        // so we'll just ignore it
        if let Err(e) = remove_result {
            println!("Error removing test db: {}", e);
        }
    }
}
