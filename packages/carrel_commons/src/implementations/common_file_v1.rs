use std::ffi::OsStr;
use std::path::{Path, PathBuf};
use uuid::Uuid;
use crate::carrel::common::file::v1::File;

// impl from path_url to File
impl From<&str> for File {
    fn from(path_url: &str) -> Self {
        let path = PathBuf::from(path_url);
        File {
            id: 0,
            uuid: Uuid::new_v4().to_string(),
            description: "".to_string(),
            importance: 0,
            file_name: path.file_name().unwrap_or_else(|| OsStr::new("")).to_str().unwrap_or("").to_string(),
            extension: path.extension().unwrap_or_else(|| OsStr::new("")).to_str().unwrap_or("").to_string(),
            directory: path.parent().unwrap_or_else(|| Path::new("")).to_str().unwrap_or("").to_string(),
            // get absolute path for file_full_path
            full_path: path.canonicalize().unwrap_or_else(|_| PathBuf::from("")).to_str().unwrap_or("").to_string(),
            created_at: "".to_string(),
            modified_at: "".to_string(),
            synced_at: Some("".to_string()),
            is_missing_file: false,
            is_out_of_sync: false,
            collection_id: "".to_string(),
            task_state: 0,
        }
    }
}


