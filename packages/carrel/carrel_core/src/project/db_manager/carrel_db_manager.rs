use std::path::PathBuf;

use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::CarrelDbType;
use carrel_db::db::connect::get_connection;
use carrel_db::errors::database_error::SeaOrmDatabaseError;
use sea_orm::DatabaseConnection;

use crate::project::config::const_config_file_name::CONFIG_DEFAULT_BATCH_INSERT_SIZE;
use crate::project::config::project_config::ProjectConfig;
use crate::project::error::project_error::ProjectError;

#[derive(Clone)]
pub struct CarrelDbManager {
    pub(crate) batch_insert_size: usize,
    pub carrel_db_name: PathBuf,
    pub carrel_db_type: CarrelDbType,
    pub project_directory: PathBuf,
    pub carrel_db_full_path: PathBuf,
}

impl CarrelDbManager {
    pub fn new(project_directory_path: &str, config: &ProjectConfig) -> Self {
        // check if project_directory is directory
        let project_directory = PathBuf::from(project_directory_path);
        if !project_directory.is_dir() {
            // throw error
            return Err(ProjectError::ProjectDirectoryError(
                "Project directory is not a directory: ".to_string()
                    + project_directory_path.to_string().as_str(),
            ))
                .unwrap();
        }
        let carrel_db_full_path = project_directory.join(&config.carrel_db);
        CarrelDbManager {
            batch_insert_size: CONFIG_DEFAULT_BATCH_INSERT_SIZE,
            carrel_db_name: config.carrel_db.clone(),
            carrel_db_type: config.carrel_db_type,
            project_directory: project_directory_path.parse().unwrap(),
            carrel_db_full_path,
        }
    }
}

#[async_trait]
pub trait CarrelDbManagerTrait {
    // initialize the db, create the db if not exist and return the db path
    async fn init_db(&self) -> Result<String, SeaOrmDatabaseError>;
    // get connection to the db
    async fn get_connection(&self) -> DatabaseConnection;
}

#[async_trait]
impl CarrelDbManagerTrait for CarrelDbManager {
    async fn init_db(&self) -> Result<String, SeaOrmDatabaseError> {
        let carrel_db_already_exists = self.carrel_db_full_path.exists();

        // TODO this step should perform a health check on the DB to make sure it's funcioning and have the most updated migration.
        if carrel_db_already_exists {
            return Ok(self.carrel_db_full_path.to_str().unwrap().to_string());
        }
        // if there is no existing database at the path.
        let db_path = match self.carrel_db_type {
            CarrelDbType::Postgresql => {
                unimplemented!("Postgres is not implemented yet")
            }
            CarrelDbType::Sqlite => {
                let create_db_result =
                    carrel_db::db::migrate::init_db(self.carrel_db_full_path.to_str().unwrap())
                        .await;

                // if already exist, do nothing
                match create_db_result {
                    Ok(created_db_path) => created_db_path,

                    Err(err) => return Err(err),
                }
            }
            _ => {
                unimplemented!("The provided Database type is not supported by Carrel right now")
            }
        };
        Ok(db_path)
    }

    async fn get_connection(&self) -> DatabaseConnection {
        get_connection(self.carrel_db_full_path.to_str().unwrap())
            .await
            .expect(format!("Failed to get connection to the database {}", self.carrel_db_full_path.to_str().unwrap()).as_str())
    }
}

#[cfg(test)]
mod tests {
    use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;

    use crate::project::db_manager::project_db_manager::MangageProjects;
    use crate::project::project_manager::CarrelProjectManager;
    use crate::project::project_manager_methods::manage_project::ManageProjectTrait;
    use crate::test_utils::carrel_tester::CarrelTester;
    use crate::test_utils::project_tester::ProjectTester;

    #[tokio::test]
    async fn test_create_project() {
        let random_db_dir = get_random_test_temp_folder_path_buf();
        let project_manager = CarrelProjectManager::load(random_db_dir.to_str().unwrap())
            .await
            .unwrap();

        // create project
        let create_project = CarrelTester::get_test_create_project();

        let add_project_result = project_manager.db.add_project(create_project).await;

        assert!(add_project_result.is_ok());

        let project_id = add_project_result.unwrap();

        assert!(project_id > 0);
    }
}
