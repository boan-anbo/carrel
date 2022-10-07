use pdfium_render::page_annotation::{PdfPageAnnotation, PdfPageAnnotationType};

pub fn get_annot_type_string(annot: &PdfPageAnnotation) -> String {
    match annot.annotation_type() {
        PdfPageAnnotationType::Highlight => "Highlight".to_string(),
        PdfPageAnnotationType::Underline => "Underline".to_string(),
        PdfPageAnnotationType::Squiggly => "Squiggly".to_string(),
        PdfPageAnnotationType::Ink => "Ink".to_string(),
        PdfPageAnnotationType::Link => "Link".to_string(),
        PdfPageAnnotationType::Popup => "Popup".to_string(),
        PdfPageAnnotationType::FileAttachment => "FileAttachment".to_string(),
        PdfPageAnnotationType::Text => "Text".to_string(),
        _ => "Unknown".to_string()
    }
}
