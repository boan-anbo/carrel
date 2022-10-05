mod trait_manage_project;
mod method_manage_project;

use carrel_db::entities::prelude::{Archive, Project};

pub struct ProjectManager {
    pub project: Project,
    pub archives: Vec<Archive>,
}


