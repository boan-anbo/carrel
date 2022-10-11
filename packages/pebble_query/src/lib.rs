//! Pebble query
//!
//! # What is pebble query
//!
//! Query helper for converting a Standard Query struct to a SeaOrmQuery
//!
//! # What is a Standard Query?
//!
//! - A generic struct for accepting queries.
//! - It's current definition see [StandardQuery](carrel_commons::generic::api::query::v1::StandardQuery)
//!
//! # Example
//!
//! ```
//! use carrel_commons::generic::api::query::v1::StandardQuery;
//!
//! let query = StandardQuery {
//!                 sort: None,
//!                 offset: 0,
//!                 length: 0,
//!                 page: 0,
//!                 filter: None,
//!                 find_one: false
//! };
//!
//! ```

extern crate core;

pub mod errors;
pub mod filter_conditions;
pub mod pebble_converter;
pub mod pebble_query;
pub mod pebble_query_result;
