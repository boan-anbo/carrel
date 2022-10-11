use crate::entities::textual_objects::{ActiveModel, Model};
pub trait ToUtilFunc {
    /// Get the json field as a generic json value from the TextualObject entity
    fn get_json_value(self) -> Option<serde_json::Value>;
}

impl ToUtilFunc for Model {
    fn get_json_value(self) -> Option<serde_json::Value> {
        serde_json::from_str(self.json.as_str()).ok()
    }
}

impl ToUtilFunc for ActiveModel {
    fn get_json_value(self) -> Option<serde_json::Value> {
        let json = self.json.clone().unwrap();
        serde_json::from_str(json.as_str()).ok()
    }
}
