use thiserror::Error;
use carrel_commons::carrel::common::firefly::v1::Firefly;
use carrel_commons::carrel::common::passage::v1::Passage;
use carrel_commons::carrel::common::snippet::v1::Snippet;
use pdfium_render::prelude::*;
use crate::pdfium::pdfium_binary::get_pdfium;


pub struct PdfGongju {}

pub trait PdfExtractor {
    fn extract_fireflies(pdf_path: &str) -> Result<Vec<Firefly>, String>;
}

fn convert_pdf_annotation_to_firefly(page: &PdfPage, page_index: usize, annot: PdfPageAnnotation) -> Firefly {
    // initial firefly
    let mut firefly = Firefly::default();

    // modified
    let modified_tag = annot.modification_date().unwrap_or("".to_string());
    firefly.modified_at = modified_tag;

    let created = annot.creation_date().unwrap_or("".to_string());
    firefly.created_at = created;

    firefly.description = match annot.annotation_type() {
        PdfPageAnnotationType::Highlight => "highlight".to_string(),
        PdfPageAnnotationType::Underline => "underline".to_string(),
        PdfPageAnnotationType::Squiggly => "squiggly".to_string(),
        PdfPageAnnotationType::Ink => "ink".to_string(),
        PdfPageAnnotationType::Link => "link".to_string(),
        PdfPageAnnotationType::Popup => "popup".to_string(),
        PdfPageAnnotationType::FileAttachment => "fileattachment".to_string(),
        PdfPageAnnotationType::Text => "text".to_string(),
        _ => "unknown".to_string()
    };

    firefly.extra.push(annot.contents().unwrap_or("".to_string()));

    // initial passage
    let mut passage = Passage::default();

    passage.location = page_index.to_string();


    // initial snippet
    let mut snippet = Snippet::default();

    // extract
    let annot_text = page.text().unwrap().for_annotation(&annot).unwrap();

    // load text
    snippet.snippet = annot_text;


    // load values to firefly
    firefly.snippet = Some(snippet);
    firefly.passage = Some(passage);

    firefly
}


#[derive(Error, Debug)]
pub enum PdfGongjuError {
    #[error("Failed to load pdfium")]
    LoadPdfiumError,
    #[error("Failed to load pdf: {0}")]
    LoadPdfError(String),
    #[error("Failed to load pdf page")]
    LoadPdfPageError,
    #[error("Failed to load pdf annotation")]
    LoadPdfAnnotationError,
}

impl PdfExtractor for PdfGongju {
    fn extract_fireflies(pdf_path: &str) -> Result<Vec<Firefly>, String> {
        let mut fireflies: Vec<Firefly> = Vec::new();
        let pdfium = get_pdfium();

        pdfium
            .load_pdf_from_file(pdf_path, None)
            .map_err(|_| PdfGongjuError::LoadPdfError(pdf_path.to_string())).unwrap()
            .pages()
            .iter()
            .enumerate()
            .for_each(|(page_index, page)| {
                // For each page in the document, iterate over the annotations attached to that page.

                println!("=============== Page {} ===============", page_index);

                page.annotations()
                    .iter()
                    .enumerate()
                    .for_each(|(annotation_index, annotation)| {
                        fireflies.push(
                            convert_pdf_annotation_to_firefly(&page, page_index, annotation)
                        )
                    });
            });


        Ok(fireflies)
    }
}

#[cfg(test)]
mod tests {
    use carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf;
    use serde_json::json;
    use crate::extract::extractor::{PdfExtractor, PdfGongju};

    #[test]
    fn test_extract_fireflies() {
        let fireflies = PdfGongju::extract_fireflies("tests/chn.pdf").unwrap();
        let fireflies_pretty_json = serde_json::to_string_pretty(&fireflies).unwrap();

        // write to fixture
        let fixture_dir = get_test_fixture_module_folder_path_buf("extractor");
        std::fs::write(fixture_dir.join("fireflies.json"), fireflies_pretty_json).unwrap();

        assert_eq!(fireflies.len(), 2);
    }
}
