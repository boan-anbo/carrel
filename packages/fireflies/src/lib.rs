//! A manager of tags represented as textual objects in text files.
//!
//!
//!
//! # Examples
//!
//! ```
//! use fireflies::firefly_keeper::FireflyKeeper;
//! use to::ToParser;
//! use to::ToParserOption;
//!
//! let directory_to_scan = "directory_to_scan";
//! let firefly_keeper = FireflyKeeper::new(directory_to_scan);
//! let fireflies = firefly_keeper.scan_directory().expect("directory not found");
//! ```
mod fireflies_impl;
pub mod firefly_keeper;
mod tag_impl;

pub mod firefly_keeper_model {
    pub mod model {
        pub mod v1 {
            include!("generated/carrel_firefly_keeper_model_v1.rs");
        }
    }
}

pub mod common {
    pub mod tag {
        pub mod v1 {
            include!("generated/carrel_common_tag_v1.rs");
        }
    }

    pub mod snippet_location {
        pub mod v1 {
            include!("generated/carrel_common_snippet_location_v1.rs");
        }
    }
}
