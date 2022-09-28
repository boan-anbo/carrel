use std::ffi::OsStr;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::PathBuf;
use regex::Regex;
use serde::{Deserialize, Serialize};
use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;

#[derive( Deserialize, Serialize, Clone)]

pub struct ToSnippet {
    pub snippet: String,
    pub line_number: i32,
    pub column_number: i32,
    pub length: i32,
}


// implement from ToTicketPositionInfo
impl ToSnippet {
    pub fn from_to_ticket_position_and_file_path(snippet: &String, to_ticket_position: &ToTicketPositionInfo) -> Self {
        ToSnippet {
            snippet: snippet.clone(),
            line_number: to_ticket_position.line as i32,
            column_number: to_ticket_position.column as i32,
            length: to_ticket_position.length as i32,
        }
    }
}
