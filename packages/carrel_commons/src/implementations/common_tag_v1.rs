use std::path::PathBuf;
use crate::carrel::common::tag::v1::Tag;
use to_core::to_tag::to_tag_struct::ToTag;
use to_core::entities::to_snippet_location::ToSnippetLocation;
use uuid::Uuid;
use crate::carrel::common::file::v1::File;
use crate::carrel::common::snippet::v1::Snippet;

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
        let mut snippet: Option<Snippet> = None;
        let mut file = None;
        if tag.snippet_location.is_some() {
            let to_snippet_location = tag.snippet_location.unwrap();
            file = Some(File::from(to_snippet_location.file_path.as_str()));
            snippet = Some(Snippet::from(to_snippet_location));
        }

        Tag {
            key: tag.key,
            value: tag.value,
            note: tag.note,
            uuid: Uuid::new_v4().to_string(),
            file,
            snippet,
            passage: None
        }
    }
}

impl From<ToSnippetLocation> for Snippet {
    fn from(to_snippet_location: ToSnippetLocation) -> Self {

        let file_path = to_snippet_location.file_path.clone();
        let path = PathBuf::from(file_path);

        Snippet {
            snippet: to_snippet_location.snippet,
            line_number: to_snippet_location.line_number,
            column_number: to_snippet_location.column_number,
            length: to_snippet_location.length,
        }
    }
}

#[cfg(test)]
mod test {
    use to_core::to_parser::parser::ToParser;
    use to_core::to_parser::parser_option::ToParserOption;

    #[test]
    fn tag_should_have_snippet_information_when_path_is_provided() {

        let md_with_one_tag_fixture = carrel_utils::test::test_folders::get_test_fixture_path_buf().join("md_with_one_tag.md");
        let tags = ToParser::scan_file_for_tags(md_with_one_tag_fixture.to_str().unwrap(), &ToParserOption::default()).unwrap();
         let first_tag = tags.tos.get(0).unwrap();
        assert_eq!(first_tag.snippet_location.is_some(), true);
        let snippet_location = first_tag.snippet_location.as_ref().unwrap();
        assert_eq!(snippet_location.file_path, md_with_one_tag_fixture.as_path().to_str().unwrap());
    }
}



