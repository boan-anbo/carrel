use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::CarrelDbType;
use carrel_db::errors::database_error::SeaOrmDatabaseError;
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
}

#[async_trait]
pub trait CarrelDbManagerTrait {
    // initialize the db, create the db if not exist and return the db path
    async fn init_db(&self) -> Result<String, SeaOrmDatabaseError>;
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
}


#[cfg(test)]
mod tests {
    use carrel_utils::test::test_folders::{get_random_test_temp_folder_path_buf};
    use crate::project::db_manager::project_db_manager::DBManagerForProject;
    use crate::test_utils::test_entities::{EntityTester, TestEntities};
    use super::*;

    #[tokio::test]
    async fn test_create_project() {

        let random_db_dir = get_random_test_temp_folder_path_buf();
        let db_path = random_db_dir.join("test.db");
        let db_manager = CarrelDbManager::new(
            db_path.to_str().unwrap() , CarrelDbType::SqliteUnspecified);

        let _created_db_path = db_manager.init_db().await.unwrap();



        // create project
        let create_project = EntityTester::get_test_create_project();

        let add_project_result = db_manager.add_project(create_project).await;

        assert!(add_project_result.is_ok());

        let project_id = add_project_result.unwrap();

        assert!(project_id > 0);

        // clear up
        let _ = std::fs::remove_dir_all(random_db_dir);
    }

}
