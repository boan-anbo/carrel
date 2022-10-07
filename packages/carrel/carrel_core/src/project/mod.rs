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
//! use carrel_core::project::project_manager::manage_project::ManageProjectTrait;
//! use carrel_core::project::project_manager::project_manager::ProjectManager;
//!
//! let project_manager = ProjectManager::load("path/to/project/directory").unwrap();
//!
//! let is_project = ProjectManager::is_dir_project("path/to/project/directory");
//!
//! assert_eq!(is_project, true);
//!
//! ```
//!
pub mod error;
pub mod db_manager;
pub mod archivist;
pub mod config;
pub mod file_manager;
pub mod manage_project;
pub mod project_manager;
pub mod to_manager;
pub mod firefly_keeper;

