use regex::{escape, Regex};

use crate::to_parser::parser_option::ToParserOption;
use crate::to_tag::to_tag_struct::{ToTag, ToTagScanResult};
use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;
use crate::to_ticket::to_ticket_struct::ToTicket;


/// Parser to scan text for tickets
pub struct ToParser {}


impl ToParser {
    /// Parse all to ticket markers in a text and return a list of TextualObjectTicket.
    /// # Arguments
    /// * `text` - raw text to parse
    ///
    /// # Returns
    /// * `Vec<TextualObjectTicket>` - list of TextualObjectTicket extracted from the text
    pub fn scan_text_for_tickets(text: &str, opt: ToParserOption) -> Vec<ToTicket> {
        let lines: &Vec<String> = &text.lines().map(|s| s.to_string()).collect();
        let re = Regex::new(format!(r"{}(.*?){}", escape(&opt.to_marker.left_marker), escape(&opt.to_marker.right_marker)).as_str()).unwrap();
        let mut result = Vec::new();
        // iterate with line number
        for (line_number, line) in lines.iter().enumerate() {
            // iterate with match
            for m in re.captures_iter(line) {
                // get the match position
                let position = ToTicketPositionInfo::from_match(&m, line_number);
                // get first group of match
                let content = m.get(1).unwrap().as_str();
                // parse the match
                let to_ticket = ToTicket::parse(content, &opt, Some(position));
                // add the match to the result
                result.push(to_ticket);
            }
        }

        result
    }


    /// Scans plain texts for TO Tags and returns a list of ToTag
    ///
    /// # Arguments
    /// * `text` - raw text to parse
    ///
    /// # Returns
    /// * `ToTagScanResult` - list of ToTag extracted from the text with original and cleaned text
    ///
    /// # Example
    ///
    /// ```
    /// use to_core::to_parser::parser::ToParser;
    /// use to_core::to_tag_struct::ToTag;
    /// use to_core::to_parser::parser_option::ToParserOption;
    /// let raw_text = "[[KEY|VALUE|NOTE]]";
    /// let result = ToParser::scan_text_for_tags(raw_text, ToParserOption::default());
    /// assert_eq!(result.tags.len(), 1);
    /// assert_eq!(result.tags.first().unwrap().key, "KEY");
    /// assert_eq!(result.tags.first().unwrap().value, "VALUE");
    /// assert_eq!(result.tags.first().unwrap().note, "NOTE");
    ///
    /// ```

    pub fn scan_text_for_tags(text: &str, opt: ToParserOption) -> ToTagScanResult {
        let text_original = text.to_string();
        let all_tickets = ToParser::scan_text_for_tickets(text, opt);
        let mut tags: Vec<ToTag> = Vec::new();
        for ticket in all_tickets {
            let tag = ToTag::from(ticket);
            tags.push(tag);
        }
        // replace all tags with empty string
        let mut text_without_tags = text.to_string();
        for tag in &tags {
            text_without_tags = text_without_tags.replace(&tag.print_tag(None), "");
        }
        ToTagScanResult {
            text_original,
            text_without_tags,
            tags,
        }
    }
}

// test create default TextualObjectTicket
#[cfg(test)]
mod tests {
    use std::borrow::Borrow;
    use super::*;

    #[test]
    fn test_one_mark() {
        let raw_text = "[[id:1]]";
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(raw_text, opt);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].ticket_id, "1");
    }

    // test two marks
    #[test]
    fn test_two_marks() {
        let raw_text = "[[id:1]][[id:2]]";
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(raw_text, opt);
        assert_eq!(result.len(), 2);
        assert_eq!(result[0].ticket_id, "1");
        assert_eq!(result[1].ticket_id, "2");
    }

    // test two marks with different positions
    #[test]
    fn test_two_marks_different_positions() {
        let raw_text = "[[id:1]]\n[[id:2]]";
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(raw_text, opt);
        assert_eq!(result.len(), 2);
        assert_eq!(result[0].ticket_id, "1");
        assert_eq!(result[1].ticket_id, "2");
    }

    // test three marks with different positions
    #[test]
    fn test_three_marks_different_positions() {
        let raw_text = "[[id:1]]\n[[id:2]]\n[[id:3]]";
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(raw_text, opt);
        assert_eq!(result.len(), 3);
        assert_eq!(result[0].ticket_id, "1");
        assert_eq!(result[1].ticket_id, "2");
        assert_eq!(result[2].ticket_id, "3");
    }

    // test one mark position
    #[test]
    fn test_one_mark_position() {
        let indent = "12345";
        let text = "[[id:1]]";
        let raw_text = format!("{}{}", indent, text);
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(&raw_text, opt);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].ticket_id, "1");
        assert_eq!(result[0].to_intext_option.as_ref().unwrap().line, 0);
        assert_eq!(result[0].to_intext_option.as_ref().unwrap().column, indent.len());
        assert_eq!(result[0].to_intext_option.as_ref().unwrap().length, text.len());
    }

    // test one mark position in second line
    #[test]
    fn test_one_mark_position_in_second_line() {
        let indent = "12345";
        let text = "[[id:1]]";
        let raw_text = format!("\n{}{}", indent, text);
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(&raw_text, opt);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].ticket_id, "1");
        assert_eq!(result[0].to_intext_option.as_ref().unwrap().line, 1);
        assert_eq!(result[0].to_intext_option.as_ref().unwrap().column, indent.len());
        assert_eq!(result[0].to_intext_option.as_ref().unwrap().length, text.len());
    }

    // test tag scanning
    #[test]
    fn test_tag_scanning() {
        let raw_text = "[[IMPORTANT|RELEVANT|THIS is something that blahblah]]";
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(raw_text, opt);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].values.len(), 3);
        let first_key = result[0].values.keys().next().unwrap();
        assert_eq!(first_key, "IMPORTANT");
        let second_key = result[0].values.keys().nth(1).unwrap();
        assert_eq!(second_key, "RELEVANT");
        let third_key = result[0].values.keys().nth(2).unwrap();
        assert_eq!(third_key, "THIS is something that blahblah");
    }

    // test scan text for tags
    #[test]
    fn test_scan_text_for_tags() {
        let raw_text = "1[[KEY|VALUE|NOTE]]\n2[[KEY2|VALUE2|NOTE2]]\n3[[KEY3|VALUE3|NOTE3]]";
        let _result = ToParser::scan_text_for_tickets(raw_text, ToParserOption::default());
        let result = ToParser::scan_text_for_tags(raw_text, ToParserOption::default());
        assert_eq!(result.text_without_tags, "1\n2\n3");
        assert_eq!(result.tags.len(), 3);
        assert_eq!(result.text_original, raw_text);
        // check first tag
        assert_eq!(result.tags[0].key, "KEY");
        // check second tag
        // check third tag


    }
}
