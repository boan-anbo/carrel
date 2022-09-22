use crate::config::config_struct::CarrelConfiguration;

pub struct Scaffold {
    pub config: CarrelConfiguration,
}


impl Scaffold {
    pub fn new(config: CarrelConfiguration) -> Self {
        Self {
            config,
        }
    }
}

// implement helper constructor for new with CarrelConfiguration::new()
impl Scaffold {
    /// # Constructor to create a new Scaffold with a CarrelConfiguration in one step instead of two.
    pub fn new_project(project_name: &str, project_root_folder: &str) -> Self {
        let config = CarrelConfiguration::new(project_name, project_root_folder);
        Scaffold::new(config)
    }
}
