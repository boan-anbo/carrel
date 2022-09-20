use serde::{Deserialize, Serialize};
/// Tag scan result
#[derive(Deserialize, Serialize, Clone)]
pub struct ToParserResult<T> {
    pub text_original: String,
    pub text_cleaned: String,
    pub tos: Vec<T>,
}
