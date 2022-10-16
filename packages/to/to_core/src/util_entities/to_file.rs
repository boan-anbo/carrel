use carrel_commons::carrel::common::file::v1::File as CommonFile;
use serde::{Deserialize, Serialize};
use std::ffi::OsStr;
use std::path::{Path, PathBuf};
use uuid::Uuid;

#[derive(Deserialize, Debug, Serialize, Clone)]
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
            file_name: path
                .file_name()
                .unwrap_or_else(|| OsStr::new(""))
                .to_str()
                .unwrap_or("")
                .to_string(),
            file_extension: path
                .extension()
                .unwrap_or_else(|| OsStr::new(""))
                .to_str()
                .unwrap_or("")
                .to_string(),
            file_dir: path
                .parent()
                .unwrap_or_else(|| Path::new(""))
                .to_str()
                .unwrap_or("")
                .to_string(),
        }
    }
}
// #[prost(uint64, tag="1")]
// pub id: u64,
// /// id
// #[prost(string, tag="2")]
// pub uuid: ::prost::alloc::string::String,
// /// description
// #[prost(string, tag="3")]
// pub description: ::prost::alloc::string::String,
// /// importance
// #[prost(enumeration="super::super::importance::v1::Importance", tag="4")]
// pub importance: i32,
// /// / filename, with extension
// #[prost(string, tag="5")]
// pub file_name: ::prost::alloc::string::String,
// /// / file extension
// #[prost(string, tag="6")]
// pub extension: ::prost::alloc::string::String,
// /// / file directory
// #[prost(string, tag="7")]
// pub directory: ::prost::alloc::string::String,
// #[prost(string, tag="8")]
// pub full_path: ::prost::alloc::string::String,
// #[prost(string, tag="9")]
// pub created_at: ::prost::alloc::string::String,
// #[prost(string, tag="10")]
// pub modified_at: ::prost::alloc::string::String,
// #[prost(string, optional, tag="11")]
// pub synced_at: ::core::option::Option<::prost::alloc::string::String>,
// #[prost(bool, tag="12")]
// pub is_missing_file: bool,
// #[prost(bool, tag="13")]
// pub is_out_of_sync: bool,
// #[prost(string, tag="14")]
// pub collection_id: ::prost::alloc::string::String,
// #[prost(enumeration="super::super::task_state::v1::TaskState", tag="15")]
// pub task_state: i32,
// implement from ToFile into File
impl ToFile {
    pub fn into_common_file(self) -> CommonFile {
        CommonFile {
            id: 0,
            uuid: Uuid::new_v4().to_string(),
            description: "".to_string(),
            importance: 0,
            file_name: self.file_name,
            extension: self.file_extension,
            directory: self.file_dir,
            full_path: self.file_path,
            created_at: "".to_string(),
            modified_at: "".to_string(),
            synced_at: None,
            is_missing_file: false,
            is_out_of_sync: false,
            collection_id: "".to_string(),
            task_state: 0,
        }
    }
}
