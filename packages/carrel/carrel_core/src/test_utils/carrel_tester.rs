use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::{CreateProjectRequest};
use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;
use std::path::PathBuf;
use crate::project::config::const_config_file_name::{CONFIG_DEFAULT_CARREL_DB_NAME, CONFIG_DEFAULT_CARREL_TO_NAME};
use crate::project::config::project_config::ProjectConfig;
use crate::project::db_manager::carrel_db_manager::{CarrelDbManager, CarrelDbManagerTrait};
use crate::project::project_manager::ProjectManager;
use crate::project::to_manager::to_manager::ToManager;
use crate::test_utils::project_tester::ProjectTester;

// helper to test the project manager
pub struct CarrelTester {}

#[async_trait]
impl ProjectTester for CarrelTester {
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
        let db_path = random_db_dir.join(CONFIG_DEFAULT_CARREL_DB_NAME);
        CarrelDbManager::new(db_path.to_str().unwrap(), &ProjectConfig::default())
    }

    async fn get_seeded_db() -> CarrelDbManager {
        let random_db_dir = get_random_test_temp_folder_path_buf();
        let db_manager = CarrelDbManager::new(random_db_dir.to_str().unwrap(), &ProjectConfig::default());

        let _created_db_path = db_manager.init_db().await.unwrap();
        db_manager
    }

    async fn get_project_manager_with_seeded_db() -> ProjectManager {
        let seeded_db = CarrelTester::get_seeded_db().await;

        ProjectManager {
            to_manager: ToManager::default(),
            config: ProjectConfig{
                carrel_db_file_name: PathBuf::from(seeded_db.carrel_db_name.clone()),
                to_db_file_name: CONFIG_DEFAULT_CARREL_TO_NAME.parse().unwrap(),
                carrel_db_type: seeded_db.carrel_db_type
            },
            project_directory:seeded_db.project_directory.clone(),
            project_id: 1,
            archive_ids: vec![],
            db: seeded_db,
        }

    }
}
