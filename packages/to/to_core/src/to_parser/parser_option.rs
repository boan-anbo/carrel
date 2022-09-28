use crate::to_ticket::to_ticket_marker::ToMarker;

pub struct ToParserOption {
    pub to_marker: ToMarker,
    pub date_format: String,
    // whether return tickets with same tag key, value and note
    pub return_duplicate_tags: bool,
    // how many chars before the context
    pub context_chars_before: usize,
    // how many chars after the context
    pub context_chars_after: usize,
    // whether extract the whole line, if so, the chars_before and chars_after will be ignored
    pub context_whole_line: bool,
    // context whole text
    pub context_whole_text: bool,
}

impl Default for ToParserOption {
    fn default() -> Self {
        ToParserOption {
            to_marker: ToMarker::default(),
            date_format: String::from("%Y-%m-%d %H:%M:%S"),
            return_duplicate_tags: false,
            context_chars_before: 500,
            context_chars_after: 500,
            context_whole_line: false,
            context_whole_text: false,
        }
    }
}
