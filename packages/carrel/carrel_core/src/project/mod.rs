//! Project management component for Carrel system.
//!
//! This module contains the project management component for Carrel system, which is the center of the Carrel system.
//!
//! # Features
//!
//! - Project management
//!
//! - Project configuration
//!
//! # Design
//!
//! ## Project management
//!
//! `Directory` is the unit of a project. Each project directory contains a configuration file with the name `carrel_config.yaml`, which is used to configure the project. When opened on a new directory without such a configuration file, the program will create a default configuration file and use it to configure the project.
//!
//! # Usage
//!
//! ## Open a project
//!
//! ```rust
//! use carrel_core::project::project_manager::CarrelProjectManager;
//! use carrel_core::project::project_manager_methods::manage_project::ManageProjectTrait;
//!
//! #[tokio::main]
//! async fn main() {
//!
//! let project_manager = CarrelProjectManager::load("path/to/project/directory").await.unwrap();
//!
//! let is_project = CarrelProjectManager::is_dir_project("path/to/project/directory");
//!
//! assert_eq!(is_project, true);
//!
//! }
//!
//!
//! ```
//!
pub mod archivist;
pub mod config;
pub mod db_manager;
pub mod error;
pub mod file_manager;
pub mod project_implementation;
pub mod project_manager;
pub mod project_manager_methods;
pub mod to_manager;
