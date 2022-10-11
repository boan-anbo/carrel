use carrel_commons::carrel::common::context::v1::Context;
use std::iter;
use std::ops::Sub;

use serde::{Deserialize, Serialize};
use serde_json::json;

use crate::to_parser::parser_option::ToParserOption;
use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;
use crate::util_entities::to_snippet::ToSnippet;

#[derive(Debug, Clone, Serialize, Deserialize)]
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
            chars_before: 500,
            chars_after: 500,
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
pub fn extract_context(
    snippet_string: String,
    snippet_line: usize,
    snippet_start_index: usize,
    snippet_lenth: usize,
    text: &str,
    opt: ToContextExtractOption,
) -> ToContext {
    let line_number = snippet_line;
    // characters before the context index
    let chars_before = opt.chars_before;
    // characters after the context index
    let chars_after = opt.chars_after;

    let snippet_in_context_column_number = chars_before as i32;

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

    let context = extract_context_by_indices(
        snippet_start_index,
        snippet_lenth,
        text,
        chars_before,
        chars_after,
    );

    ToContext {
        context,
        snippet_in_context_column_number,
        snippet_string,
    }
}

fn extract_context_by_indices(
    snipper_start_index: usize,
    length: usize,
    text: &str,
    chars_before_snippet: usize,
    chars_after_snippet: usize,
) -> String {
    let initial_end_index = snipper_start_index + length;

    // find the context_start_index by going backwards from the start_index by chars_before_snippet, chars_before_snippet by unicode or ascii
    // loop
    // check if the start_index is the beginning of a char boundary
    let context_start_index_starting_point =
        snipper_start_index.saturating_sub(chars_before_snippet);
    let context_start_index = if context_start_index_starting_point > 0 {
        let mut current_context_start_index = context_start_index_starting_point;
        while !text.is_char_boundary(current_context_start_index) {
            current_context_start_index -= 1;
        }
        current_context_start_index
    } else {
        0
    };
    // find the context_end_index by going forward from the end_index by chars_after_snippet, chars_after_snippet by unicode or ascii
    // loop
    // check if the end_index is the end of a char boundary
    let mut context_end_index_starting_point = initial_end_index + 1;

    // iter the number of times of chars_after_snippet

    let context_end_index = iter::repeat(0).take(chars_after_snippet).fold(
        context_end_index_starting_point,
        |current_context_end_index, _| {
            if current_context_end_index <= text.len() {
                let mut current_context_end_index = context_end_index_starting_point;
                while !text.is_char_boundary(current_context_end_index) {
                    current_context_end_index += 1;
                    context_end_index_starting_point += 1;
                    // break if the current_context_end_index is over end of the text
                    if current_context_end_index > text.len() {
                        break;
                    }
                }
                current_context_end_index
            } else {
                text.len()
            }
        },
    );
    // let context_end_index = if  context_end_index_starting_point <= text.len() {
    //     let mut current_context_end_index = context_end_index_starting_point;
    //     while !text.is_char_boundary(current_context_end_index) {
    //         current_context_end_index += 1;
    //     }
    //     current_context_end_index
    // } else {
    //     text.len()
    // };

    // use the context_start_index and context_end_index to get the context according for unicode or ascii
    let context = text
        .get(context_start_index..context_end_index)
        .unwrap_or(text)
        .to_string();
    context
}

pub fn extract_context_by_snippet(
    snippet: &ToSnippet,
    text: &str,
    opt: ToContextExtractOption,
) -> ToContext {
    let snippet_string = snippet.snippet.clone();
    let snippet_line = snippet.line_number as usize;
    let snippet_start_index = snippet.column_number as usize;
    let snippet_length = snippet.length as usize;

    extract_context(
        snippet_string,
        snippet_line,
        snippet_start_index,
        snippet_length,
        text,
        opt,
    )
}

/// Extract context from a text
pub fn extract_context_by_position(
    position: &ToTicketPositionInfo,
    text: &str,
    opt: ToContextExtractOption,
) -> ToContext {
    let snippet_string = position.raw_text.clone();
    let snippet_line = position.line as usize;

    let snippet_start_index = calculate_starting_column_from_position(position, text);
    let snippet_length = position.length as usize;

    extract_context(
        snippet_string,
        snippet_line,
        snippet_start_index,
        snippet_length,
        text,
        opt,
    )
}

/// IMPORTANT: ToTicketPositionInfo is based on regex match index, which are based on bytes, not chars (especially not unicode chars). For example, starting index 12 is only the fifth char (啊) in the string "你好世界啊" (which is 5 unicode chars long). So we need to convert the byte index to char index.
fn calculate_starting_column_from_position(position: &ToTicketPositionInfo, text: &str) -> usize {
    // We need not to worry about the starting index, because it's gurantteed to be the beginning of a char boundary. But we need to worry about the ending index, because it's not gurantteed to be the end of a char boundary. So we need to find the next char boundary or the one before.
    let all_lines_before = text.lines().take(position.line).collect::<Vec<&str>>();
    let all_bytes_index_count_before = all_lines_before.iter().map(|s| s.len()).sum::<usize>();
    all_bytes_index_count_before + position.column
}

// impl context from ToContext
impl From<ToContext> for carrel_commons::carrel::common::context::v1::Context {
    fn from(to_context: ToContext) -> Self {
        carrel_commons::carrel::common::context::v1::Context {
            context: to_context.context,

            snippet_in_context_column_number: to_context.snippet_in_context_column_number,
            snippet_string: to_context.snippet_string,
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn should_handle_exception_1() {
        let position = ToTicketPositionInfo {
            line: 0,
            column: 0,
            length: 8,
            raw_text: "[[id:1]]".to_string(),
            file_path: None,
        };
        let text = "[[id:1]]";
        let opt = ToContextExtractOption {
            chars_before: 500,
            chars_after: 500,
            whole_line: false,
            whole_text: false,
        };

        let result = extract_context_by_indices(0, 8, text, 500, 500);
        assert_eq!(result, "[[id:1]]".to_string());
    }

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
            file: None,
            context: None,
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
            file: None,
            context: None,
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
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 5,
            chars_after: 20,
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(
            context.context,
            "is the first line\nThis is the second line\nThi"
        );
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
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 5,
            chars_after: 20,
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

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
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 500,
            chars_after: 500,
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "This is the first line\nThis is the second line\nThis is the third line\nThis is the fourth line");
    }

    // try extract unicode characters
    #[test]
    fn test_extract_context_unicode() {
        let sample_text = "这是中文[[Note]]这是中文";
        let snippet = ToSnippet {
            snippet: "[[Note]]".to_string(),
            line_number: 0,
            column_number: "这是中文".len() as i32,
            length: "[[Note]]".len() as i32,
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 1,
            chars_after: 1,
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "文[[Note]]这");
    }

    // try extract unicode characters on second line
    #[test]
    fn test_extract_context_unicode_second_line() {
        let sample_text = "这是中文\n这是中文[[Note]]这是中文";
        let snippet = ToSnippet {
            snippet: "[[Note]]".to_string(),
            line_number: 1,
            column_number: "这是中文\n这是中文".len() as i32,
            length: "[[Note]]".len() as i32,
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 1,
            chars_after: 1,
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "文[[Note]]这");
    }

    // try extract unicode characters on third line between line breaks
    #[test]
    fn test_extract_context_unicode_third_line() {
        let sample_text = "这是中文\n这是中文\n这是中文[[Note]]这是中文";
        let snippet = ToSnippet {
            snippet: "[[Note]]".to_string(),
            line_number: 2,
            column_number: "这是中文\n这是中文\n这是中文".len() as i32,
            length: "[[Note]]".len() as i32,
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 1,
            chars_after: 1,
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "文[[Note]]这");
    }

    // try extract unicode characters on third line around line breaks
    #[test]
    fn test_extract_context_unicode_third_line_around_line_breaks() {
        let sample_text = "这是中文\n这是中文这是中文\n[[Note]]这是中文";
        let snippet = ToSnippet {
            snippet: "[[Note]]".to_string(),
            line_number: 2,
            column_number: "这是中文\n这是中文这是中文\n".len() as i32,
            length: "[[Note]]".len() as i32,
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 2,
            chars_after: 1, // include a line break
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "文\n[[Note]]这");
    }

    // can extract two characters even for unicode characters
    #[test]
    fn test_extract_context_unicode_two_chars() {
        let sample_text = "这是中文[[Note]]这是中文";
        let snippet = ToSnippet {
            snippet: "[[Note]]".to_string(),
            line_number: 0,
            column_number: "这是中文".len() as i32,
            length: "[[Note]]".len() as i32,
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 2,
            chars_after: 2,
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "中文[[Note]]这是");
    }

    #[test]
    fn test_extract_context_ascii() {
        let sample_text = "This is ascii[[Note]]This is ascii";
        let snippet = ToSnippet {
            snippet: "".to_string(),
            line_number: 1,
            column_number: "This is ascii".len() as i32,
            length: "[[Note]]".len() as i32,
            file: None,
            context: None,
        };

        let option_chars_before_and_after = ToContextExtractOption {
            chars_before: 1,
            chars_after: 1,
            whole_line: false,
            ..Default::default()
        };

        let context =
            extract_context_by_snippet(&snippet, sample_text, option_chars_before_and_after);

        assert_eq!(context.context, "i[[Note]]T");
    }

    // calculate_starting_column_from_position
    #[test]
    fn test_calculate_starting_column_from_position() {
        let sample_text = "这是中文[[Note]]这是中文";
        let position = ToTicketPositionInfo {
            line: 0,
            column: 12,
            length: 0,
            raw_text: "".to_string(),
            file_path: None,
        };

        let starting_column = calculate_starting_column_from_position(&position, sample_text);

        assert_eq!(starting_column, 12);

        // two lines, the second line is the starting line, the first line is empty
        let sample_text_2nd = "\n这是中文[[Note]]这是中文";
        let position_2nd = ToTicketPositionInfo {
            line: 1,
            column: 12,
            length: 0,
            raw_text: "".to_string(),
            file_path: None,
        };

        let starting_column_2nd =
            calculate_starting_column_from_position(&position_2nd, sample_text_2nd);

        assert_eq!(starting_column_2nd, 12);
    }

    #[test]
    fn test_calculate_starting_column_from_position_unicode() {
        // two lines, the second line is the starting line, the first line is not empty
        let sample_text_2nd = "这是第一行\n这是中文[[Note]]这是中文";

        let position_2nd = ToTicketPositionInfo {
            line: 1,
            column: 12,
            length: 0,
            raw_text: "".to_string(),
            file_path: None,
        };

        let starting_column_2nd =
            calculate_starting_column_from_position(&position_2nd, sample_text_2nd);

        assert_eq!(starting_column_2nd, 15 + 12);
    }
}
