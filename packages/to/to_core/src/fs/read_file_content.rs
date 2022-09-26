use std::path::PathBuf;
use crate::utils::check_if_file_exists::check_if_file_exists;


// supported formats
const SUPPORTED_FORMATS: [&str; 2] = ["txt", "md"];

pub fn read_file_content(file_path: &str) -> std::io::Result<String> {
    // check if the file exists and are supported plain text files
    if !check_if_file_exists(file_path) {
        return Err(std::io::Error::new(
            std::io::ErrorKind::NotFound,
            "file not found",
        ));
    }
    // check if the file is supported plain text file by checking its extension
    // The supported
    let path_buf = PathBuf::from(file_path);
    let extension = path_buf
        .extension()
        .unwrap()
        .to_str()
        .unwrap();
    if !SUPPORTED_FORMATS.contains(&extension.to_lowercase().as_str()) {
        return Err(std::io::Error::new(
            std::io::ErrorKind::Other,
            "file format not supported",
        ));
    }

    let text = std::fs::read_to_string(file_path);
    text
}
