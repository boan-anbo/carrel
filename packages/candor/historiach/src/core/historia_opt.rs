#[derive(Clone, Debug)]
pub enum Language {
    CHINESE,
    ENGLISH
}

#[derive(Clone)]
pub struct HistoriaOptions {
    pub language: Language,
}

// impl default HistoriaOptions
impl Default for HistoriaOptions {
    fn default() -> Self {
        Self {
            language: Language::CHINESE,
        }
    }
}
