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
            created: 0,
            content: "".to_string(),
        }
    }
}

// impl from Source for Document
impl From<&distant_es_client::responses::search_result::Source> for Document {
    fn from(source: &distant_es_client::responses::search_result::Source) -> Self {
        Document {
            uuid: source.uuid.to_string(),
            title: source.file_name.to_string(),
            description: source.file_path.to_string(),
            citation: "".to_string(),
            publication_date: "".to_string(),
            creators: vec![],
            source_id: source.cite_key.to_string(),
            source_id_type: "citekey".to_string(),
            source_url: "".to_string(),
            archive_location: "".to_string(),
            files: vec![],
            pages: source.pages.to_string(),
            modified: source.modified.unwrap_or(0),
            created: source.created.unwrap_or(0),
            content: source.text.to_string(),
        }
    }
}
