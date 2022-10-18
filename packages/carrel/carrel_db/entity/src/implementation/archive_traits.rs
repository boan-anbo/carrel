use crate::entities::archive;
use carrel_commons::carrel::common::archive::v1::Archive;
use sea_orm::ActiveValue::Set;

use carrel_commons::carrel::core::project_manager::v1::AddArchiveDto;

pub trait ArchiveTrait {
    fn into_archive(self) -> carrel_commons::carrel::common::archive::v1::Archive;
}

impl From<AddArchiveDto> for archive::ActiveModel {
    fn from(add_archive: AddArchiveDto) -> Self {
        archive::ActiveModel {
            id: Default::default(),
            project_id: Set(add_archive.project_id),
            uuid: Set(carrel_utils::uuid::new_v4().to_string()),
            name: Set(add_archive.name),
            description: Set(add_archive.description),
            importance: Default::default(),
            is_favorite: Default::default(),
            created_at: Set(carrel_utils::datetime::get_iso_string::get_now_iso_string()),
            updated_at: Set(carrel_utils::datetime::get_iso_string::get_now_iso_string()),
        }
    }
}

impl ArchiveTrait for archive::Model {
    fn into_archive(self) -> Archive {
        Archive {
            id: self.id,
            uuid: self.uuid,
            project_uuids: vec![],
            name: self.name,
            description: self.description,
            documents: vec![],
            removed_documents: vec![],
            importance: 0,
            is_favorite: false,
            files: vec![],
            created_at: self.created_at,
            updated_at: self.updated_at,
        }
    }
}
