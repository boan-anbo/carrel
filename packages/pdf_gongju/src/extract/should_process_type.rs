use pdfium_render::page_annotation::PdfPageAnnotationType;

/// Check whether the type of the annotation should be processed.
pub fn should_process(annot_type: &PdfPageAnnotationType) -> bool {
    match annot_type {
        PdfPageAnnotationType::Highlight => true,
        PdfPageAnnotationType::Underline => true,
        PdfPageAnnotationType::Squiggly => true,
        _ => false,
    }
}
