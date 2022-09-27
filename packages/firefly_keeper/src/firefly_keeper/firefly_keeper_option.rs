// firefly_keeper_option
pub struct FireflyKeeperOption {
    // directories to be ignored
    pub ignored_directory_names: Vec<String>,
    // scan only classifies tags
    pub classified_only: bool,
}

// implement default
impl Default for FireflyKeeperOption {
    fn default() -> Self {
        FireflyKeeperOption {
            ignored_directory_names: vec![],
            classified_only: false,
        }
    }
}
