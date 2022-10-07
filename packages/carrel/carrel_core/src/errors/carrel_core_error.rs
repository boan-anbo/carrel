use std::{fmt, io};
use std::fmt::{Display, Formatter};
use thiserror::Error;

// create a custom error for carrel_core
#[derive(Debug, Error)]
pub enum CarrelCoreError {
    // a custom error for the carrel_core
    #[error("IoError")]
    IoError(#[from] io::Error),
    #[error("ToDbInitError: {0}")]
    ToDbInitError(String)

}


