use crate::core::historia_opt::HistoriaOptions;
use crate::core::metadata::Metadata;
use crate::parsers::parsed::Parsed;
use crate::parsers::parser::Parser;
use crate::selectors::selected::Selected;

impl Parser {
    pub fn parse(selected: Selected, options: &HistoriaOptions, metadata: &mut Metadata) -> Parsed {
        Parsed::default()
    }
}
