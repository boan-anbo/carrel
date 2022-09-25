use std::ffi::OsStr;
use std::path::{Path, PathBuf};
use uuid::Uuid;
use crate::carrel::common::file::v1::File;

// impl from path_url to File
impl From<&str> for File {
    fn from(path_url: &str) -> Self {
        let path = PathBuf::from(path_url);
        File {
            uuid: Uuid::new_v4().to_string(),
            file_name: path.file_name().unwrap_or( OsStr::new("")).to_str().unwrap_or("").to_string(),
            file_extension: path.extension().unwrap_or( OsStr::new("")).to_str().unwrap_or("").to_string(),
            file_dir: path.parent().unwrap_or( Path::new("")).to_str().unwrap_or("").to_string(),
            // get absolute path for file_full_path
            file_full_path: path.canonicalize().unwrap_or( PathBuf::from("")).to_str().unwrap_or("").to_string(),
        }
    }
}
