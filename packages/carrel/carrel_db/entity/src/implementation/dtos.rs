//! This module implements basic conversions for the ease of crud operations between model and dtos.
use std::path::PathBuf;
use carrel_commons::carrel::core::project_manager::v1::{AddArchiveDto, CreateProjectRequest};
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use sea_orm::ActiveValue::Set;
use crate::entities::{archive, file, project};




impl From<AddArchiveDto> for archive::ActiveModel {
    fn from(add_archive: AddArchiveDto) -> Self {
        archive::ActiveModel {
            project_id: Set(add_archive.project_id),
            name: Set(add_archive.name),
            description: Set(add_archive.description),
            created_at: Set(carrel_utils::datetime::get_iso_string::get_now_iso_string()),
            updated_at: Set(carrel_utils::datetime::get_iso_string::get_now_iso_string()),
            ..Default::default()
        }
    }
}

impl From<CreateProjectRequest> for project::ActiveModel {
    fn from(create_project: CreateProjectRequest) -> Self {

        project::ActiveModel {
            name: Set(create_project.name),
            description: Set(create_project.description),
            directory: Set(Some(create_project.directory)),
            db_name: Set(Some(create_project.db_name)),
            to_name: Set(Some(create_project.to_name)),
            create_at: Set(get_now_iso_string()),
            updated_at: Set(get_now_iso_string()),
            ..Default::default()
        }
    }
}


impl From<&str> for file::ActiveModel {
    fn from(file_path: &str) -> Self {
        let file_path_buf = PathBuf::from(file_path);
        let file_name = file_path_buf.file_name().unwrap().to_str().unwrap();
        let file_extension = file_path_buf.extension().unwrap().to_str().unwrap();
        let dir = file_path_buf.parent().unwrap().to_str().unwrap();

        file::ActiveModel {
            description: Set("".to_string()),
            file_name: Set(file_name.to_string()),
            extension: Set(file_extension.to_string()),
            directory: Set(dir.to_string()),
            full_path: Set(file_path.to_string()),
            importance: Set(0),
            task_state: Set(0),
            archive_id: Set(0),
            ..Default::default()
        }
    }
}
