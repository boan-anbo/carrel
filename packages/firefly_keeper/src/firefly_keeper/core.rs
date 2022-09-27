//! Keeper of fireflies (ideas)
//!
//! # Features
//!
//! * Scan a directory recursively and collect all tags
//!
//! * Scan a list of files and collect all tags
//!
//! # Examples
//!
//!
//! * Scan a directory recursively and collect all tags
//! ```
//! use firefly_keeper::firefly_keeper::core::FireflyKeeper;use firefly_keeper::firefly_keeper::firefly_keeper_option::FireflyKeeperOptionuse firefly_keeper::firefly_keeper::core::FireflyKeeper;
//! use firefly_keeper::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;
//!
//! let directory_to_scan = "directory_to_scan";
//!
//! let fireflies = FireflyKeeper::scan_directory(directory_to_scan, &FireflyKeeperOption::default()).unwrap();
//!
//! println!("fireflies: {:?}", fireflies);///
//! ```
//!
//! * Scan a list of files and collect all tags
//!
//! ```
//! use firefly_keeper::firefly_keeper::core::FireflyKeeper;
//! use firefly_keeper::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;
//!
//! let files_to_scan = vec!["file1.md", "file2.md"];
//!
//! let fireflies = FireflyKeeper::scan_files(&files_to_scan, &FireflyKeeperOption::default()).unwrap();
//!
//! println!("fireflies: {:?}", fireflies);
//!
//! ```

use carrel_commons::carrel::firefly_keeper::v1::Fireflies;
use crate::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;

pub struct FireflyKeeper {
    // directory
    pub result:Fireflies,
    pub option: FireflyKeeperOption,

}

// constructor
impl FireflyKeeper {
    pub fn new(directory: &str, opt: FireflyKeeperOption) -> FireflyKeeper {
        FireflyKeeper {
            result: Fireflies::default(),
            option: opt,
        }
    }
}


