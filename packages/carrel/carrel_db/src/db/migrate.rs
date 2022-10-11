use crate::db::connect::get_connection;
use crate::errors::database_error::SeaOrmDatabaseError;
use migration::Migrator;
use migration::MigratorTrait;
use std::path::Path;

// initialize a new db with the given path, and return the path to the db
pub async fn init_db(db_path: &str) -> Result<String, SeaOrmDatabaseError> {
    // create the db file if not exist
    let db_file_path = Path::new(db_path);
    if !db_file_path.exists() {
        std::fs::File::create(db_file_path)
            .map_err(SeaOrmDatabaseError::DatabaseFileCreationError)?;
    } else {
        return Err(SeaOrmDatabaseError::DatabaseFileAlreadyExistError(
            db_path.to_string(),
        ));
    }
    // get db connection
    let db = get_connection(db_path).await?;
    // run the migration
    Migrator::up(&db, None)
        .await
        .map_err(SeaOrmDatabaseError::DatabaseInitializationError)
        .unwrap();
    Ok(db_path.to_string())
}

#[cfg(test)]
mod test {
    use super::*;
    use carrel_utils::test::test_folders::get_random_test_temp_folder;

    #[tokio::test]
    async fn test_init_db() {
        let temp_test_folder = get_random_test_temp_folder();
        let db_file_name = "test.db";
        let db_path = format!("{}/{}", temp_test_folder, db_file_name);

        let create_db_path = init_db(db_path.as_str()).await.unwrap();
        assert_eq!(create_db_path, db_path);
    }
}
