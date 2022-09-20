use crate::to_ticket::to_ticket_marker::ToMarker;

pub struct ToParserOption {
    pub to_marker: ToMarker,
    pub date_format: String,
    // whether return tickets with same tag key, value and note
    pub return_duplicate_tags: bool,
}

impl Default for ToParserOption {
    fn default() -> Self {
        ToParserOption {
            to_marker: ToMarker::default(),
            date_format: String::from("%Y-%m-%d %H:%M:%S"),
            return_duplicate_tags: false,
        }
    }
}
