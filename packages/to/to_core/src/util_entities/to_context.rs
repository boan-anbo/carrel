use std::ops::Sub;
use std::str::Lines;
use crate::util_entities::to_snippet::ToSnippet;
use serde::{Deserialize, Serialize};
use crate::to_parser::parser_option::ToParserOption;
use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;

pub struct ToContextExtractOption {
    // characters before the context index
    pub chars_before: usize,
    // characters after the context index
    pub chars_after: usize,
    // whether extract the whole line, if so, the chars_before and chars_after will be ignored
    pub whole_line: bool,
    // whether extract the whole text, if so, all the above will be ignored
    pub whole_text: bool,
}

// impl default
impl Default for ToContextExtractOption {
    fn default() -> Self {
        // default to extract two lines above and below the context line
        ToContextExtractOption {
            chars_before: 0,
            chars_after: 0,
            whole_line: true,
            whole_text: false,
        }
    }
}

// impl from ToParserOption
impl From<&ToParserOption> for ToContextExtractOption {
    fn from(to_parser_option: &ToParserOption) -> Self {
        ToContextExtractOption {
            chars_before: to_parser_option.context_chars_before,
            chars_after: to_parser_option.context_chars_after,
            whole_line: to_parser_option.context_whole_line,
            whole_text: to_parser_option.context_whole_text,
        }
    }
}

/// This is a
#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct ToContext {
    pub context: String,
    // the beginning column of the snippet in context
    pub snippet_in_context_column_number: i32,
    // snippet_string
    pub snippet_string: String,
}


// implement method for ToContext with takes in a ToSnippet with location information and a original text
pub fn extract_context(snippet_string: String, snippet_line: usize, column: usize, length: usize, text: &str, opt: ToContextExtractOption) -> ToContext { let line_number = snippet_line;
    // characters before the context index
    let chars_before = opt.chars_before;
    // characters after the context index
    let chars_after = opt.chars_after;

    let snippet_in_context_column_number= chars_before as i32;

    // whether extract the whole text, all the rest will be ignored
    if opt.whole_text {
        return ToContext {
            context: text.to_string(),
            snippet_in_context_column_number,
            snippet_string,
        };
    }

    let original_lines = text.lines().map(|s| s.to_string()).collect::<Vec<String>>();

    if opt.whole_line {
        let snippet_line = original_lines[line_number].to_string();
        return ToContext {
            context: snippet_line,
            snippet_in_context_column_number,
            snippet_string,
        };
    }


    let initial_start_index = column;
    let initial_end_index = initial_start_index + length;

    let start_index = initial_start_index.saturating_sub(chars_before);

    let mut end_index = initial_end_index + chars_after;

    if end_index > text.len() {
        end_index = text.len();
    }

    let context = text[start_index..end_index].to_string();

    ToContext {
        context,
        snippet_in_context_column_number,
        snippet_string,
    }
}

pub fn extract_context_by_snippet(snippet: &ToSnippet, text: &str, opt: ToContextExtractOption) -> ToContext {

    let snippet_string = snippet.snippet.clone();
    let snippet_line = snippet.line_number as usize;
    let column = snippet.column_number as usize;
    let length = snippet.length as usize;

    extract_context(snippet_string, snippet_line, column, length, text, opt)
}

pub fn extract_context_by_position(position: &ToTicketPositionInfo, text: &str, opt: ToContextExtractOption) -> ToContext {

    let snippet_string = position.raw_text.clone();
    let snippet_line = position.line as usize;
    // calculate all the characters before the position accounting before the snippet line
    let lines_before_snippet_line = text.lines().take(snippet_line).collect::<Vec<&str>>().join("\n");
    let column = lines_before_snippet_line.len() + position.column;
    let length = position.length as usize;


    extract_context(snippet_string, snippet_line, column, length, text, opt)
}


#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_extract_context() {
        let sample_text = "This is the first line\n
        This is the second line\n
        This is the third line\n
        This is the fourth line";

        let snippet = ToSnippet {
            snippet: "".to_string(),
            line_number: 1,
            column_number: 1,
            length: 1,
            file:None,
            context:None,
        };

        // test whole text
        let option_whole_text = ToContextExtractOption {
            whole_text: true,
            ..Default::default()
        };

        let context = extract_context_by_snippet(&snippet, sample_text, option_whole_text);

        assert_eq!(context.context, sample_text);
    }

    // test whole line
    #[test]
    fn test_extract_context_whole_line() {
        let sample_text = "This is the first line\nThis is the second line\nThis is the third line\nThis is the fourth line";
        let snippet = ToSnippet {
            snippet: "".to_string(),
            line_number: 1,
            column_number: 1,
            length: 1,
            file:None,
            context:None,
        };

        let option_whole_line = ToContextExtractOption {
            whole_line: true,
            ..Default::default()
        };

        let context = extract_context_by_snippet(&snippet, sample_text, option_whole_line);

        assert_eq!(context.context, "This is the second line");
    }

    // test chars before and after
    #[test]
    fn test_extract_context_chars_before_and_after() {
        let sample_text = "This is the first line\nThis is the second line\nThis is the third line\nThis is the fourth line";
        let snippet = ToSnippet {
            snippet: "".to_string(),
            line_number: 1,
            column_number: 10,
            length: 20,
            file:None,
            context:None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 5,
            chars_after: 20,
            whole_line: false,
            ..Default::default()
        };

        let context = extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "is the first line\nThis is the second line\nThi");
    }

    // check the snippet_in_context_column_number
    #[test]
    fn test_extract_context_snippet_in_context_column_number() {
        let sample_text = "This is the first line\nThis is the second line\nThis is the third line\nThis is the fourth line";
        let snippet = ToSnippet {
            snippet: "".to_string(),
            line_number: 1,
            column_number: 10,
            length: 20,
            file:None,
            context:None,

        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 5,
            chars_after: 20,
            whole_line: false,
            ..Default::default()
        };

        let context = extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        println!("context: {}", context.context);
        assert_eq!(context.snippet_in_context_column_number, 5);

    }

    // try out of bound index
    #[test]
    fn test_extract_context_out_of_bound() {
        let sample_text = "This is the first line\nThis is the second line\nThis is the third line\nThis is the fourth line";
        let snippet = ToSnippet {
            snippet: "".to_string(),
            line_number: 1,
            column_number: 10,
            length: 20,
            file:None,
            context:None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 500,
            chars_after: 500,
            whole_line: false,
            ..Default::default()
        };

        let context = extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "This is the first line\nThis is the second line\nThis is the third line\nThis is the fourth line");
    }
}
