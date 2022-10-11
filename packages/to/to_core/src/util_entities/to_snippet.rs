use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;
use crate::util_entities::to_context::ToContext;
use crate::util_entities::to_file::ToFile;
use regex::Regex;
use serde::{Deserialize, Serialize};
use std::ffi::OsStr;
use std::io::{BufRead, BufReader};
use std::path::PathBuf;

#[derive(Deserialize, Serialize, Clone)]
pub struct ToSnippet {
    pub snippet: String,
    pub line_number: i32,
    pub column_number: i32,
    pub length: i32,
    pub file: Option<ToFile>,
    pub context: Option<ToContext>,
}

// implement from ToTicketPositionInfo
impl ToSnippet {
    pub fn from_to_ticket_position_and_file_path(
        snippet: &String,
        to_ticket_position: &ToTicketPositionInfo,
        context: Option<ToContext>,
    ) -> Self {
        let file = to_ticket_position
            .file_path
            .as_ref()
            .map(|file_path| ToFile::from(file_path.as_str()));
        ToSnippet {
            snippet: snippet.clone(),
            line_number: to_ticket_position.line as i32,
            column_number: to_ticket_position.column as i32,
            length: to_ticket_position.length as i32,
            file,
            context,
        }
    }
}
