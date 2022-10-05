use std::path::PathBuf;
use crate::project::config::project_config::ProjectConfig;
use crate::project::db_manager::carrel_db_manager::{CarrelDbManager};
use crate::project::to_manager::to_manager::ToManager;


pub struct ProjectManager {
    pub db: CarrelDbManager,
    pub to_manager: ToManager,
    pub config: ProjectConfig,
    pub project_directory: PathBuf,
    pub project_id: i32,
    pub archive_ids: Vec<i32>,
}

// impl default
impl  Default for ProjectManager {
    fn default() -> Self {
        ProjectManager {
            db: CarrelDbManager::default(),
            to_manager: ToManager::default(),
            config: ProjectConfig::default(),
            project_directory: PathBuf::new(),
            project_id: 1,
            archive_ids: vec![],
        }
    }
}

/// Methods to initialize a project
pub trait InitProject {
    // construct ProjectManager from Config
    fn from_config(config: ProjectConfig, project_directory: &str) -> Self;
}


impl InitProject for ProjectManager {
    fn from_config(config: ProjectConfig, project_directory: &str) -> Self {
        ProjectManager {
            db: CarrelDbManager::new(config.carrel_db_file_name.to_str().unwrap(),
                                     config.carrel_db_type
            ),
            project_directory: project_directory.parse().unwrap(),
            to_manager: ToManager::new(config.to_db_file_name.to_str().unwrap()),
            archive_ids: vec![],
            config,
            project_id: 1
        }
    }
}


#[cfg(test)]
mod tests {
    use carrel_commons::carrel::core::project_manager::v1::CarrelDbType;
    use carrel_utils::test::test_folders::{get_random_test_temp_folder_path_buf};
    use crate::project::project_manager::project_manager::InitProject;
    use super::*;


    #[test]
    fn test_project_manager_from_config() {
        let temp_project_folder = get_random_test_temp_folder_path_buf();
        let config = ProjectConfig{
            carrel_db_file_name: "test.db".to_string().parse().unwrap(),
            to_db_file_name: "test_to.db".to_string().parse().unwrap(),
            carrel_db_type: CarrelDbType::SqliteUnspecified
        };
        let project_manager = ProjectManager::from_config(config, temp_project_folder.to_str().unwrap());

        assert_eq!(project_manager.project_directory, temp_project_folder);


    }
}
