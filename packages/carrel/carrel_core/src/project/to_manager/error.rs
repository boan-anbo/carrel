use thiserror::Error;
use to_core::error::ToErrors;
use to_core::to_db::to_orm::ToOrmError;

#[derive(Debug, Error)]
pub enum ToManagerError {
    #[error("ToManagerInstantiationError: {0}")]
    ToManagerInstantiationError(String),
    #[error("ToCoreError: {0}")]
    ToCoreError(#[source] ToErrors),
    #[error("ToManagerConversionError: Cannot convert TO json to Firefly {0}")]
    ToManagerConversionError(String),
    #[error("ToOrmError: {0}")]
    ToOrmError(#[source] ToOrmError),
}
