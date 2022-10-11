use carrel_app_db::carrel_app_manager::CarrelAppError;
use std::io;

use thiserror::Error;

// create a custom error for carrel_core
#[derive(Debug, Error)]
pub enum CarrelCoreError {
    // a custom error for the carrel_core
    #[error("IoError")]
    IoError(#[from] io::Error),
    #[error("ToDbInitError: {0}")]
    ToDbInitError(String),
    #[error("ToDbInitError: {0}")]
    CarrelAppDbError(#[source] CarrelAppError),
    #[error("CarrelConnectError: {0}")]
    CarrelConnectError(String),
}
