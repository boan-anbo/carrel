use crate::core::historia_opt::HistoriaOptions;
use crate::core::metadata::Metadata;

pub struct Historia {
    pub text: String,
    pub options: HistoriaOptions,
    pub metadata: Metadata,
}


// impl new
impl Historia {
    pub fn new(text: &str, options: HistoriaOptions) -> Historia {
        Historia {
            text: text.to_string(),
            options,
            metadata: Metadata::default(),
        }
    }
}
