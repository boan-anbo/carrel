use crate::carrel::common::document::v1::Document;
use crate::carrel::common::firefly::v1::Firefly;
use crate::carrel::common::tag::v1::Tag as TagV1;

use carrel_utils::datetime::get_iso_string::{get_now_iso_string};

// impl firefly from tag
impl From<TagV1> for Firefly {
    fn from(tag: TagV1) -> Self {

        let select_tag = Some(tag.clone());
        let document = Document::from(tag.clone());
        let snippet = tag.clone().snippet;
        let title = tag.clone().snippet.unwrap().snippet;
        Firefly {
            uuid: tag.uuid, // sharing the same uuid with tag.
            title,
            description: "".to_string(),
            snippet,
            passage: None,
            comments: vec![],
            creators: vec![],
            document: Some(document),
            storage_info: None,
            select_tag,
            tags: vec![
            ],
            importance: 0,
            extra: vec![],
            // use now as created ISO 8601
            created_at: get_now_iso_string(),
            modified_at: get_now_iso_string(),

        }
    }


}

