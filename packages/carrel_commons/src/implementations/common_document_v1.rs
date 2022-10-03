// impl document from tag

use uuid::Uuid;
use crate::carrel::common::document::v1::Document;
use crate::carrel::common::file::v1::File;
use crate::carrel::common::tag::v1::Tag;

impl From<Tag> for Document {
    fn from(tag: Tag) -> Self {
        let files: Vec<File> = if tag.file.is_some() {
            vec![tag.file.unwrap()]
        } else {
            vec![]
        };

        // TODO fix it
        Document {
            uuid: Uuid::new_v4().to_string(),
            title: tag.snippet.unwrap().snippet,
            description: "".to_string(),
            citation: "".to_string(),
            publication_date: "".to_string(),
            creators: vec![],
            source_id: "".to_string(),
            source_id_type: "".to_string(),
            source_url: "".to_string(),
            archive_location: "".to_string(),
            files,
            pages: "".to_string(),
            modified: "".to_string(),
            created: "".to_string(),
            content: "".to_string(),
            importance: 0,
            tasks: vec![],
            ..Default::default()
        }
    }
}
