use std::{io};
use thiserror::Error;
use carrel_core::errors::carrel_core_error::CarrelCoreError;
use carrel_core::SeaOrmDatabaseError;

// create a custom error for carrel_core
#[derive(Debug, Error)]
pub enum CarrelServerError {
    // a custom error for the carrel_core
    #[error("CarrelServerError: Io Error: {0}")]
    IoError(io::Error),
    #[error("CarrelServerError: CarrelCoreError: {0}")]
    CarrelCoreError(CarrelCoreError),
    #[error("CarrelServerError: Project Operation failed {0}")]
    ProjectOperationFailed(#[source] SeaOrmDatabaseError),
    #[error("CarrelServerError: Invalid Request payload: {0}")]
    InvalidRequestPayload(String),

}


