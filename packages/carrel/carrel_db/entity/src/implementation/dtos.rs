use carrel_commons::carrel::core::project_manager::v1::{
    AddArchiveRequest, CreateProjectRequest,
};
use sea_orm::ActiveValue::Set;
use crate::entities::{archive, file, project};




impl From<AddArchiveRequest> for archive::ActiveModel {
    fn from(add_archive: AddArchiveRequest) -> Self {
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
            ..Default::default()
        }
    }
}

impl From<&str> for file::ActiveModel {
     
}
