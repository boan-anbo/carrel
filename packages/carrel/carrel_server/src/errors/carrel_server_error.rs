use std::{fmt, io};
use std::fmt::{Display, Formatter};
use carrel_core::errors::carrel_core_error::CarrelCoreError;

// create a custom error for carrel_core
#[derive(Debug)]
pub enum CarrelServerError {
    // a custom error for the carrel_core
    IoError(io::Error),
    CarrelCoreError(CarrelCoreError)
}

// impl display for the error
impl Display for CarrelServerError {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        match self {
            CarrelServerError::IoError(e) => write!(f, "IO Error: {}", e),
            CarrelServerError::CarrelCoreError(e) => write!(f, "Carrel Core Error: {}", e)
        }
    }
}

// impl from io::Error for the error
impl From<std::io::Error> for CarrelServerError {
    fn from(err: std::io::Error) -> CarrelServerError {
        CarrelServerError::IoError(err)
    }
}

// impl from std::error::Error for CarrelCoreError
impl From<CarrelCoreError> for CarrelServerError {
    fn from(err: CarrelCoreError) -> CarrelServerError {
        CarrelServerError::CarrelCoreError(err)
    }
}
