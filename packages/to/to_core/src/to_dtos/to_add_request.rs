use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use carrel_utils::uuid::new_v4;
use std::collections::HashMap;
use carrel_commons::carrel::common::tag::v2::Tag as CommonTagV2;

use crate::error::{TextualObjectErrorMessage, ToErrors};
use chrono::Utc;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;
use entity::entities::tag::Model;

use crate::to::to_struct::TextualObject;
use crate::to_card::to_card_convert_rule::ToCardConvertRule;
use crate::to_card::to_card_struct::ToCard;
use crate::to_tag::to_tag_struct::ToTag;
use crate::to_ticket::to_ticket_utils::print_minimal_ticket;
use crate::utils::get_random_test_database_dir::get_random_test_database_dir;
use crate::utils::id_generator::generate_id;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ToStoredReceipt {
    // <Unique_Store_Id, Stored_Textual_Object>
    pub tos_stored: IndexMap<String, TextualObject>,
    // <Unique_Store_Id, Stored_Textual_Object>
    pub store_info: String,
    pub store_url: String,
    pub stored: chrono::NaiveDateTime,
    pub total_tos_stored: u64,
}

// create receipt From TextualObjectStoredReceipt

impl From<ToAddManyRequest> for ToStoredReceipt {
    fn from(add_tos_dto: ToAddManyRequest) -> Self {
        let mut receipt = ToStoredReceipt {
            tos_stored: IndexMap::new(),
            store_info: String::new(),
            store_url: add_tos_dto.store_dir,
            stored: Utc::now().naive_utc(),
            total_tos_stored: 0,
        };
        if add_tos_dto.store_info.is_some() {
            receipt.store_info = add_tos_dto.store_info.unwrap_or("".to_string());
        };
        receipt
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ToAddManyRequest {
    // list of textual objects to add, String is the unique source id.
    // this is so that the recept will provide a list of unique ids with stored textual objects.
    pub tos: Vec<ToAddRequest>,
    // whether when there is an existing TO in the store with the same source_id, replace it with the new item.
    pub overwrite: bool,
    pub store_info: Option<String>,
    pub store_dir: String,
    pub store_filename: Option<String>,
    // map rules to convert to fields to card fields
    pub card_map_rules: Vec<ToCardConvertRule>,
}

// impl default
impl Default for ToAddManyRequest {
    fn default() -> Self {
        ToAddManyRequest {
            tos: Vec::new(),
            overwrite: false,
            store_info: None,
            store_dir: String::new(),
            store_filename: None,
            card_map_rules: Vec::new(),
        }
    }
}

impl ToAddManyRequest {
    pub fn sample() -> Self {
        let mut sample_dto = ToAddManyRequest {
            tos: Vec::new(),
            overwrite: false,
            store_info: Some("Random Store Info".to_string()),
            store_dir: get_random_test_database_dir().to_string(),
            store_filename: None,
            card_map_rules: Vec::new(),
        };
        for _ in 0..10 {
            sample_dto.tos.push(ToAddRequest::sample());
        }
        sample_dto
    }

    // check if the add request is valid
    pub fn is_valid(&self) -> Result<(), ToErrors> {
        let mut errors: TextualObjectErrorMessage = TextualObjectErrorMessage::default();
        if self.tos.is_empty() {
            errors.message = "No textual objects to add".to_string();
            errors.suggestion = "Add objects in the \"tos\" field of your request.".to_string();
            return Err(ToErrors::AddManyRequestError(errors));
        }

        if self.are_card_map_rules_valid() == false {
            let invalid_fields = self.are_card_map_rules_valid_return_invalid();
            errors.message = "Card map rules are not valid".to_string();
            errors.suggestion = format!(
                "See card fields specifications and provide correct Textual Object Card fields"
            );
            errors.payload_for_user = json!(invalid_fields);
            return Err(ToErrors::AddManyRequestError(errors));
        }

        Ok(())
    }

    // check if the tos are empty
    fn is_empty(&self) -> bool {
        if self.tos.is_empty() {
            return true;
        }
        false
    }

    // check if the card_map_rules are valid
    fn are_card_map_rules_valid(&self) -> bool {
        for rule in &self.card_map_rules {
            if !rule.is_card_field_valid() {
                return false;
            }
        }
        true
    }

    // check if the card_map_rules are valid and return all the invalid rules
    fn are_card_map_rules_valid_return_invalid(&self) -> (bool, Vec<ToCardConvertRule>) {
        let mut invalid_rules = Vec::new();
        for rule in &self.card_map_rules {
            if !rule.is_card_field_valid() {
                invalid_rules.push(rule.clone());
            }
        }
        (invalid_rules.len() == 0, invalid_rules)
    }
}


#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ToAddRequest {
    // unique ID of the item in the source
    pub source_id: Option<String>,
    // eg Zotero URI or Zotero Citekey are two types of `source_id`
    pub source_id_type: Option<String>,
    // unique path to the object in the source if there is any
    pub source_path: Option<String>,
    // name of the source of the textual object, e.g. "Zotero", "DOI"
    pub source_name: String,

    /// See TO fields specifications
    pub json_type: Option<String>,
    /// See TO fields specifications
    pub json_unique_id: Option<String>,

    // item
    pub json: String,

    pub tags: Vec<CommonTagV2>,
}

// impl default
impl Default for ToAddRequest {
    fn default() -> Self {
        ToAddRequest {
            source_id: None,
            source_id_type: None,
            source_path: None,
            source_name: String::new(),
            json: String::new(),
            json_type: None,
            json_unique_id: None,
            tags: vec![],
        }
    }
}

impl ToAddRequest {
    pub fn sample() -> Self {
        ToAddRequest {
            source_id: Some("source_id_value".to_string()),
            source_id_type: Some("source_id_type_value".to_string()),
            source_path: Some("source_path_value".to_string()),
            source_name: "source_name_value".to_string(),

            json_type: Some("json_type_value".to_string()),
            json_unique_id: Some(new_v4().to_string()),
            json: serde_json::json!({
                "test_string": "test_string_value",
                "test_number": 1,
                "test_boolean": true,
                "test_null": null,
                "test_array": [1, 2, 3],
                "test_object": {
                    "test_string": "test_string_value",
                    "test_number": 1,
                    "test_boolean": true,
                    "test_null": null,
                    "test_array": [1, 2, 3],
                }
            })
                .to_string(),
            tags: vec![],
        }
    }
}

// implement from dto to textual object
impl From<ToAddRequest> for TextualObject {
    fn from(req: ToAddRequest) -> Self {
        let ticket_id = generate_id();
        // create a new textual object, ready to persist to the database

        let totags: Vec<ToTag> = req.tags.into_iter().map(|common_tag_v2| ToTag::from(common_tag_v2)).collect();

        let totags_count = totags.len() as i32;

        let mut to = TextualObject {
            id: 0,

            uuid: Uuid::new_v4(),

            source_id: req.source_id.unwrap_or("".to_string()),
            source_id_type: req.source_id_type.unwrap_or("".to_string()),
            source_path: req.source_path.unwrap_or("".to_string()),
            source_name: req.source_name,

            store_url: String::new(),
            // this will come from the receipt.
            store_info: "".to_string(),

            ticket_id: ticket_id.clone(),
            ticket_minimal: print_minimal_ticket(ticket_id.as_str(), None),

            created: get_now_iso_string(),
            updated: get_now_iso_string(),

            card_map: String::new(),
            context: "".to_string(),
            card: json!(ToCard::default()).to_string(),

            json: req.json,

            json_type: req.json_type,
            ticket_index_in_context: 0,
            json_unique_id: req.json_unique_id,

            tags: totags, // this does not need TO to link the to, because the Common_tag should already have the parent_id etc. If it doesn't, TO will throw because it's receiving an invalid CommonTagV2 as a child tag of a TO.
            tag_count: totags_count,
        };
        to.update_minimal_ticket()
    }
}

// tests
#[cfg(test)]
mod test {
    use super::*;
    use tokio_test::assert_err;

    // test from dto to textual object
    #[test]
    fn test_from_dto_to_textual_object() {
        let json_value = serde_json::json!({
            "test_string": "test_string_value",
            "test_number": 1,
            "test_boolean": true,
            "test_null": null,
            "test_array": [1, 2, 3],
            "test_object": {
                "test_string": "test_string_value",
                "test_number": 1,
                "test_boolean": true,
                "test_null": null,
                "test_array": [1, 2, 3],
            }
        });

        let dto = ToAddRequest {
            source_id: Some("source_id_value".to_string()),
            source_id_type: Some("source_id_type_value".to_string()),
            source_path: Some("source_path_value".to_string()),
            source_name: "source_name_value".to_string(),
            json_type: Some("json_type_value".to_string()),
            json_unique_id: Some("json_unique_id_value".to_string()),
            json: json_value.to_string(),
            tags: vec![],
        };
        let textual_object = TextualObject::from(dto);
        assert_eq!(textual_object.source_id, "source_id_value");
        assert_eq!(textual_object.source_id_type, "source_id_type_value");
        assert_eq!(textual_object.source_path, "source_path_value");
        assert_eq!(textual_object.source_name, "source_name_value");
        assert_eq!(textual_object.store_info, String::from(""));
    }

    // test validity check for add many dto
    #[test]
    fn test_are_textual_objects_valid() {
        let dto = ToAddManyRequest {
            tos: vec![],
            ..Default::default()
        };
        assert_err!(&dto.is_valid());
        // check error mesasge
        // map error to TextualObjectErrorMessage
        match dto.is_valid() {
            Err(e) => match e {
                ToErrors::AddManyRequestError(e) => {
                    assert_eq!(e.message, "No textual objects to add");
                    assert!(true);
                }
                _ => {
                    assert!(false);
                }
            },
            _ => panic!("Expected error"),
        }
    }
}
