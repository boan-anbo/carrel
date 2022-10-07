use thiserror::Error;

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
