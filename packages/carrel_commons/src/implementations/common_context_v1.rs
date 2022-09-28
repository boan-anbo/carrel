use std::ffi::OsStr;
use std::path::{Path, PathBuf};
use to_core::util_entities::to_context::ToContext;
use to_core::util_entities::to_file::ToFile;
use uuid::Uuid;
use crate::carrel::common::context::v1::Context;
use crate::carrel::common::file::v1::File;


// impl context from ToContext
impl From<ToContext> for Context {
    fn from(to_context: ToContext) -> Self {
        Context {
            context: to_context.context,

            snippet_in_context_column_number: to_context.snippet_in_context_column_number,
            snippet_string: to_context.snippet_string,
        }
    }
}
