use to_core::to_tag::to_tag_struct::ToTag;

pub struct InternalScanResults {
    pub directory: String,
    pub all_files_scaned: u32,
    pub text_files_scaned: u32,
    pub tags: Vec<ToTag>,
}

impl InternalScanResults {
    pub fn new(directory: String) -> InternalScanResults {
        InternalScanResults {
            directory,
            all_files_scaned: 0,
            text_files_scaned: 0,
            tags: vec![],
        }
    }
}
