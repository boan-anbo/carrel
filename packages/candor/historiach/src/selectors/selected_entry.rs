pub struct SelectedEntry {
    // ranging between 0 and 255
    pub confidence: u8,
    pub match_string: String,
    pub line_number: usize,
    pub match_index: usize,

}

impl SelectedEntry {
    pub(crate) fn add_match(&mut self, matched: &str, match_index: usize, line_number: usize) {
        self.match_string = matched.to_string();
        self.match_index = match_index;
        self.line_number = line_number;
    }
}

// impl default
impl Default for SelectedEntry {
    fn default() -> Self {
        Self {
            confidence: 0,
            match_string: "".to_string(),
            line_number: 0,
            match_index: 0
        }
    }
}



