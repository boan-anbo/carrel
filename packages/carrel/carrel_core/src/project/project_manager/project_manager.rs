use std::path::PathBuf;
use carrel_db::entities::prelude::Archive;
use carrel_db::entities::project::Entity as Project;
use crate::project::config::project_config::ProjectConfig;
use crate::project::db_manager::carrel_db_manager::CarrelDbManager;
use crate::project::to_manager::to_manager::ToManager;


pub struct ProjectManager {
    pub db_manager: CarrelDbManager,
    pub to_manager: ToManager,
    pub config: ProjectConfig,
    pub folder_path: PathBuf,
    pub project: Project,
    pub archives: Vec<Archive>,
}

// impl default
impl  Default for ProjectManager {
    fn default() -> Self {
        ProjectManager {
            db_manager: CarrelDbManager::default(),
            to_manager: ToManager::default(),
            config: ProjectConfig::default(),
            folder_path: PathBuf::new(),
            project: Project::default(),
            archives: vec![],
        }
    }
}

// from config
impl From<ProjectConfig> for ProjectManager {
    // construct ProjectManager from Config
    fn from(config: ProjectConfig) -> Self {

        ProjectManager {
            db_manager: CarrelDbManager::new(config.db_path.to_str().unwrap(),
            config.db_type
            ),
            folder_path: config.project_directory.clone(),
            to_manager: ToManager::new(config.to_path.to_str().unwrap()),
            project: Project::default(),
            archives: vec![],
            config,
        }
    }
}
