use std::path::PathBuf;
use crate::project::config::const_config_file_name::CONFIG_DEFAULT_FILE_NAME;
use crate::project::config::project_config::ProjectConfig;
use crate::project::error::project_config_error::ProjectConfigError;
use crate::project::error::project_error::ProjectError;
use crate::project::error::project_error::ProjectError::ProjectFolderDoesNotExit;
use crate::project::project_manager::project_manager::ProjectManager;

pub trait ManageProjectTrait {
    // open a project from a directory
    fn load(path: &str) -> Result<Self, ProjectError> where Self: Sized;
    // check if there is a project config file under the directory
    fn is_dir_project(path: &str) -> bool;

    /// get the location of the configuration file under the directory.
    /// Default to [DEFAULT_CONFIG_FILE_NAME](crate::project::config::const_config_file_name::CONFIG_DEFAULT_FILE_NAME )
    /// If a config file does not exist, a new config file will be created
    fn get_config_file_path(dir: &str) -> Result<PathBuf, ProjectConfigError>;
    fn has_config_file(dir: &str) -> bool;
}


impl ManageProjectTrait for ProjectManager {
    fn load(dir_path_str: &str) -> Result<ProjectManager, ProjectError> {
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
        Ok(ProjectManager::from(config))
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
                        let created_default_config_path = ProjectConfig::create_default_config_file(config_file_path_buf.to_str().unwrap());
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
}


#[cfg(test)]
mod tests {
    use std::fs;
    use crate::project::config::const_config_file_name::{CONFIG_DEFAULT_CARREL_DB_NAME, CONFIG_DEFAULT_CARREL_TO_NAME};
    use crate::project::project_manager::project_manager::ProjectManager;
    use super::*;

    #[test]
    fn test_load_simple_project() {
        let simple_project_fixture_folder = carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf("simple_project");
        let project_manager = ProjectManager::load(simple_project_fixture_folder.to_str().unwrap()).unwrap();
        assert_eq!(project_manager.folder_path, simple_project_fixture_folder);
        let config = project_manager.config;
        assert_eq!(config.db_path.file_name().unwrap(), "test_db.db");
        assert_eq!(config.to_path.file_name().unwrap(), "test_to.db");
        // check if the project folder is a project
        assert_eq!(ProjectManager::is_dir_project(simple_project_fixture_folder.to_str().unwrap()), true);
    }

    #[test]
    fn test_load_empty_project() {
        let empty_project_fixture_folder = carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf("empty_project");
        let project_manager = ProjectManager::load(empty_project_fixture_folder.to_str().unwrap()).unwrap();
        assert_eq!(project_manager.folder_path, empty_project_fixture_folder);
        let config = project_manager.config;
        assert_eq!(config.db_path.file_name().unwrap(), CONFIG_DEFAULT_CARREL_DB_NAME);
        assert_eq!(config.to_path.file_name().unwrap(), CONFIG_DEFAULT_CARREL_TO_NAME);
        // check if the project folder is a project
        assert_eq!(ProjectManager::is_dir_project(empty_project_fixture_folder.to_str().unwrap()), true);
        // remove all files under the project folder but not the folder itself
        fs::remove_dir_all(empty_project_fixture_folder).unwrap();
    }
}

