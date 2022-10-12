//! Carrel App Project management
//!
//! This manages all projects that has been opened with the current Carrel system.
//!
//! # Example
//! ```rust
//!
//! use carrel_app_db::{CarrelAppDbManager, ManageCarrelAppDb};
//! use carrel_app_db::carrel_app_manager::{CarrelAppDbManager, ManageCarrelAppDb};
//!
//! let project_manager = CarrelAppDbManager::load("directory").await;
//!
//! ```
//!

pub mod carrel_app_manager;
pub use entity;
pub use migration;