use std::borrow::Borrow;
use regex::{escape, Regex};
use crate::to_dtos::to_scan_dto::ToScanRequestDto;

use crate::to_parser::parser_option::ToParserOption;
use crate::to_parser::to_parser_result::ToParserResult;
use crate::to_tag::to_tag_struct::{ToTag};
use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;
use crate::to_ticket::to_ticket_struct::ToTicket;


/// Parser to scan text for tickets
pub struct ToParser {}


impl ToParser {
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
    /// let result = ToParser::scan_text_for_tags(raw_text, &ToParserOption::default());
    /// assert_eq!(result.tos.len(), 1);
    /// assert_eq!(result.tos.first().unwrap().key, "KEY");
    /// assert_eq!(result.tos.first().unwrap().value, "VALUE");
    /// assert_eq!(result.tos.first().unwrap().note, "NOTE");
    ///
    /// ```
    pub fn scan_text_for_tags(text: &str, opt: &ToParserOption) -> ToParserResult<ToTag> {
        let text_original = text.to_string();
        let all_tickets = ToParser::scan_text_for_tickets(text, opt);
        let mut tags: Vec<ToTag> = Vec::new();
        for ticket in all_tickets {
            let tag = ToTag::from(ticket);

            // check if duplicate tags are allowed
            if opt.return_duplicate_tags {
                tags.push(tag);
            } else {
                // check if tag already exists
                let mut tag_exists = false;
                for existing_tag in &tags {
                    if existing_tag.key == tag.key && existing_tag.value == tag.value && existing_tag.note == tag.note {
                        tag_exists = true;
                        break;
                    }
                }
                if !tag_exists {
                    tags.push(tag);
                }
            }
        }
        // replace all tags with empty string
        let mut text_cleaned = text.to_string();
        for tag in &tags {
            text_cleaned = text_cleaned.replace(&tag.print_tag(None), "");
        }
        ToParserResult {
            text_original,
            tos: tags,
            text_cleaned
        }
    }

    /// Parse all to ticket markers in a text and return a list of TextualObjectTicket.
    /// The text is not modified.
    /// The list of tickets is sorted by position in the text.
    ///
    /// # Arguments
    /// * `text` - raw text to parse
    /// * `opt` - parser options
    ///
    /// # Returns
    /// * `Vec<ToTicket>` - list of ToTicket extracted from the text
    ///
    /// # Example
    ///
    /// ```
    /// use to_core::to_parser::parser::ToParser;
    /// use to_core::to_ticket::to_ticket_struct::ToTicket;
    /// use to_core::to_parser::parser_option::ToParserOption;
    ///
    /// let raw_text = "[[KEY1:VALUE1|KEY2:VALUE2]]";
    /// let result = ToParser::scan_text_for_tickets(raw_text, &ToParserOption::default());
    /// assert_eq!(result.len(), 1);
    /// assert_eq!(result.first().unwrap().key, "KEY1");
    /// assert_eq!(result.first().unwrap().value, "VALUE1");
    /// assert_eq!(result.get(1).unwrap().key, "KEY2");
    /// assert_eq!(result.get(1).unwrap().value, "VALUE2");
    ///
    pub fn scan_text_for_tickets(text: &str, opt: &ToParserOption) -> Vec<ToTicket> {
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

    /// Read a plain text file and scan tags in it
    pub fn scan_file_for_tags(file_path: &str, opt: &ToParserOption) -> ToParserResult<ToTag> {
        let text = std::fs::read_to_string(file_path).unwrap();
        ToParser::scan_text_for_tags(&text, opt)
    }

    /// Read a plain text file and scan tickets in it
    pub fn scan_file_for_tickets(file_path: &str, opt: &ToParserOption) -> Vec<ToTicket> {
        let text = std::fs::read_to_string(file_path).unwrap();
        ToParser::scan_text_for_tickets(&text, opt)
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
        let result = ToParser::scan_text_for_tickets(raw_text, &opt);
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].ticket_id, "1");
    }

    // test two marks
    #[test]
    fn test_two_marks() {
        let raw_text = "[[id:1]][[id:2]]";
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(raw_text, &opt);
        assert_eq!(result.len(), 2);
        assert_eq!(result[0].ticket_id, "1");
        assert_eq!(result[1].ticket_id, "2");
    }

    // test two marks with different positions
    #[test]
    fn test_two_marks_different_positions() {
        let raw_text = "[[id:1]]\n[[id:2]]";
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(raw_text, &opt);
        assert_eq!(result.len(), 2);
        assert_eq!(result[0].ticket_id, "1");
        assert_eq!(result[1].ticket_id, "2");
    }

    // test three marks with different positions
    #[test]
    fn test_three_marks_different_positions() {
        let raw_text = "[[id:1]]\n[[id:2]]\n[[id:3]]";
        let opt = ToParserOption::default();
        let result = ToParser::scan_text_for_tickets(raw_text, &opt);
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
        let result = ToParser::scan_text_for_tickets(&raw_text, &opt);
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
        let result = ToParser::scan_text_for_tickets(&raw_text, &opt);
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
        let result = ToParser::scan_text_for_tickets(raw_text, &opt);
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
        let _result = ToParser::scan_text_for_tickets(raw_text, &ToParserOption::default());
        let result = ToParser::scan_text_for_tags(raw_text, &ToParserOption::default());
        assert_eq!(result.text_cleaned, "1\n2\n3");
        assert_eq!(result.tos.len(), 3);
        assert_eq!(result.text_original, raw_text);
        // check first tag
        assert_eq!(result.tos[0].key, "KEY");
        // check second tag
        // check third tag
    }

    // test if duplicate tags are removed
    #[test]
    fn test_scan_text_for_tags_remove_duplicate_tags() {
        let raw_text = "1[[KEY|VALUE|NOTE]]\n2[[KEY2|VALUE2|NOTE2]]\n3[[KEY3|VALUE3|NOTE3]]\n4[[KEY|VALUE|NOTE]]";
        let result = ToParser::scan_text_for_tags(raw_text, &ToParserOption::default());
        let cleaned_text = result.text_cleaned;
        assert_eq!(cleaned_text, "1\n2\n3\n4");
        assert_eq!(result.tos.len(), 3);

        let raw_text_without_duplicate = "1[[KEY|VALUE|NOTE]]\n2[[KEY2|VALUE2|NOTE2]]\n3[[KEY3|VALUE3|NOTE3]]";
         let result_without_duplicate = ToParser::scan_text_for_tags(raw_text_without_duplicate, &ToParserOption::default());
        let cleaned_text = result_without_duplicate.text_cleaned;
        assert_eq!(result_without_duplicate.tos.len(), 3);
        assert_eq!(cleaned_text, "1\n2\n3");


    }
}
