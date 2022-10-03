use crate::core::historia_opt::{HistoriaOptions, Language};

pub fn get_selector_regex(option: &HistoriaOptions) -> regex::Regex {
    match option.language {
        Language::CHINESE => {}
        Language::ENGLISH => {}
    }
}
