use std::ffi::OsStr;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::PathBuf;
use regex::Regex;
use serde::{Deserialize, Serialize};
use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;

#[derive( Deserialize, Serialize, Clone)]

pub struct ToSnippetLocation {
    pub snippet: String,
    pub line_number: i32,
    pub column_number: i32,
    pub length: i32,
    pub file_path: String,
    pub file_name: String,
    pub file_extension: String,
}


// implement from ToTicketPositionInfo
impl ToSnippetLocation {
    pub fn from_to_ticket_position_and_file_path(to_ticket_position: &ToTicketPositionInfo) -> Self {
        let file_path = to_ticket_position.file_path.clone().unwrap_or("".to_string());

        let file_path_buf = PathBuf::from(&file_path);

        ToSnippetLocation {
            snippet: "".to_string(),
            line_number: to_ticket_position.line as i32,
            column_number: to_ticket_position.column as i32,
            length: to_ticket_position.length as i32,
            file_path: file_path.clone(),
            file_name: file_path_buf.file_name().unwrap_or( OsStr::new("")).to_str().unwrap_or("").to_string(),
            file_extension: file_path_buf.extension().unwrap_or( OsStr::new("")).to_str().unwrap_or("").to_string(),
        }
    }
}
