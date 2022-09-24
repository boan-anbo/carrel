use crate::carrel::common::tag::v1::Tag;
use to_core::to_tag::to_tag_struct::ToTag;
use uuid::Uuid;

/// The reason I do not use Tag internally in TO is to keep carrel systems and TO system separate.
///
/// A practical reason is that Tonic is used to generate services in the carrel proto definitions.
/// Tonic is an overhead for TO, and it's a good indicator that there should be a separation between carrel eco-system and TO eco-system.
/// So this is a conversion from Tag to ToTag, an example of the boundary between the two.
///
/// Since the current crate is shared by all carrel-ecosystem, all conversion done here will be available to all carrel-ecosystem.
///
/// What is NOT done here are domain-specific conversions, such as converting ToTag to Fireflies which should be handled by the carrel-ecosystem components, Firefly_keeper, for example.
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

