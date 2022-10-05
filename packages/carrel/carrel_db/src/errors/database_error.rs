use thiserror::Error;
// use thiserror::Error to generate the error typef for database connection related errors.

#[derive(Error, Debug)]
pub enum SeaOrmDatabaseError {
    #[error("Database connection error: {0}")]
    DatabaseConnectionError(#[from] sea_orm::DatabaseConnectionError),
    #[error("Database error: {0}")]
    DatabaseError(#[from] sea_orm::DatabaseError),
    #[error("Database migration error: {0}")]
    DatabaseMigrationError(#[from] sea_orm::DatabaseMigrationError),
    #[error("Database pool error: {0}")]
    DatabasePoolError(#[from] sea_orm::DatabasePoolError),
    #[error("Database transaction error: {0}")]
    DatabaseTransactionError(#[from] sea_orm::DatabaseTransactionError),
}
