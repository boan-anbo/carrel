use std::path::PathBuf;

pub struct ToManager {
    pub to_path: PathBuf,
}

// impl default
impl Default for ToManager {
    fn default() -> Self {
        ToManager {
            to_path: PathBuf::new(),
        }
    }
}

// new
impl ToManager {
    pub fn new(to_path: &str) -> Self {
        ToManager {
            to_path: PathBuf::from(to_path),
        }
    }
}
