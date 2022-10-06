use std::fs::File;
use std::io::Read;
use crate::pdfium::pdfium_binary::get_pdfium;

pub fn is_pdf_corrupted(file_path: &str) -> bool {
    let mut file = match File::open(file_path) {
        Ok(file) => file,
        Err(_) => return true,
    };
    let mut buffer = [0; 1024];
    let _ = file.read(&mut buffer).is_err();

    let pdfium = get_pdfium();
    let load_result = pdfium.load_pdf_from_file(file_path, None);
    load_result.is_err()

}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    pub fn test_is_pdf_corrupted() {
        assert!(is_pdf_corrupted("tests/corrupted.pdf"));
        assert!(!is_pdf_corrupted("tests/chn.pdf"));
    }
}
