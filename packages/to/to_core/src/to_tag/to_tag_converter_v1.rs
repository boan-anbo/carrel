use crate::to_tag::to_tag_struct::ToTag;
use crate::util_entities::to_snippet::ToSnippet;
use carrel_commons::carrel::common::context::v1::Context;
use carrel_commons::carrel::common::file::v1::File;
use carrel_commons::carrel::common::snippet::v1::Snippet;
use carrel_commons::carrel::common::tag::v1::Tag;
use uuid::Uuid;

pub fn to_tag_to_common_tag_v1(tag: ToTag) -> Tag {
    let mut snippet: Option<Snippet> = None;
    let mut file = None;
    if tag.snippet.is_some() {
        let to_snippet_location = tag.snippet.unwrap();
        file = Some(File::from(to_snippet_location.snippet.as_str()));
        snippet = Some(Snippet::from(to_snippet_location));
    }

    Tag {
        key: tag.key,
        value: tag.value,
        note: tag.note,
        uuid: Uuid::new_v4().to_string(),
        file,
        snippet,
        passage: None,
    }
}
