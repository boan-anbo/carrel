//! This module implements basic conversions for the ease of crud operations between model and dtos.
use crate::entities::project;
use carrel_commons::carrel::common::project::v2::Project as CommonProjectV2;
use carrel_commons::carrel::core::project_manager::v1::CreateProjectRequest;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use sea_orm::ActiveValue::Set;

use carrel_utils::uuid::new_v4;
use sea_orm::NotSet;

impl From<CreateProjectRequest> for project::ActiveModel {
    fn from(create_project: CreateProjectRequest) -> Self {
        project::ActiveModel {
            id: NotSet,
            uuid: Set(new_v4().to_string()),
            name: Set(create_project.name),
            description: Set(create_project.description),
            directory: Set(Some(create_project.directory)),
            db_name: Set(Some(create_project.db_name)),
            to_name: Set(Some(create_project.to_name)),
            create_at: Set(get_now_iso_string()),
            updated_at: Set(get_now_iso_string()),
            archive_count: Set(0),
            file_count:Set(0)
        }
    }
}

pub trait CommonProjectTrait {
    fn into_common_project_v2(self) -> CommonProjectV2;
}

impl CommonProjectTrait for project::Model {
    fn into_common_project_v2(self) -> CommonProjectV2 {
        CommonProjectV2 {
            id: self.id,
            uuid: self.uuid,
            name: self.name,
            description: self.description,
            project_directory: self.directory.unwrap_or("".to_string()),
            project_db_directory: self.db_name.unwrap_or("".to_string()),
            created_at: self.create_at,
            ..Default::default()
        }
    }
}
