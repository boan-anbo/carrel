use crate::errors::database_error::SeaOrmDatabaseError;
use sea_orm::DatabaseConnection;

// get a connection to the SeaORM database
pub async fn get_connection(db_file_path: &str) -> Result<DatabaseConnection, SeaOrmDatabaseError> {
    let database_url = format!("sqlite://{}", db_file_path);
    // let test
    sea_orm::Database::connect(database_url)
        .await
        .map_err(SeaOrmDatabaseError::DatabaseConnectionError)
}
