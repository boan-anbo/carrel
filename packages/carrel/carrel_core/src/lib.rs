//! Core library for carrel.
//!
//! At the center of the library, it is the project management and configuration service for Carrel system.
//! At the periphery, it's connecting all the services, e.g. fireflies, etc to the project project management.
extern crate core;

pub mod errors;
pub mod fireflies;
pub mod project;
pub mod scaffold;

pub mod app;
pub mod carrel;
pub mod pdf_gongju;
#[cfg(feature = "test_helper")]
pub mod test_utils;
pub mod to;
pub mod event;

pub use carrel_db;
