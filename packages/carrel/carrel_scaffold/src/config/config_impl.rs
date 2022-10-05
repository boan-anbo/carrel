use std::{fs};
use crate::config::config_struct::CarrelConfiguration;

impl CarrelConfiguration {
    pub fn write_to_yaml(&self, path: &str) {
        let config_str = serde_yaml::to_string(&self)
            .expect("Cannot stringify Carrel Configuration to Yaml");
        fs::write(path, config_str.as_bytes())
            .expect(format!("Cannot write Carrel Configuration to {}", &config_str).as_str())
    }

    pub fn read_from_yaml(yaml_path: &str) -> Self {
        let file_content = fs::read_to_string(yaml_path)
            .expect(format!("cannot read from {}", yaml_path).as_str());
        let config = serde_yaml::from_str(file_content.as_str())
            .expect("cannot parse Carrel Configuration from Yaml");
        config
    }
}


#[cfg(test)]
mod test {
    use super::*;

    fn clear_file(path: &str) {
        fs::remove_file(path).expect(format!("cannot remove {}", path).as_str());
    }

    #[test]
    fn test_write() {
        let default_config = CarrelConfiguration::default();
        let output_path = "test_waste/test_yaml.yaml";
        default_config.write_to_yaml(output_path);
        // clear_file(output_path)
    }

    #[test]
    fn test_read() {
        let default_config = CarrelConfiguration::default();
        let output_path = "test_waste/test_read";
        default_config.write_to_yaml(output_path);
        let parsed_config = CarrelConfiguration::read_from_yaml(output_path);
        assert_eq!(default_config, parsed_config);
        clear_file(output_path)
    }
}

