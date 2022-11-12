use std::collections::HashMap;
use carrel_commons::carrel::common::firefly::v2::Firefly;
use crate::project::to_manager::firefly_const;


// use the above proto definition
pub enum FireflyField {
    Uuid = 1,
    Title = 2,
    Description = 4,
    Light = 5,
    Context = 6,
    FullText = 7,
    Comment = 8,
}

pub struct FireflyTicketOption {
    include_fields: Vec<FireflyField>,
}

pub trait FireflyTicketTrait {
    fn to_ticket_tag(&self, opt: FireflyTicketOption) -> String;
}


impl FireflyTicketTrait for Firefly {
    fn to_ticket_tag(&self, opt: FireflyTicketOption) -> String {
        // string = field name
        // FireflyField = field value
        // format: field_name:field_value
        let mut value_to_include: HashMap<String, String> = HashMap::new();

        for field in opt.include_fields {
            match field {
                FireflyField::Uuid => {
                    value_to_include.insert("uuid".to_string(), self.uuid.to_string());
                }
                FireflyField::Title => {
                    value_to_include.insert("title".to_string(), self.title.to_string());
                }
                FireflyField::Description => {
                    value_to_include.insert("description".to_string(), self.description.to_string());
                }
                FireflyField::Light => {
                    value_to_include.insert("light".to_string(), self.light.to_string());
                }
                FireflyField::Context => {
                    value_to_include.insert("context".to_string(), self.context.to_string());
                }
                FireflyField::FullText => {
                    value_to_include.insert("full_text".to_string(), self.full_text.to_string());
                }
                FireflyField::Comment => {
                    value_to_include.insert("comment".to_string(), self.comment.to_string());
                }
            }
        }

        let mut ticket_tag: Vec<String> = Vec::new();


        // add ticket id
        ticket_tag.push(format!("ticket_id:{}", self.ticket_id));

        // add all the fields
        for (key, value) in value_to_include {
            ticket_tag.push(format!("{}:{}", key, value));
        }



        let all_values = ticket_tag.join(" | ".to_string().as_str());

        // add the prefix and suffix
        format!("{}{}{}", "[[", all_values, "]]")

    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ticket_tag() {
        let firefly = Firefly {
            uuid: "uuid".to_string(),
            title: "title".to_string(),
            description: "description".to_string(),
            light: "light".to_string(),
            context: "context".to_string(),
            full_text: "full_text".to_string(),
            comment: "comment".to_string(),
            comment_author: "".to_string(),
            comment_created_at: "".to_string(),
            comment_modified_at: "".to_string(),
            importance: 0,
            location_actual: "".to_string(),
            location_actual_type: "".to_string(),
            location_raw: "".to_string(),
            location_raw_type: "".to_string(),
            document_title: "".to_string(),
            document_description: "".to_string(),
            document_reference: "".to_string(),
            document_publication_year: 0,
            document_publication_datetime: "".to_string(),
            document_author: "".to_string(),
            document_metadata: Default::default(),
            document_id: "".to_string(),
            document_id_type: "".to_string(),
            document_storage_id: "".to_string(),
            document_storage_id_type: "".to_string(),
            document_storage_url: "".to_string(),
            file_directory: "".to_string(),
            file_full_name: "".to_string(),
            file_extension: "".to_string(),
            file_full_path: "".to_string(),
            select_tag: None,
            tags: vec![],
            storage_id_str: "".to_string(),
            storage_id_int: 0,
            storage_description: "".to_string(),
            storage_url: "".to_string(),
            created_at: "".to_string(),
            modified_at: "".to_string(),
            extracted_at: "".to_string(),
            viewed_at: "".to_string(),
            collection_uuids: vec![],
            metadata: Default::default(),
            more_comments: Default::default(),
            location_actual_modified_at: "".to_string(),
            document_pages: 0,
            unique_id: "".to_string(),
            ticket_id: "ticket_id".to_string(),
        };

        let ticket_tag = firefly.to_ticket_tag(FireflyTicketOption {
            include_fields: vec![FireflyField::Uuid, FireflyField::Title],
        });

        assert_eq!(ticket_tag, "[[ticket_id:uuidtitle:title]]");
    }
}