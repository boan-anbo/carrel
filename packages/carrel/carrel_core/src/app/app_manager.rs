use async_trait::async_trait;
use carrel_app_db::carrel_app_manager::{
    CarrelAppDbManager, CarrelAppError, ManageCarrelAppDb, ManageProjectList,
};
use carrel_app_db::entity::generated::app_project;
use carrel_commons::carrel::common::project::v2::Project;

pub use carrel_app_db::*;

use sea_orm::ActiveValue::Set;
use sea_orm::NotSet;

pub struct CarrelAppManager {
    pub app_db: CarrelAppDbManager,
}

#[async_trait]
pub trait ManageCarrelApp {
    async fn load(app_directory: &str) -> Self;

    async fn save_project(&self, project: Project) -> Result<app_project::Model, CarrelAppError>;
}

#[async_trait]
impl ManageCarrelApp for CarrelAppManager {
    async fn load(app_directory: &str) -> Self {
        CarrelAppManager {
            app_db: CarrelAppDbManager::load(app_directory).await.unwrap(),
        }
    }

    async fn save_project(&self, project: Project) -> Result<app_project::Model, CarrelAppError> {
        let app_project_to_save = CarrelAppManager::project_to_app_project(project);
        let result = self.app_db.save_app_project(app_project_to_save).await?;
        Ok(result)
    }
}

pub trait CarrelAppProjectConverter {
    fn project_to_app_project(project: Project) -> app_project::ActiveModel;
}

impl CarrelAppProjectConverter for CarrelAppManager {
    fn project_to_app_project(project: Project) -> app_project::ActiveModel {
        // TODO: add these fileds to the project entity too so that they becomes the same.
        // These currently doesn't matter. The unset just means that the unset fields in the project from inidividual directories are not added to the app project list.
        app_project::ActiveModel {
            id: NotSet, // this should not be set, because individual project id are all the same: 1.
            uuid: Set(project.uuid),
            name: Set(project.name),
            description: Set(project.description),
            project_directory: Set(project.project_directory),
            last_used_at: Set(project.last_used_at),
            deadline_at: Set(project.deadline_at),
            next_meeting_at: Set(project.next_meeting_at),
            created_at: Set(project.created_at),
            total_files: Set(project.total_files),
            total_fireflies: Set(0),
            total_text_documents: Set(project.total_text_documents),
            importance: Set(project.importance),
            task_state: Set(project.task_state),
            is_favorite: Set(i32::from(project.is_favorite)),
            is_missing: Set(i32::from(project.is_missing)),
            is_hidden: Set(i32::from(project.is_hidden)),
            is_archived: Set(i32::from(project.is_archived)),
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;

    #[tokio::test]
    async fn test_load() {
        let temp_app_folder = get_random_test_temp_folder_path_buf();
        let app_manager = CarrelAppManager::load(temp_app_folder.to_str().unwrap()).await;

        // assert the existence of the app db file
        assert!(app_manager.app_db.app_db_full_path.exists());

        // assert it's in the same path as the app folder
        assert_eq!(
            app_manager.app_db.app_db_full_path.parent().unwrap(),
            temp_app_folder
        );
    }
}
