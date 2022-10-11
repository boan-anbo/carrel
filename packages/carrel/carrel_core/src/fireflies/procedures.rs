use crate::errors::carrel_core_error::CarrelCoreError;
use crate::errors::carrel_core_error::CarrelCoreError::IoError;
use carrel_commons::carrel::firefly_keeper::v1::Fireflies;
use firefly_keeper::firefly_keeper::core::FireflyKeeper;
pub use firefly_keeper::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;

// scan folders for fireflies
pub fn scan_folder_for_fireflies(
    folder: &str,
    opt: FireflyKeeperOption,
) -> Result<Fireflies, CarrelCoreError> {
    let scan_result = FireflyKeeper::scan_directory(folder, &opt);
    match scan_result {
        Ok(f) => Ok(f),
        Err(e) => Err(IoError(e)),
    }
}
// scan files for fireflies
pub fn scan_file_for_fireflies(
    file: &[&str],
    opt: FireflyKeeperOption,
) -> Result<Fireflies, CarrelCoreError> {
    let scan_result = FireflyKeeper::scan_files(file, &opt);
    match scan_result {
        Ok(f) => Ok(f),
        Err(e) => Err(IoError(e)),
    }
}
