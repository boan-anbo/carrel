use std::ffi::OsStr;
use std::path::{Path, PathBuf};

pub struct ToFile {
    pub file_path: String,
    pub file_name: String,
    pub file_extension: String,
    pub file_dir: String,
}

// implement from string path to ToFile
impl From<&str> for ToFile {
    fn from(file_path_str: &str) -> Self {
        let path = PathBuf::from(file_path_str);
        ToFile {
            file_path: file_path_str.to_string(),
            file_name: path.file_name().unwrap_or(OsStr::new("")).to_str().unwrap_or("").to_string(),
            file_extension: path.extension().unwrap_or(OsStr::new("")).to_str().unwrap_or("").to_string(),
            file_dir: path.parent().unwrap_or(Path::new("")).to_str().unwrap_or("").to_string(),
        }
    }
}

