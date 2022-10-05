use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use carrel_commons::carrel::core::project_manager::v1::CarrelDbType;
use figment::{Figment};
use figment::providers::{Format, Serialized, Yaml};
use crate::project::config::const_config_file_name::{CONFIG_DEFAULT_CARREL_DB_NAME, CONFIG_DEFAULT_CARREL_DB_TYPE, CONFIG_DEFAULT_CARREL_TO_NAME, CONFIG_DEFAULT_FILE_NAME};
use crate::project::error::project_config_error::ProjectConfigError;


/// The single source of truth for Project.
#[derive(Debug, Deserialize, Serialize)]
pub struct ProjectConfig {
    // the path to the carrel db
    pub carrel_db_file_name: PathBuf,
    // the path to the carrel textual object db
    pub to_db_file_name: PathBuf,
    // the type of the db
    pub carrel_db_type: CarrelDbType,
}

impl Default for ProjectConfig {
    fn default() -> Self {
        ProjectConfig {
            carrel_db_file_name: PathBuf::from(CONFIG_DEFAULT_CARREL_DB_NAME),
            to_db_file_name: PathBuf::from(CONFIG_DEFAULT_CARREL_TO_NAME),
            carrel_db_type: CONFIG_DEFAULT_CARREL_DB_TYPE,
        }
    }
}



// impl from for ProjectConfig

impl ProjectConfig {
    pub fn from_config_file(config_path: &str) -> Result<
        ProjectConfig,
        ProjectConfigError
    > {
        Figment::from(Serialized::defaults(ProjectConfig::default()))
            .merge(Yaml::file(config_path))
            .extract()
            .map_err(|_| ProjectConfigError::ConfigParseError(config_path.to_string()))
    }

    pub fn write_to_yaml_file(&self, path: &str) -> Result<(), ProjectConfigError> {
        let config_path = PathBuf::from(path).join(CONFIG_DEFAULT_FILE_NAME);
        let config_str = serde_yaml::to_string(&self).unwrap();
        std::fs::write(config_path, config_str).map_err(|_| ProjectConfigError::ConfigWriteError(path.to_string()))
    }

    // create a default config file and write to the path
    pub fn create_default_config_file(dir_path: &str) -> Result<PathBuf, ProjectConfigError> {

        let config = ProjectConfig::default();
        let config_path = PathBuf::from(dir_path).join(CONFIG_DEFAULT_FILE_NAME);
        let config_str = serde_yaml::to_string(&config).unwrap();
        // create the config file if not exist
        let write_result = std::fs::write(config_path.clone(), config_str).map_err(|_| ProjectConfigError::ConfigWriteError(dir_path.to_string()));
        match write_result {
            Ok(_) => Ok(config_path),
            Err(e) => Err(e),
        }
    }
}


#[cfg(test)]
mod tests {
    use uuid::Uuid;
    use crate::project::config::const_config_file_name::CONFIG_DEFAULT_FILE_NAME;
    use super::*;

    #[test]
    fn test_from_fixture_config_file() {
        let fixture_folder = carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf("simple_project");
        let config_path = fixture_folder.join(CONFIG_DEFAULT_FILE_NAME);
        assert!(config_path.exists());
        let config = ProjectConfig::from_config_file(config_path.to_str().unwrap()).unwrap();
        assert_eq!(config.carrel_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_DB_NAME);
        assert_eq!(config.to_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_TO_NAME);
    }

    #[test]
    fn test_from_default_config_file() {
        let config = ProjectConfig::from_config_file(Uuid::new_v4().to_string().as_str()).unwrap();
        assert_eq!(config.carrel_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_DB_NAME);
        assert_eq!(config.to_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_TO_NAME);
    }

    #[test]
    fn test_write_to_yaml_file() {
        let random_test_temp_folder = carrel_utils::test::test_folders::get_random_test_temp_folder();
        let default_config = ProjectConfig::default();
        default_config.write_to_yaml_file(random_test_temp_folder.as_str()).unwrap();
        let config_path = PathBuf::from(random_test_temp_folder.as_str()).join(CONFIG_DEFAULT_FILE_NAME);
        assert!(config_path.exists());
        let config = ProjectConfig::from_config_file(config_path.to_str().unwrap()).unwrap();
        assert_eq!(config.carrel_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_DB_NAME);
        assert_eq!(config.to_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_TO_NAME);
        // remove the folder using fs
        std::fs::remove_dir_all(random_test_temp_folder).unwrap();
    }

    #[test]
    fn test_create_default_config_file() {
        let random_test_temp_folder = carrel_utils::test::test_folders::get_random_test_temp_folder();
        ProjectConfig::create_default_config_file(random_test_temp_folder.as_str()).unwrap();
        let config_path = PathBuf::from(random_test_temp_folder.as_str()).join(CONFIG_DEFAULT_FILE_NAME);
        assert!(config_path.exists());
        let config = ProjectConfig::from_config_file(config_path.to_str().unwrap()).unwrap();
        assert_eq!(config.carrel_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_DB_NAME);
        assert_eq!(config.to_db_file_name.file_name().unwrap(), CONFIG_DEFAULT_CARREL_TO_NAME);
        // remove the folder using fs
        std::fs::remove_dir_all(random_test_temp_folder).unwrap();
    }


}
