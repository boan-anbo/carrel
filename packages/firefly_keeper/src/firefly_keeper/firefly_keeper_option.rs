// firefly_keeper_option
pub struct FireflyKeeperOption {
    pub ignored_directory_names: Vec<String>,
}

// implement default
impl Default for FireflyKeeperOption {
    fn default() -> Self {
        FireflyKeeperOption {
            ignored_directory_names: vec![],
        }
    }
}
