use std::ffi::OsStr;
use std::path::{Path, PathBuf};
use to_core::util_entities::to_file::ToFile;
use uuid::Uuid;
use crate::carrel::common::file::v1::File;

// impl from path_url to File
impl From<&str> for File {
    fn from(path_url: &str) -> Self {
        let path = PathBuf::from(path_url);
        File {
            uuid: Uuid::new_v4().to_string(),
            description: "".to_string(),
            importance: 0,
            file_name: path.file_name().unwrap_or_else(|| OsStr::new("")).to_str().unwrap_or("").to_string(),
            file_extension: path.extension().unwrap_or_else(|| OsStr::new("")).to_str().unwrap_or("").to_string(),
            file_dir: path.parent().unwrap_or_else(|| Path::new("")).to_str().unwrap_or("").to_string(),
            // get absolute path for file_full_path
            file_full_path: path.canonicalize().unwrap_or_else(|_| PathBuf::from("")).to_str().unwrap_or("").to_string(),
            tasks: vec![]
        }
    }
}

// from to_file
impl From<ToFile> for File {
    fn from(to_file: ToFile) -> Self {
        File::from(to_file.file_path.as_str())
    }
}

