use std::path::PathBuf;

use async_trait::async_trait;
use carrel_db::entities::project;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use sea_orm::ActiveValue::Set;

use crate::project::config::project_config::ProjectConfig;
use crate::project::db_manager::carrel_db_manager::CarrelDbManager;
use crate::project::to_manager::to_manager::{FireflyKepper, KeepFireflies};

pub struct CarrelProjectManager {
    pub db: CarrelDbManager,
    pub to: FireflyKepper,
    pub config: ProjectConfig,
    pub project_directory: PathBuf,
    pub project_id: i32,
    pub archive_ids: Vec<i32>,
}

impl CarrelProjectManager {
    pub async fn get_current_project_active_model(&self) -> project::ActiveModel {
        let directory = &self.project_directory;

        let directory_string = directory.to_str().unwrap().to_string();

        let dir_name = directory.file_name().unwrap().to_str().unwrap().to_string();

        let project_name = dir_name.clone();

        let db_name = self
            .config
            .carrel_db
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .to_string();

        let to_name = self
            .config
            .to_db
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .to_string();

        project::ActiveModel {
            id: Set(1),
            name: Set(project_name),
            directory: Set(Some(directory_string)),
            db_name: Set(Some(db_name)),
            to_name: Set(Some(to_name)),
            updated_at: Set(get_now_iso_string()),
            ..Default::default()
        }
    }
}

/// Methods to initialize a project
#[async_trait]
pub trait InstantiateFromConfig {
    // construct ProjectManager from Config
    async fn from_config(config: ProjectConfig, project_directory: &str) -> Self;
}

#[async_trait]
impl InstantiateFromConfig for CarrelProjectManager {
    async fn from_config(config: ProjectConfig, project_directory: &str) -> Self {
        // initialize Textual Object and Carrel DBs. This does not init the db files which is a separate process.
        let to = FireflyKepper::new(
            project_directory,
            config.to_db.to_str().unwrap(),
            ToManagerOption::default(),
        );
        let db = CarrelDbManager::new(project_directory, &config);
        CarrelProjectManager {
            db,
            to,
            project_directory: project_directory.parse().unwrap(),
            archive_ids: vec![],
            config,
            project_id: 1,
        }
    }
}

pub struct ToManagerOption {}

impl Default for ToManagerOption {
    fn default() -> Self {
        ToManagerOption {}
    }
}

#[cfg(test)]
mod tests {
    use carrel_commons::carrel::core::project_manager::v1::CarrelDbType;
    use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;

    use crate::project::project_manager::InstantiateFromConfig;

    use super::*;

    #[tokio::test]
    async fn test_project_manager_from_config() {
        let temp_project_folder = get_random_test_temp_folder_path_buf();
        let config = ProjectConfig {
            carrel_db: "test.db".to_string().parse().unwrap(),
            to_db: "test_to.db".to_string().parse().unwrap(),
            carrel_db_type: CarrelDbType::Sqlite,
        };
        let project_manager =
            CarrelProjectManager::from_config(config, temp_project_folder.to_str().unwrap()).await;

        assert_eq!(project_manager.project_directory, temp_project_folder);
    }
}
