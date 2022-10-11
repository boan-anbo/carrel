use carrel_commons::carrel::common::project::v2::Project;
use crate::generated::app_project;

pub trait AppProject {

    fn into_common_project_v2(self) -> Project;

}

impl AppProject for app_project::Model {

    fn into_common_project_v2(self) -> Project {
        Project {
            id: self.id,
            uuid: self.uuid,
            name: self.name,
            description: self.description,
            project_directory: self.project_directory,
            project_db_directory: "".to_string(),
            last_used_at: self.last_used_at,
            deadline_at: self.deadline_at,
            next_meeting_at: self.next_meeting_at,
            created_at: self.created_at,
            completed_at: None,
            total_files: 0,
            total_notes: 0,
            total_tags: 0,
            total_text_documents: 0,
            total_archives: 0,
            importance: 0,
            task_state: 0,
            is_favorite: false,
            is_missing: false,
            is_hidden: false,
            is_archived: false,
            is_completed: false,
            metadata: Default::default()
        }
    }
}
