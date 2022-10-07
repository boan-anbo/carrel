use thiserror::Error;
use to_core::error::ToErrors;

#[derive(Debug, Error)]
pub enum ToManagerError {
    #[error("ToManagerInstantiationError: {0}")]
    ToManagerInstantiationError(String),
    #[error("ToCoreError: {0}")]
    ToCoreError(#[source] ToErrors),
}