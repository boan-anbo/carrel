use to_core::to_parser::to_parser_result::ToParserResult;
use to_core::to_tag::to_tag_struct::ToTag;
use crate::to_api_dtos::{ToApiTag, ToApiTagScanResult};

// impl ToApiTagScanResult from ToParserResult<ToTag>
impl From<ToParserResult<ToTag>> for ToApiTagScanResult {
    fn from(result: ToParserResult<ToTag>) -> Self {
        let mut tags: Vec<ToApiTag> = Vec::new();
        for tag in result.tos {
            tags.push(ToApiTag::from(tag));
        }
        ToApiTagScanResult {
            text_original: result.text_original,
            tags,
            text_cleaned: result.text_cleaned,
        }
    }
}

// impl ToApiTag from ToTag
impl From<ToTag> for ToApiTag {
    fn from(tag: ToTag) -> Self {
        ToApiTag {
            key: tag.key,
            value: tag.value.unwrap_or("".to_string()),
            note: tag.note.unwrap_or("".to_string()),
        }
    }
}
