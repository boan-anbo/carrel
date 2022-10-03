use std::fs;
use std::path::PathBuf;

pub struct ProjectConfig {
    pub carrel_db_path: PathBuf,
}


pub trait ConfigCheck {
    // check if db exists
    fn check_db(&self) -> bool;
    // create db if not exists
    fn create_db(&self) -> bool;
}

impl ConfigCheck for ProjectConfig {
    fn check_db(&self) -> bool {
        self.carrel_db_path.exists()
    }

    fn create_db(&self) -> bool {
        // create a blank db file
        fs::File::create(&self.carrel_db_path).is_ok()
    }
}


