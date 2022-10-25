use thiserror::Error;

#[derive(Error, Debug)]
pub enum CarrelUtilFsError {
    #[error("File does not exist: {0}")]
    FileDoesNotExist(#[source] std::io::Error),
}
