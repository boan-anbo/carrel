use carrel_commons::carrel::firefly_keeper::v1::Fireflies;
use firefly_keeper::firefly_keeper::core::FireflyKeeper;
use firefly_keeper::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;
use crate::errors::carrel_core_error::CarrelCoreError;
use crate::errors::carrel_core_error::CarrelCoreError::IoError;

// scan folders for fireflies
pub fn scan_folder_for_fireflies(folder: &str) -> Result<Fireflies, CarrelCoreError> {
    let options = FireflyKeeperOption{
        ignored_directory_names: vec![
            "node_modules".to_string(),
            ".git".to_string(),
        ],
        ..Default::default()
    };
    let firefly_keeper = FireflyKeeper::new(folder, options);
    let scan_result = firefly_keeper.scan_directory();
    match scan_result {
        Ok(f) => Ok(f),
        Err(e) => Err(IoError(e))
    }
}
