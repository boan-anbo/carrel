use std::{fmt, io};
use std::fmt::{Display, Formatter};

// create a custom error for carrel_core
#[derive(Debug)]
pub enum CarrelCoreError {
    // a custom error for the carrel_core
    IoError(io::Error),
}

// impl display for the error
impl Display for CarrelCoreError {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        match *self {
            CarrelCoreError::IoError(ref err) => write!(f, "CarrelCoreError: {}", err),
        }
    }
}

// impl from io::Error for the error
impl From<std::io::Error> for CarrelCoreError {
    fn from(err: std::io::Error) -> CarrelCoreError {
        CarrelCoreError::IoError(err)
    }
}
