use std::path::PathBuf;
use async_trait::async_trait;
use to_core::to_machine::to_machine_option::ToMachineOption;
use crate::project::config::const_config_file_name::CONFIG_DEFAULT_CARREL_DB_NAME;
use crate::project::config::project_config::ProjectConfig;
use crate::project::db_manager::carrel_db_manager::{CarrelDbManager};
use crate::project::to_manager::to_manager::{ManageTo, ToManager};


pub struct ProjectManager {
    pub db: CarrelDbManager,
    pub to: ToManager,
    pub config: ProjectConfig,
    pub project_directory: PathBuf,
    pub project_id: i32,
    pub archive_ids: Vec<i32>,
}

// impl default
impl ProjectManager {
    pub async fn new(project_directory: &str) -> Self {
        let to = ToManager::new(
            project_directory,
            CONFIG_DEFAULT_CARREL_DB_NAME,
             ToManagerOption::default()
        ).await;
        ProjectManager {
            db: CarrelDbManager::new(project_directory, &ProjectConfig::default()),
            to,
            config: ProjectConfig::default(),
            project_directory: PathBuf::new(),
            project_id: 1,
            archive_ids: vec![],
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
impl InstantiateFromConfig for ProjectManager {
    async fn from_config(config: ProjectConfig, project_directory: &str) -> Self {
        let to = ToManager::new(
                project_directory,
                config.to_db_file_name.to_str().unwrap(),
                ToManagerOption::default()

            ).await;
        ProjectManager {
            db: CarrelDbManager::new(project_directory,
                                     &config)
            ,
            project_directory: project_directory.parse().unwrap(),
            to,
            archive_ids: vec![],
            config,
            project_id: 1,
        }
    }
}

pub struct ToManagerOption {

}

impl Default for ToManagerOption {
    fn default() -> Self {
        ToManagerOption{

        }
    }
}


#[cfg(test)]
mod tests {
    use carrel_commons::carrel::core::project_manager::v1::CarrelDbType;
    use carrel_utils::test::test_folders::{get_random_test_temp_folder_path_buf};
    use crate::project::project_manager::InstantiateFromConfig;
    use super::*;


    #[tokio::test]
    async fn test_project_manager_from_config() {
        let temp_project_folder = get_random_test_temp_folder_path_buf();
        let config = ProjectConfig {
            carrel_db_file_name: "test.db".to_string().parse().unwrap(),
            to_db_file_name: "test_to.db".to_string().parse().unwrap(),
            carrel_db_type: CarrelDbType::SqliteUnspecified,
        };
        let project_manager = ProjectManager::from_config(config, temp_project_folder.to_str().unwrap()).await;

        assert_eq!(project_manager.project_directory, temp_project_folder);
    }
}
