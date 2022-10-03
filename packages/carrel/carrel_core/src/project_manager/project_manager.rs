
use crate::project_manager::archive_item::ArchiveItem;
use crate::project_manager::project_item::ProjectItem;

pub struct ProjectManager {
    pub project: ProjectItem,
    pub archives: Vec<ArchiveItem>,
}


