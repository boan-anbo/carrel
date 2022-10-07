pub struct ExtractorOption {
    /// Whether to include the full text on the page of the annotation
    pub firefly_include_full_text: bool,
    /// whether parse and replace tags in the comments
    pub firefly_parse_tags: bool,
}

impl Default for ExtractorOption {
    fn default() -> Self {
        ExtractorOption {
            firefly_include_full_text: true,
            firefly_parse_tags: true,

        }
    }
}
