use std::fs::canonicalize;
use std::path::PathBuf;
use pdfium_render::page::PdfPage;
use pdfium_render::page_annotation::{PdfPageAnnotation, PdfPageAnnotationCommon};
use carrel_commons::carrel::common::firefly::v2::Firefly;
use carrel_commons::carrel::common::tag::v2::Tag;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use carrel_utils::uuid::new_v4;
use to_core::to_parser::parser::ToParser;
use to_core::to_parser::parser_option::ToParserOption;
use to_core::to_tag::to_tag_struct::ToTag;
use crate::extract::extractor_options::ExtractorOption;
use crate::extract::get_annot_type_string;
use crate::utils::parse_datetime::parse_datetime_str;

pub fn convert_pdf_annotation_to_firefly(page: &PdfPage, page_index: usize, annot: PdfPageAnnotation, pdf_path: &str, opt: &ExtractorOption) -> Firefly {
    let now = get_now_iso_string();
    // initial firefly
    let mut firefly = Firefly::default();

    // basic info
    let annot_text = page.text().unwrap().for_annotation(&annot).unwrap_or("".to_string());


    firefly.light = annot_text;

    firefly.description = get_annot_type_string::get_annot_type_string(&annot);

    if opt.firefly_include_full_text {
        firefly.context = page.text().unwrap().all();
    }

    // load location
    firefly.location_raw = page_index.to_string();
    firefly.location_raw_type = "pdf_page_index".to_string();
    firefly.location_actual = page_index.to_string();
    firefly.location_actual_type = "pdf_page_index".to_string();
    firefly.location_actual_modified_at = now.clone();


    // load timestamps
    let modified_tag = annot.modification_date().unwrap_or("".to_string());
    firefly.modified_at = parse_datetime_str(&modified_tag);

    let created = annot.creation_date().unwrap_or("".to_string());
    firefly.created_at = parse_datetime_str(&created);

    firefly.extracted_at = now.clone();

    // load comments and comment tags

    let comment_text = annot.contents().unwrap_or("".to_string());

    if !comment_text.is_empty() {
        // extract tags
        let tag_scan_result = ToParser::scan_text_for_tags(&comment_text, &ToParserOption::default(), None);

        let tags: Vec<Tag> = tag_scan_result.tos.into_iter().map(move |tag| {
            convert_to_tag_to_tag(tag)
        }).collect();

        tags.iter().for_each(|tag| {
            firefly.tags.push(tag.clone());
        });

        // if there is a first tag, use it as the main tag
        if tags.len() > 0 {
            firefly.select_tag = Some(tags.first().unwrap().clone());
        }

        firefly.comment = tag_scan_result.text_cleaned;
        firefly.comment_created_at = parse_datetime_str(&annot.creation_date().unwrap_or("".to_string()));
        firefly.comment_modified_at = parse_datetime_str(&annot.modification_date().unwrap_or("".to_string()));
        firefly.comment_author = annot.creator().unwrap_or("".to_string());
    }

    // load file
    let file_path = PathBuf::from(pdf_path);

    let file_name = file_path.file_name().unwrap().to_str().unwrap().to_string();
    firefly.file_full_name = file_name.clone();
    firefly.file_extension = file_path.extension().unwrap().to_str().unwrap().to_string();
    firefly.file_directory = canonicalize(file_path.parent().unwrap()).unwrap().to_str().unwrap().to_string();

    // load document = file name without extension, safe to unwrap or empty string
    firefly.document_title = file_path.file_stem().unwrap().to_str().unwrap_or("").to_string();
    firefly.document_pages = page.document().pages().len().to_string().parse().unwrap();

    // tags in the text

    firefly
}

fn convert_to_tag_to_tag(to_tag: ToTag) -> Tag {
    Tag {
        key: to_tag.key,
        value: to_tag.value,
        note: to_tag.note,
        raw_tag_string: to_tag.tag_string,
        uuid: new_v4().to_string(),
        collection_uuids: vec![],
        related_tag_uuids: vec![],
    }
}


