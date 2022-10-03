use carrel_db::entities::prelude::{Archive, Project};
use crate::project::archive_item::ArchiveItem;
use crate::project::project_item::ProjectItem;

pub struct ProjectManager {
    pub project: ProjectItem,
    pub archives: Vec<ArchiveItem>,
}


