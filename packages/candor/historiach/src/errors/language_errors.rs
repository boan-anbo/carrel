use std::error::Error;

use crate::Language;
use snafu::{Backtrace, Snafu};

#[derive(Debug, Snafu)]
#[snafu(visibility(pub))]
pub enum LanguageError {
    #[snafu(display("{:?} not supported for function: {:?}", language, functionality))]
    LanguageNotSupported { language: Language, functionality: String },

}
pub type Result<T, E = LanguageError> = std::result::Result<T, E>;
