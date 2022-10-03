use crate::selectors::selected_entry::SelectedEntry;

pub struct Selected {
    pub lines: Vec<String>,
    pub select_event_tree: Vec<SelectedEntry>

}


// impl default
impl Default for Selected {
    fn default() -> Self {
        Self {
            lines: vec![],
            select_event_tree: vec![],
        }
    }
}
