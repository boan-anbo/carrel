use thiserror::Error;
// use thiserror::Error to generate the error typef for database connection related errors.

#[derive(Error, Debug)]
pub enum SeaOrmDatabaseError {
    #[error("Database error: {0}")]
    DatabaseConnectionError(#[source] sea_orm::DbErr),
    #[error("Database initialization error: {0}")]
    DatabaseInitializationError(#[source] sea_orm::DbErr),
    #[error("Database file creation error: {0}")]
    DatabaseFileCreationError(#[source] std::io::Error),
    #[error("Database file {0} already exist")]
    DatabaseFileAlreadyExistError(String),
    #[error("Database insert error: {0}")]
    DatabaseInsertError(#[source] sea_orm::DbErr),
    #[error("Database delete error: {0}")]
    DatabaseDeleteError(#[source] sea_orm::DbErr),
    #[error("Database query error: {0}")]
    DatabaseQueryError(#[source] sea_orm::DbErr),
}
