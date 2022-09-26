use regex::Captures;
use serde::{Deserialize, Serialize};

/// struct for recognition the regex match position: line, column, length of the ticket in the original text
#[derive(Serialize, Deserialize, Clone)]
pub struct ToTicketPositionInfo {
    pub line: usize,
    pub column: usize,
    pub length: usize,
    pub raw_text: String,
    // the file of the ticket, not always available because ticket could exist before the file is created
    pub file_path: Option<String>,
}

impl ToTicketPositionInfo {
    pub fn from_match(m: &Captures, line: usize, file_path: Option<String>) -> Self {
        ToTicketPositionInfo {
            line,
            column: m.get(0).unwrap().start(),
            length: m.get(0).unwrap().end() - m.get(0).unwrap().start(),
            raw_text: m.get(0).unwrap().as_str().to_string(),
            file_path,
        }
    }
}
