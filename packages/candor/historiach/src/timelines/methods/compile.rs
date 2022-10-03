use crate::collectors::collected::Collected;
use crate::core::historia_opt::HistoriaOptions;
use crate::core::metadata::Metadata;
use crate::timelines::timeline::Timeline;

impl Timeline {
    pub fn compile(
        collected: Collected, options: &HistoriaOptions,
        metadata: &mut Metadata,
    ) -> Timeline {
        Timeline {
            metadata: metadata.clone(),
            ..Default::default()
        }

    }
}
