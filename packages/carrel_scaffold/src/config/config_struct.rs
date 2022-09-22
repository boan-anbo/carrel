use serde::{Deserialize, Serialize};
#[derive(Debug, Deserialize, Serialize, PartialEq)]
pub struct CarrelConfiguration {
    pub to_store_path: String,
    pub carrel_store_path: String,
    pub project_name: String,
    pub project_parent_dir: String,
}

/// # Carrel Configuration
///
/// # Example
/// ```
/// use carrel_scaffold::config::config_struct::CarrelConfiguration;
///
/// let config = CarrelConfiguration::default();///
/// ```
impl Default for CarrelConfiguration {
    fn default() -> Self {
        Self {
            to_store_path: String::from("to_store.db"),
            carrel_store_path: String::from("carrel_store.db"),
            project_name: String::from(""),
            project_parent_dir: String::from(""),
        }
    }
}

/// Example:
///
/// ```
/// use carrel_scaffold::config::config_struct::CarrelConfiguration;
/// CarrelConfiguration::new("My project");
/// ```
impl CarrelConfiguration {
    pub fn new(project_name: &str, project_root_dir: &str) -> Self {
        // use project name with default values of CarrelConfiguration
        Self  {
            project_name: String::from(project_name),
            project_parent_dir: String::from(project_root_dir),
            ..Default::default()
        }
    }
}

