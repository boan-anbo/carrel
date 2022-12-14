use crate::to_tag::to_tag_struct::ToTag;
use crate::util_entities::to_file::ToFile;
use crate::util_entities::to_snippet::ToSnippet;
use carrel_commons::carrel::common::context::v1::Context;
use carrel_commons::carrel::common::file::v1::File as CommonFile;
use carrel_commons::carrel::common::snippet::v1::Snippet;
use carrel_commons::carrel::common::tag::v1::Tag as TagV1;
use carrel_commons::carrel::common::tag::v2::Tag as TagV2;
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
impl From<ToTag> for TagV2 {
    fn from(tag: ToTag) -> Self {
        TagV2 {
            key: tag.key,
            value: tag.value,
            note: tag.note,
            raw_tag_string: tag.raw_tag_string,
            uuid: Uuid::new_v4().to_string(),
            collection_uuids: vec![],
            related_tag_uuids: vec![],
            id: tag.id,
            parent_uuid: tag.to_uuid.map_or(None, |uuid| Some(uuid.to_string())),
        }
    }
}

pub struct ToTagConverter {}

impl ToTagConverter {
    pub fn to_tag_to_common_tag_v2(totag: ToTag) -> TagV2 {
        TagV2 {
            key: totag.key,
            value: totag.value,
            note: totag.note,
            raw_tag_string: totag.raw_tag_string,
            uuid: Uuid::new_v4().to_string(),
            collection_uuids: vec![],
            related_tag_uuids: vec![],
            id: totag.id,
            parent_uuid: totag.to_uuid.map_or(None, |uuid| Some(uuid.to_string())),
        }
    }
}

impl From<ToSnippet> for Snippet {
    fn from(to_snippet: ToSnippet) -> Self {
        let mut file: Option<CommonFile> = None;

        if to_snippet.file.is_some() {
            let to_file = to_snippet.file.unwrap();
            file = Some(to_file.into_common_file());
        }

        let context: Option<carrel_commons::carrel::common::context::v1::Context> =
            if to_snippet.context.is_some() {
                Some(carrel_commons::carrel::common::context::v1::Context::from(
                    to_snippet.context.unwrap(),
                ))
            } else {
                None
            };
        Snippet {
            snippet: to_snippet.snippet,
            line_number: to_snippet.line_number,
            column_number: to_snippet.column_number,
            length: to_snippet.length,
            file,
            context,
        }
    }
}

impl From<TagV2> for ToTag {
    fn from(cmt_2: TagV2) -> Self {
        ToTag {
            key: cmt_2.key.to_lowercase(),
            value: cmt_2.value.map(|v| v.to_lowercase()),
            note: cmt_2.note.map(|n| n.to_lowercase()),
            raw_tag_string: cmt_2.raw_tag_string,
            snippet: None,
            uuid: Uuid::parse_str(cmt_2.uuid.as_str()).expect("Failed to parse uuid for incoming common tag v2"),
            id: cmt_2.id,
            to_uuid: Some(Uuid::parse_str(cmt_2.uuid.as_str()).expect(
                "Failed to parse uuid for incoming common tag v2's parent to_uuid"),
            ),
        }
    }
}

#[cfg(test)]
mod test {
    use crate::to_parser::parser::ToParser;
    use crate::to_parser::parser_option::ToParserOption;
    use crate::util_entities::to_snippet::ToSnippet;

    #[test]
    fn tag_should_have_snippet_information_when_path_is_provided() {
        let md_with_one_tag_fixture = carrel_utils::test::test_folders::get_test_fixture_path_buf()
            .join("md_with_one_tag.md");
        let tags = ToParser::scan_file_for_tags(
            md_with_one_tag_fixture.to_str().unwrap(),
            &ToParserOption::default(),
        )
            .unwrap();
        let first_tag = tags.tos.get(0).unwrap();
        assert_eq!(first_tag.snippet.is_some(), true);
        let snippet: Option<&ToSnippet> = first_tag.snippet.as_ref();
    }
}
