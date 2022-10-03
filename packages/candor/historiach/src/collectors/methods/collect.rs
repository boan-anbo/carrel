use crate::collectors::collected::Collected;
use crate::collectors::collector::Collector;
use crate::core::historia_opt::HistoriaOptions;
use crate::core::metadata::Metadata;
use crate::parsers::parsed::Parsed;

impl Collector {
    pub fn collect(
        parsed: Parsed, options: &HistoriaOptions,
        metadata: &mut Metadata,
    ) -> Collected {
        Collected::default()
    }
}
