use log::info;

use carrel_commons::carrel::common::firefly::v2::Firefly;
use simplelog::{ColorChoice, CombinedLogger, Config, LevelFilter, TerminalMode, TermLogger};
use crate::extract::convert_annot_to_firefly::convert_pdf_annotation_to_firefly;
use crate::extract::errors::PdfGongjuError;
use crate::extract::extractor_options::ExtractorOption;
use crate::extract::should_process_type::should_process;
use crate::pdfium::pdfium_binary::get_pdfium;

pub struct PdfGongju {}

pub trait PdfExtractor {
    fn extract_fireflies(pdf_path: &str, opt: &ExtractorOption) -> Result<Vec<Firefly>, PdfGongjuError>;
}

impl PdfExtractor for PdfGongju {
    fn extract_fireflies(pdf_path: &str, opt: &ExtractorOption) -> Result<Vec<Firefly>, PdfGongjuError> {


        let mut fireflies: Vec<Firefly> = Vec::new();
        let pdfium = get_pdfium();

        let doc = pdfium
            .load_pdf_from_file(pdf_path, None)
            .map_err(|_| PdfGongjuError::LoadPdfError(pdf_path.to_string()))?;

        info!("Loaded PDF: {}", pdf_path);



        doc.pages()
            .iter()
            .enumerate()
            .for_each(|(page_index, page)| {
                page.annotations()
                    .iter()
                    .enumerate()
                    .for_each(|(_annotation_index, annotation)| {
                        if !should_process(&annotation.annotation_type()) {
                            return;
                        }

                        fireflies.push(
                            convert_pdf_annotation_to_firefly(&page, page_index, annotation, pdf_path, opt)
                        )
                    });
            });

        // log how many fireflies were extracted from which file
        info!("Extracted {} fireflies from {}", fireflies.len(), pdf_path);

        Ok(fireflies)
    }
}

#[cfg(test)]
mod tests {
    use carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf;
    use crate::extract::extractor::{PdfExtractor, PdfGongju};
    use crate::extract::extractor_options::ExtractorOption;

    #[test]
    fn test_extract_fireflies() {
        let fireflies = PdfGongju::extract_fireflies("tests/chn.pdf", &ExtractorOption {
            firefly_include_full_text: true,
            ..Default::default()
        }).unwrap();
        let fireflies_pretty_json = serde_json::to_string_pretty(&fireflies).unwrap();

        // write to fixture
        let fixture_dir = get_test_fixture_module_folder_path_buf("extractor");
        std::fs::write(fixture_dir.join("fireflies.json"), fireflies_pretty_json).unwrap();

        // first annot
        let first_annot = &fireflies[0];
        assert_eq!(first_annot.light, "中國知識份子的邊緣化");
        assert_eq!(first_annot.description, "Highlight");
        assert_eq!(first_annot.created_at, "2022-08-22T23:52:45+05:00");
        assert_eq!(first_annot.modified_at, "2022-08-22T23:52:58+05:00");

        // check comment
        assert_eq!(first_annot.comment, "Page 0: Highlight Text");
        assert_eq!(first_annot.comment_author, "Bo");
        assert_eq!(first_annot.comment_created_at, "2022-08-22T23:52:45+05:00");
        assert_eq!(first_annot.comment_modified_at, "2022-08-22T23:52:58+05:00");

        // check page
        assert_eq!(first_annot.location_raw, "0");
        assert_eq!(first_annot.location_actual, "0");

        // check file
        assert_eq!(first_annot.file_full_name, "chn.pdf");
        assert_eq!(first_annot.file_extension, "pdf");
        assert!(first_annot.file_directory.ends_with("tests"));

        // check document
        assert_eq!(first_annot.document_title, "chn");

        // check full text
        assert!(first_annot.context.len() > 0);

        // second annot
        let second_annot = &fireflies[1];
        assert_eq!(second_annot.light, "我想借這個機會提出一個比較有趣的問題，供大家討論，");
        assert_eq!(second_annot.description, "Underline");

        // check comment
        assert_eq!(second_annot.comment, "Page 0: Underline 中文");
        assert_eq!(second_annot.comment_author, "Bo");
    }

    // test on corrupted pdf, should panic
    #[test]
    #[should_panic]
    fn test_extract_fireflies_corrupted_pdf() {
        let fireflies = PdfGongju::extract_fireflies("tests/corrupted.pdf", &ExtractorOption {
            firefly_include_full_text: true,
            ..Default::default()
        }).unwrap();
    }

    // test chn_ocred.pdf, should not panic
    #[test]
    fn test_extract_fireflies_chn_ocred_pdf() {
        let fireflies = PdfGongju::extract_fireflies("tests/chn_ocred.pdf", &ExtractorOption {
            firefly_include_full_text: true,
            ..Default::default()
        }).unwrap();

        // first annot
        let first_annot = &fireflies[0];
        assert_eq!(first_annot.location_raw, "4");
        assert_eq!(first_annot.document_pages, 245);
    }

    // test pdf_with_tags.pdf, should not panic
    #[test]
    fn test_extract_fireflies_pdf_with_tags() {
        let fireflies = PdfGongju::extract_fireflies("tests/pdf_with_tags.pdf", &ExtractorOption {
            firefly_include_full_text: true,
            ..Default::default()
        }).unwrap();

        // first annot
        let first_annot = &fireflies[0];

        assert_eq!(first_annot.comment, "beforeafter");
        assert_eq!(first_annot.tags.len(), 1);
        let first_tag = &first_annot.tags[0];

        assert_eq!(first_tag.key, "Important");

        assert_eq!(first_tag.value, Some("Important_value".to_string()));
         assert_eq!(first_tag.note, Some("important_note".to_string()));


    }
}
