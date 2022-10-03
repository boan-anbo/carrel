use regex::Captures;
use serde::{Deserialize, Serialize};

/// struct for recognition the regex match position: line, column, length of the ticket in the original text
#[derive(Serialize, Deserialize, Clone)]
pub struct ToTicketPositionInfo {
    pub line: usize,

    /// this is byte length, not character length. A Chinese character is 3 bytes
    pub column: usize,
    /// this is byte length, not character length. A Chinese character is 3 bytes
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


#[cfg(test)]
mod test {

//     Should handle Chinese character matches

    use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;

    #[test]
    fn test_chinese() {
        let text = "这是一个测试";
        let re = regex::Regex::new(r"(测试)").unwrap();
        let mut line = 0;
        let mut file_path = None;
        let mut positions = vec![];
        for m in re.captures_iter(text) {
            positions.push(ToTicketPositionInfo::from_match(&m, line, file_path.clone()));
        }
        assert_eq!(positions.len(), 1);
        assert_eq!(positions[0].line, 0);
        assert_eq!(positions[0].column, 12);

        assert_eq!(positions[0].length, 6);
        assert_eq!(positions[0].raw_text, "测试");
    }

}
