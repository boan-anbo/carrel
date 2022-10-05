use std::path::PathBuf;
use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::CarrelDbType;
use carrel_db::db::connect::get_connection;
use carrel_db::errors::database_error::SeaOrmDatabaseError;
use sea_orm::DatabaseConnection;
use crate::project::config::const_config_file_name::{CONFIG_DEFAULT_CARREL_DB_NAME, CONFIG_DEFAULT_CARREL_DB_TYPE};


pub struct CarrelDbManager {
    pub db_path: String,
    pub db_type: CarrelDbType,
}

impl Default for CarrelDbManager {
    fn default() -> Self {
        CarrelDbManager {
            db_path: CONFIG_DEFAULT_CARREL_DB_NAME.to_string(),
            db_type: CONFIG_DEFAULT_CARREL_DB_TYPE,
        }
    }
}

impl CarrelDbManager {
    pub fn new(db_path: &str, db_type: CarrelDbType) -> Self {
        CarrelDbManager {
            db_path: db_path.to_string(),
            db_type,
        }
    }

    pub fn get_db_directory(&self) -> String {
        let db_path = PathBuf::from(self.db_path.as_str());
        let db_directory = db_path.parent().unwrap().to_str().unwrap().to_string();
        db_directory
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
        let db_path = match self.db_type {
            CarrelDbType::Postgresql => {
                unimplemented!("Postgres is not implemented yet")
            }
            CarrelDbType::SqliteUnspecified => {
                let create_db_result = carrel_db::db::migrate::init_db(
                    self.db_path.as_str()
                ).await;

                // if already exist, do nothing
                match create_db_result {
                    Ok(created_db_path) => created_db_path,
                    Err(SeaOrmDatabaseError::DatabaseFileAlreadyExistError(_)) => self.db_path.clone(),
                    Err(err) => return Err(err)
                }
            }
        };
        Ok(db_path)
    }

    async fn get_connection(&self) -> DatabaseConnection {
        get_connection(self.db_path.as_str()).await.unwrap()
    }
}


#[cfg(test)]
mod tests {
    use carrel_utils::test::test_folders::{get_random_test_temp_folder_path_buf};
    use crate::project::db_manager::project_db_manager::MangageProjects;
    use crate::test_utils::test_entities::{CarrelTester, TestEntities};
    use super::*;

    #[tokio::test]
    async fn test_create_project() {
        let random_db_dir = get_random_test_temp_folder_path_buf();
        let db_path = random_db_dir.join("test.db");
        let db_manager = CarrelDbManager::new(
            db_path.to_str().unwrap(), CarrelDbType::SqliteUnspecified);

        let _created_db_path = db_manager.init_db().await.unwrap();


        // create project
        let create_project = CarrelTester::get_test_create_project();

        let add_project_result = db_manager.add_project(create_project).await;

        assert!(add_project_result.is_ok());

        let project_id = add_project_result.unwrap();

        assert!(project_id > 0);

        // clear up
        let _ = std::fs::remove_dir_all(random_db_dir);
    }
}
