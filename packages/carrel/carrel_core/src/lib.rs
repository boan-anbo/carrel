//! Core library for carrel.
//!
//! At the center of the library, it is the project management and configuration service for Carrel system.
//! At the periphery, it's connecting all the services, e.g. fireflies, etc to the project project management.
pub mod fireflies;
pub mod errors;
pub mod scaffold;
pub mod project;
pub(crate) mod test_utils;



