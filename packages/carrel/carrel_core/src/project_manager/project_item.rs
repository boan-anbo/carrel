use carrel_db::entities::prelude::Project;

mod methods;

// wrapper around db entity Project.
pub struct ProjectItem {
    pub project: Project
}
