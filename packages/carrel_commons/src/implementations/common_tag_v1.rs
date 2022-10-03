use std::path::PathBuf;
use crate::carrel::common::tag::v1::Tag;
use to_core::to_tag::to_tag_struct::ToTag;
use to_core::util_entities::to_snippet::ToSnippet;
use uuid::Uuid;
use crate::carrel::common::context::v1::Context;
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
            passage: None
        }
    }
}

impl From<ToSnippet> for Snippet {
    fn from(to_snippet: ToSnippet) -> Self {


        let file: Option<File> = if to_snippet.file.is_some() {
            Some(File::from(to_snippet.file.unwrap()))
        } else {
            None
        };

        let context: Option<Context> = if to_snippet.context.is_some() {
            Some(Context::from(to_snippet.context.unwrap()))
        } else {
            None
        };
        Snippet {
            snippet: to_snippet.snippet,
            line_number: to_snippet.line_number,
            column_number: to_snippet.column_number,
            length: to_snippet.length,
            file,
            context
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
        assert_eq!(first_tag.snippet.is_some(), true);
        let snippet = first_tag.snippet.as_ref();

    }
}



