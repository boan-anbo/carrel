use to_core::to_tag::to_tag_struct::ToTag;
use uuid::Uuid;
use crate::common::tag::v1::Tag;

// impl from for tag from ToTag
impl From<ToTag> for Tag {
    fn from(tag: ToTag) -> Self {
        Tag {
            key: tag.key,
            value: tag.value,
            note: tag.note,
            tag_marker: tag.tag_string,
            uuid: Uuid::new_v4().to_string(),
            snippet_location: None
        }
    }
}
