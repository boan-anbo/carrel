use crate::project_manager::config::project_config::ProjectConfig;

pub trait ConfigCheck {
    // check if db exists
    fn check_db(&self) -> bool;
}

impl ConfigCheck for ProjectConfig {
    fn check_db(&self) -> bool {
        self.carrel_db_path.exists()
    }
}


// test
// Language: rust

#[cfg(test)]
mod tests {
    use std::fs;
    use std::path::PathBuf;
    use super::*;

    #[test]
    fn test_check_db() {
        let test_folder = carrel_utils::test::test_folders::get_random_test_temp_folder();
        let carrel_db_path = PathBuf::from(format!("{}/carrel.db", test_folder));
        // use tests_db
        let config = ProjectConfig { carrel_db_path };

        assert_eq!(config.check_db(), false);
        // write a db file
        fs::File::create(&config.carrel_db_path).unwrap();
        assert!(config.check_db());
        // remove the folder using fs
        fs::remove_dir_all(test_folder).unwrap();
    }
}
