//! A manager of tags represented as textual objects in text files.
//!
//!
//!
//! # Examples
//!
//! ```
//! use firefly_keeper::firefly_keeper::core::FireflyKeeper;
//! use to::ToParser;
//! use to::ToParserOption;
//!
//! let directory_to_scan = "directory_to_scan";
//! let firefly_keeper = FireflyKeeper::new(directory_to_scan);
//! let fireflies = firefly_keeper.scan_directory().expect("directory not found");
//! ```
pub mod firefly_keeper;

