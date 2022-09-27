use to_core::to_tag::to_tag_struct::ToTag;

pub struct InternalScanResults {
    pub all_files_scaned: u32,
    pub text_files_scaned: u32,
    pub tags: Vec<ToTag>,
}

impl Default for InternalScanResults {
    fn default() -> Self {
        InternalScanResults {
            all_files_scaned: 0,
            text_files_scaned: 0,
            tags: vec![],
        }
    }
}
