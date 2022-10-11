///! Utility programs for the carrel eco-system
pub mod build;
pub mod test;
pub mod fs;
pub mod unicode;
pub mod datetime;
pub mod uuid;
#[cfg(feature = "faker")]
pub use fake;
