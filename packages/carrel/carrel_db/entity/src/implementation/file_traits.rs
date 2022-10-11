//! Utilities for the entities, e.g. convert datetime string to chrono

use std::ffi::OsStr;
use std::fs;
use std::path::{Path, PathBuf};

use crate::entities::file;
use crate::entities::prelude::File;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
pub use chrono::prelude::*;
use sea_orm::ActiveValue::Set;

impl file::ActiveModel {
    pub fn get_file_latested_modified_at(&mut self) -> String {
        let file_path = self.full_path.take().unwrap();
        let file = fs::File::open(file_path.as_str());
        // if no result, return the original modified_at
        if file.is_err() {
            return self.modified_at.take().unwrap();
        }
        // to iso string
        let metadata = file.unwrap().metadata().unwrap();
        let modified_at = metadata.modified().unwrap();
        let modified_at = DateTime::<Utc>::from(modified_at);
        modified_at.to_rfc3339()
    }

    pub fn get_modified_at(&self) -> chrono::DateTime<chrono::Utc> {
        let modified_at = self.modified_at.as_ref();
        let modified_at = DateTime::parse_from_rfc3339(modified_at).unwrap();
        modified_at.with_timezone(&chrono::Utc)
    }

    pub fn get_synced_at(&self) -> Option<chrono::DateTime<chrono::Utc>> {
        let synced_at = self.synced_at.as_ref();
        if synced_at.is_some() {
            let synced_at = synced_at.as_ref().unwrap();
            let synced_at = DateTime::parse_from_rfc3339(synced_at).unwrap();
            Some(synced_at.with_timezone(&chrono::Utc))
        } else {
            None
        }
    }

    pub fn is_out_of_sync(&self) -> bool {
        let modified_at = self.get_modified_at();
        let synced_at = self.get_synced_at();
        if synced_at.is_some() {
            let synced_at = synced_at.unwrap();
            modified_at > synced_at
        } else {
            true
        }
    }

    pub fn set_synced_at_now(&mut self) -> () {
        let synced_at = get_now_iso_string();
        self.synced_at = Set(Some(synced_at));
    }
}

impl From<&str> for file::ActiveModel {
    /// convert file path, parse its metadata, and convert to file active model
    fn from(file_path: &str) -> Self {
        let file_path_buf = PathBuf::from(file_path);
        let file_name = file_path_buf
            .file_name()
            .unwrap_or(OsStr::new(""))
            .to_str()
            .unwrap();
        let file_extension = file_path_buf
            .extension()
            .unwrap_or(OsStr::new(""))
            .to_str()
            .unwrap();
        let dir = file_path_buf
            .parent()
            .unwrap_or(Path::new(""))
            .to_str()
            .unwrap();

        file::ActiveModel {
            id: Default::default(),
            description: Set("".to_string()),
            file_name: Set(file_name.to_string()),
            extension: Set(file_extension.to_string()),
            directory: Set(dir.to_string()),
            full_path: Set(file_path.to_string()),
            importance: Set(0),
            task_state: Set(0),
            created_at: Set(get_now_iso_string()),
            modified_at: Set(get_now_iso_string()),
            synced_at: Set(None),
            is_missing_file: Set(0),
            is_out_of_sync: Set(1),
            archive_id: Set(0),
            uuid: Set(carrel_utils::uuid::new_v4().to_string()),
        }
    }
}

impl From<file::Model> for carrel_commons::carrel::common::file::v1::File {
    // Convert SeaOrm File read model to File proto
    fn from(db_file: file::Model) -> Self {
        carrel_commons::carrel::common::file::v1::File {
            id: db_file.id,
            uuid: db_file.uuid,
            description: db_file.description,
            importance: db_file.importance,
            file_name: db_file.file_name,
            created_at: db_file.created_at,
            modified_at: db_file.modified_at,
            synced_at: db_file.synced_at,
            // convert Rust i32 to bool
            is_missing_file: db_file.is_missing_file == 1,
            is_out_of_sync: db_file.is_out_of_sync == 1,
            collection_id: db_file.archive_id.to_string(),
            extension: db_file.extension,
            directory: db_file.directory,
            full_path: db_file.full_path,
            task_state: db_file.task_state,
        }
    }
}

// impl From<StandardQuery> for SimpleExpr {
//     fn from(query: StandardQuery) -> Self {
//     }
// }
