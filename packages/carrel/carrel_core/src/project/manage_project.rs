use std::path::PathBuf;
use carrel_commons::carrel::core::project_manager::v1::{ProjectInfo};
use crate::project::archivist::archivist::{Archivist};
use crate::project::config::const_config_file_name::CONFIG_DEFAULT_FILE_NAME;
use crate::project::config::project_config::ProjectConfig;
use crate::project::db_manager::carrel_db_manager::CarrelDbManagerTrait;
use crate::project::db_manager::project_db_manager::{MangageProjects};
use crate::project::error::project_config_error::ProjectConfigError;
use crate::project::error::project_error::ProjectError;
use crate::project::error::project_error::ProjectError::ProjectFolderDoesNotExit;
use crate::project::file_manager::file_manager::{ManageFileTrait};
use crate::project::project_manager::{InstantiateFromConfig, ProjectManager};
use crate::project::to_manager::to_manager::ManageTo;

/// Methods for managing a project that is already instantiated.
///
/// Common tasks include init the db.
#[async_trait::async_trait]
pub trait ManageProjectTrait {
    // open a project from a directory
    async fn load(path: &str) -> Result<Self, ProjectError> where Self: Sized;
    // check if there is a project config file under the directory
    fn is_dir_project(path: &str) -> bool;

    /// get the location of the configuration file under the directory.
    /// Default to [DEFAULT_CONFIG_FILE_NAME](crate::project::config::const_config_file_name::CONFIG_DEFAULT_FILE_NAME )
    /// If a config file does not exist, a new config file will be created
    fn get_config_file_path(dir: &str) -> Result<PathBuf, ProjectConfigError>;
    fn has_config_file(dir: &str) -> bool;
    /// Get the project info
    async fn get_project_info(&self) -> ProjectInfo;
}

#[async_trait::async_trait]
impl ManageProjectTrait for ProjectManager {
    async fn load(dir_path_str: &str) -> Result<ProjectManager, ProjectError> {
        // check if the path is valid
        if !std::path::Path::new(dir_path_str).exists() {
            return Err(ProjectFolderDoesNotExit(dir_path_str.to_string()));
        }
        // this unwrapped because the error is handled without the config, and only the necessary error will panic
        let config_path = ProjectManager::get_config_file_path(dir_path_str).unwrap();

        // parse config
        let config = ProjectConfig::from_config_file(

            config_path.to_str().unwrap(),
        )?;

        // construct a project manager from the config and return
        let project_manager = ProjectManager::from_config(config, dir_path_str).await;

        // init carrel db if they are not initialized
        project_manager.db.init_db().await.map_err(ProjectError::ProjectDbInitializationError).unwrap();

        // init to db
        project_manager.to.init_to_db().await;

        Ok(project_manager)
    }

    fn is_dir_project(dir: &str) -> bool {
        ProjectManager::has_config_file(dir)
    }

    fn get_config_file_path(dir_path_str: &str) -> Result<PathBuf, ProjectConfigError> {
        // get the path of the config file by joining the dir path and the config file name
        let config_file_path_buf: PathBuf = PathBuf::from(dir_path_str).join(CONFIG_DEFAULT_FILE_NAME);
        // use fs to check if the config file exists
        let result = if config_file_path_buf.exists() {
            Ok(config_file_path_buf.clone())
        } else {
            // if the config file does not exist, throw a config file not found error
            Err(ProjectConfigError::ConfigFileNotFound(dir_path_str.to_string()))
        };

        let config_path = match result {
            Ok(path) => path,
            Err(e) => {
                match e {
                    // if the config file does not exist, create a new one
                    ProjectConfigError::ConfigFileNotFound(_) => {
                        let created_default_config_path = ProjectConfig::create_default_config_file(dir_path_str);
                        match created_default_config_path {
                            Ok(path) => path,
                            Err(_) => return Err(ProjectConfigError::ConfigWriteError(
                                created_default_config_path.unwrap_err().to_string(),
                            )),
                        }
                    }
                    // if there is an error parsing the config file, bubble up the error.
                    // This error should be handled by the user, who can then decide to repair the config file manually or delete it and recreate it.
                    // This should not be automatically done by the program, because it could overwrite a used config file that contains only minor format errors.
                    ProjectConfigError::ConfigParseError(_) => return Err(e),
                    _ => return Err(e),
                }
            }
        };
        Ok(config_path)
    }

    fn has_config_file(dir: &str) -> bool {
        ProjectManager::get_config_file_path(dir).is_ok()
    }

    async fn get_project_info(&self) -> ProjectInfo {
        let project = self.db.get_project(
            &self.project_id
        ).await.unwrap();
        let archive_count = self.db.project_count_archives().await.unwrap();
        let file_count = self.db.file_count_all_files().await.unwrap();

        let directory = self.project_directory.clone();

        ProjectInfo {
            project_id: self.project_id,
            name: project.name,
            description: project.description,
            directory: directory.into_os_string().into_string().unwrap(),
            db_name: self.config.carrel_db_file_name.file_name().unwrap().to_str().unwrap().to_string(),
            to_name: self.config.to_db_file_name.file_name().unwrap().to_str().unwrap().to_string(),
            // get the db type from the config and conver it to i32
            db_type: self.config.carrel_db_type as i32,
            archive_count,
            file_count,
            created_at: project.create_at,
            updated_at: project.updated_at,
        }

    }
}


#[cfg(test)]
mod tests {
    use std::fs;
    use crate::project::config::const_config_file_name::{CONFIG_DEFAULT_CARREL_DB_NAME, CONFIG_DEFAULT_CARREL_TO_NAME};
    use crate::test_utils::carrel_tester::{CarrelTester};
    use crate::test_utils::project_tester::ProjectTester;
    use super::*;

    #[tokio::test]
    async fn test_load_simple_project() {
        let simple_project_fixture_folder = carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf("simple_project");
        let project_manager = ProjectManager::load(simple_project_fixture_folder.to_str().unwrap()).await.unwrap();
        assert_eq!(project_manager.project_directory, simple_project_fixture_folder);
        let config = project_manager.config;
        assert_eq!(config.carrel_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_DB_NAME);
        assert_eq!(config.to_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_TO_NAME);
        // check if the project folder is a project
        assert_eq!(ProjectManager::is_dir_project(simple_project_fixture_folder.to_str().unwrap()), true);
    }

    #[tokio::test]
    async fn test_load_empty_project() {
        let empty_project_fixture_folder = carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf("empty_project");
        let project_manager = ProjectManager::load(empty_project_fixture_folder.to_str().unwrap()).await.unwrap();
        assert_eq!(project_manager.project_directory, empty_project_fixture_folder);
        let config = project_manager.config;
        assert_eq!(config.carrel_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_DB_NAME);
        assert_eq!(config.to_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_TO_NAME);
        // check if the project folder is a project
        assert_eq!(ProjectManager::is_dir_project(empty_project_fixture_folder.to_str().unwrap()), true);
        // remove all files under the project folder but not the folder itself
        let all_files_under_empty_project = fs::read_dir(empty_project_fixture_folder).unwrap();
        for file in all_files_under_empty_project {
            let file_path = file.unwrap().path();
            fs::remove_file(file_path).unwrap();
        }
    }

    #[tokio::test]
    async fn get_project_info() {
         let project = CarrelTester::get_project_manager_with_seeded_db().await;

        let report = project.get_project_info().await;

        assert_eq!(report.project_id, project.project_id);
        assert_eq!(report.directory, project.project_directory.to_str().unwrap());
        assert_eq!(report.db_name, CONFIG_DEFAULT_CARREL_DB_NAME);
        assert_eq!(report.to_name, CONFIG_DEFAULT_CARREL_TO_NAME);
        assert_eq!(report.db_type, 0);
        assert_eq!(report.archive_count, 2);
        assert_eq!(report.file_count, 4);
    }
}
