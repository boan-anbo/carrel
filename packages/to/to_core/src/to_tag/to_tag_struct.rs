use crate::to_parser::parser::ToParser;
use crate::util_entities::to_snippet::ToSnippet;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::to_parser::parser_option::ToParserOption;
use crate::to_ticket::to_ticket_marker::ToMarker;
use crate::to_ticket::to_ticket_struct::ToTicket;
use crate::util_entities::to_context::ToContext;

/// This is a
#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct ToTag {
    pub id: Option<i32>,
    pub uuid: Uuid,
    pub key: String,
    pub value: Option<String>,
    pub note: Option<String>,
    pub raw_tag_string: String,
    pub snippet: Option<ToSnippet>,
    pub to_uuid: Option<Uuid>,
}

// implement from TextualObjectTicket

impl From<ToTicket> for ToTag {
    fn from(to_ticket: ToTicket) -> ToTag {
        let values: IndexMap<String, String> = to_ticket.values;
        let mut key = String::new();
        if !values.is_empty() {
            key = values.keys().next().unwrap().to_string().to_lowercase();
        }
        let mut value: Option<String> = None;
        if values.len() >= 2 {
            let second_key = values.keys().nth(1).unwrap().to_string();
            value = Some(second_key);
        }
        let mut note: Option<String> = None;
        if values.len() >= 3 {
            let third_key = values.keys().nth(2).unwrap().to_string();
            note = Some(third_key);

            // if there are more keys, add all to note to note and separate with comma
            for key in values.keys().skip(3) {
                note = Some(format!("{}, {}", note.unwrap(), key));
            }
        }

        // use the format to represent the string of the tag: leftMarker +[key|value|note]+ rightMarker
        // use string builder
        let mut tag_string = String::new();
        tag_string.push_str(&to_ticket.to_marker.left_marker);
        tag_string.push_str(key.to_lowercase().as_str());
        // lower
        if value.as_ref().is_some() {
            tag_string.push('|');
            tag_string.push_str(value.as_ref().unwrap().to_lowercase().as_str());
        }
        if note.as_ref().is_some() {
            tag_string.push('|');
            tag_string.push_str(note.as_ref().unwrap().to_lowercase().as_str());
        }
        tag_string.push_str(&to_ticket.to_marker.right_marker);

        let mut snippet = None;
        // convert ToPositionInfo to SnippetLocation
        let ticket_position = to_ticket.to_intext_option;

        if ticket_position.is_some() {
            let ticket_position = ticket_position.unwrap();
            snippet = Some(ToSnippet::from_to_ticket_position_and_file_path(
                &tag_string,
                &ticket_position,
                to_ticket.to_context,
            ));

            // give the ticket string to the snippet location as duplicate information that is useful when snippet_location is used alone.
            snippet.as_mut().unwrap().snippet = tag_string.clone();
        }

        ToTag {
            id: None,
            uuid: Uuid::new_v4(), // since this is a new tag, it needs a new uuid
            key,
            value,
            note,
            raw_tag_string: tag_string,
            snippet,
            to_uuid: None, // this is a new tag, so it has no to_uuid until its parent TO is saved
        }
    }
}

impl ToTag {
    // implement print tag
    pub fn print_tag(&self, to_mark: Option<ToMarker>) -> String {
        // create default to_marker if not provided
        let mut to_marker = ToMarker::default();
        if let Some(..) = to_mark {
            to_marker = to_mark.unwrap();
        }
        let mut tag = vec![self.key.clone()];
        if self.value.is_some() {
            tag.push(self.value.clone().unwrap());
        }
        if self.note.is_some() {
            tag.push(self.note.clone().unwrap());
        };
        // surround content by to_marker.start and to_marker.end, and separate with to_marker.separator
        let tag = tag.join(&to_marker.value_entry_separator);
        format!("{}{}{}", to_marker.left_marker, tag, to_marker.right_marker)

        // add value if it exists with separator
    }

    // get random totag
    pub fn get_random_totags(to_uuid: Uuid, num_of_tags: i32) -> Vec<ToTag> {
        let mut tags: Vec<ToTag> = vec![];
        for _ in 0..num_of_tags {
            let tag = ToTag {
                id: None,
                uuid: Uuid::new_v4(),
                key: "key".to_string(),
                value: Some("value".to_string()),
                note: Some("note".to_string()),
                raw_tag_string: "raw_tag_string".to_string(),
                snippet: None,
                to_uuid: Some(to_uuid),
            };
            tags.push(tag);
        }
        tags
    }
}

// tests
#[cfg(test)]
mod test {
    use std::borrow::Borrow;

    use crate::to_parser::parser::ToParser;
    use crate::to_parser::parser_option::ToParserOption;
    use crate::to_tag::to_tag_struct::ToTag;

    // test from ticket to tag
    #[test]
    fn test_from_ticket_to_tag() {
        let raw_text = "[[KEY|VALUE|NOTE]]";
        let result = ToParser::scan_text_for_tickets(raw_text, &ToParserOption::default(), None);
        let first_ticket = result[0].clone();
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].values.get("KEY").unwrap(), "");
        let tag = ToTag::from(first_ticket);
        assert_eq!(&tag.key, "KEY");
        assert_eq!(&tag.value.unwrap(), "VALUE");
        assert_eq!(&tag.note.unwrap(), "NOTE");
    }

    // test noise ticket to tag
    #[test]
    fn test_noise_ticket_to_tag() {
        let raw_text = "[[KEY:value|VALUE:2|:3]]";
        let result = ToParser::scan_text_for_tickets(raw_text, &ToParserOption::default(), None);
        let first_ticket = result[0].clone();
        assert_eq!(result.len(), 1);
        let tag = ToTag::from(first_ticket);
        assert_eq!(&tag.key, "KEY");
        assert_eq!(&tag.value.as_ref().unwrap().clone(), "VALUE");
        assert_eq!(&tag.note.as_ref().unwrap().clone(), "3");
        let tag_print = tag.clone().borrow().print_tag(None);
        assert_eq!(tag_print, "[[KEY|VALUE|3]]");
    }

    // test ticket to tag, key and value only
    #[test]
    fn test_ticket_to_tag_key_value_only() {
        let raw_text = "[[KEY:value|VALUE:2]]";
        let result = ToParser::scan_text_for_tickets(raw_text, &ToParserOption::default(), None);
        let first_ticket = result[0].clone();
        assert_eq!(result.len(), 1);
        let tag = ToTag::from(first_ticket);
        assert_eq!(&tag.key, "KEY");
        assert_eq!(&tag.value.as_ref().unwrap().clone(), "VALUE");
        let tag_print = tag.clone().borrow().print_tag(None);
        assert_eq!(tag_print, "[[KEY|VALUE]]");
    }

    // test ticket to tag, key only
    #[test]
    fn test_ticket_to_tag_key_only() {
        let raw_text = "[[KEY:value]]";
        let result = ToParser::scan_text_for_tickets(raw_text, &ToParserOption::default(), None);
        let first_ticket = result[0].clone();
        assert_eq!(result.len(), 1);
        let tag = ToTag::from(first_ticket);
        assert_eq!(&tag.key, "KEY");
        let tag_print = tag.clone().borrow().print_tag(None);
        assert_eq!(tag_print, "[[KEY]]");
    }

    // empty value should not be ignored
    // TODO fix this, let empty value be NOT to be ignored
    #[test]
    fn test_ticket_to_tag_empty_value() {
        let raw_text = "[[KEY||NOTE]]";
        let result = ToParser::scan_text_for_tags(raw_text, &ToParserOption::default(), None);
        let first_tag = result.tos[0].clone();
        assert_eq!(result.tos.len(), 1);
        assert_eq!(&first_tag.key, "KEY");
        assert_eq!(&first_tag.value.unwrap(), "");
        assert_eq!(&first_tag.note.unwrap(), "NOTE");
    }

    // should have text
    #[test]
    fn test_ticket_to_tag_text() {
        let raw_text_with_only_key = "[[KEY]]";
        let result_with_only_key =
            ToParser::scan_text_for_tags(raw_text_with_only_key, &ToParserOption::default(), None);
        let first_tag_with_only_key = result_with_only_key.tos[0].clone();
        assert_eq!(result_with_only_key.tos.len(), 1);
        assert_eq!(&first_tag_with_only_key.raw_tag_string, "[[KEY]]");

        let raw_text_with_key_value = "[[KEY|VALUE]]";
        let result_with_key_value =
            ToParser::scan_text_for_tags(raw_text_with_key_value, &ToParserOption::default(), None);
        let first_tag_with_key_value = result_with_key_value.tos[0].clone();
        assert_eq!(result_with_key_value.tos.len(), 1);
        assert_eq!(&first_tag_with_key_value.raw_tag_string, "[[KEY|VALUE]]");

        let raw_text_with_key_value_note = "[[KEY|VALUE|NOTE]]";
        let result_with_key_value_note = ToParser::scan_text_for_tags(
            raw_text_with_key_value_note,
            &ToParserOption::default(),
            None,
        );
        let first_tag_with_key_value_note = result_with_key_value_note.tos[0].clone();
        assert_eq!(result_with_key_value_note.tos.len(), 1);
        assert_eq!(
            &first_tag_with_key_value_note.raw_tag_string,
            "[[KEY|VALUE|NOTE]]"
        );
    }
}
