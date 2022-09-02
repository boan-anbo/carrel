use crate::document::Document;

impl Document {
    fn new() -> Self {
        Document {
            uuid: "".to_string(),
            title: "".to_string(),
            description: "".to_string(),
            citation: "".to_string(),
            publication_date: "".to_string(),
            creators: vec![],
            source_id: "".to_string(),
            source_id_type: "".to_string(),
            source_url: "".to_string(),
            archive_location: "".to_string(),
            files: vec![],
            pages: "".to_string(),
            modified: 0,
            created: 0
        }
    }
}

// impl from Source for Document
impl From<&distant_es_client::responses::search_result::Source> for Document {
    fn from(source: &distant_es_client::responses::search_result::Source) -> Self {
        Document {
            ..Default::default()
        }
    }
}
