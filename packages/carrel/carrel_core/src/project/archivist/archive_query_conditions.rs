use carrel_commons::generic::api::query::v1::{Condition, Operator};
use carrel_db::query::carrel_file_v1_field_to_column_map;

pub struct CarrelDbConditions {}

impl CarrelDbConditions {
    pub fn archive_eq_id_condition(archive_id: i32) -> Condition {
        let key = "archive_id";
        // check against file map to make sure the key exists
        if !carrel_file_v1_field_to_column_map::FILE_MAP_TO_COLUMN_MAP.contains_key(key) {
            panic!("The query {} does not exist in the file map", key);
        }
        Condition {
            field: carrel_file_v1_field_to_column_map::FILE_MAP_TO_COLUMN_MAP
                .get_key_value("archive_id")
                .unwrap()
                .0
                .to_string(),
            operator: Operator::Equals as i32,
            value: Some(archive_id.to_string()),
            value_list: vec![],
            value_to: None,
        }
    }
}
