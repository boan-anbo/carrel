//! # What is CarrelConnect?
//!
//! CarrelApp (system-wide db) and CarrelProjectManagers (individual projects) are separate modules.
//!
//! CarrelConnect is reponsible for performing actions like these,
//!
//! - Add a project to CarrelApp project list.
//!
//! - Open a project from CarrelApp project list.
//!
//!
//! # This is the MAIN entrance point for the carrel app for actions that needs both app and projects:
//!
//! - Open a project in a folder which will do the following:
//!
//!    - Open the project (ProjectManager)
//!     - Add the project to the app project list (AppManager)
//!
//! # For those actions that only needs the app or project managers, instantiate them with `load()`.
//!
use async_trait::async_trait;
use carrel_app_db::entity::implementation::AppProject;
use std::error::Error;

use carrel_commons::carrel::core::project_manager::v1::ProjectInfo;
use carrel_db::implementation::project_traits::CommonProjectTrait;

use crate::app::app_manager::{CarrelAppManager, ManageCarrelApp};
use crate::errors::carrel_core_error::CarrelCoreError;
use crate::project::db_manager::project_db_manager::MangageProjects;
use crate::project::project_manager::CarrelProjectManager;
use crate::project::project_manager_methods::manage_project::ManageProjectTrait;

pub struct CarrelCore {
    pub app: CarrelAppManager,
    pub project: CarrelProjectManager,
}

#[async_trait]
pub trait CarrelCoreTrait {
    async fn new(app_directory: &str, project_directory: &str) -> Self;
    /// this does not actually open a project, because Carrel project does not need to be `opened` and is always `open` and `ejectable`.
    /// What this does is actually take the project directory and add it to the app project list.
    async fn open_project(&self) -> Result<ProjectInfo, CarrelCoreError>;
}

#[async_trait]
impl CarrelCoreTrait for CarrelCore {
    async fn new(app_directory: &str, project_directory: &str) -> Self {
        let app = CarrelAppManager::load(app_directory).await;
        let project = CarrelProjectManager::load(project_directory).await.unwrap();
        CarrelCore { app, project }
    }

    async fn open_project(&self) -> Result<ProjectInfo, CarrelCoreError> {
        let project_model = self.project.db.get_project().await.unwrap();
        let project = project_model.into_common_project_v2();
        let app_project = self.app.save_project(project).await.unwrap();
        let project_info = self.project.get_project_info(app_project).await;
        Ok(project_info)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use carrel_app_db::carrel_app_manager::ManageProjectList;
    use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;

    #[tokio::test]
    async fn test_carrel_connect_should_instantiate() {
        let random_test_folder = get_random_test_temp_folder_path_buf();
        let folder_str = random_test_folder.to_str().unwrap();

        let carrel_connect = CarrelCore::new(folder_str, folder_str).await;

        // there sholud be four files in the directory
        let files_under = std::fs::read_dir(folder_str).unwrap();
        assert_eq!(files_under.count(), 4);

        let open_project = carrel_connect.open_project().await;

        let project = carrel_connect.project.db.get_project().await.unwrap();
        let project_uuid = project.uuid;

        // first app_project should have the same uuid as the project
        // get first app_project
        let app_project = carrel_connect
            .app
            .app_db
            .get_app_project_by_id(2)
            .await
            .unwrap();
        let app_project_uuid = app_project.uuid;
        assert_eq!(project_uuid, app_project_uuid);

        // get recent
        let recent = carrel_connect
            .app
            .app_db
            .get_most_recent_app_project()
            .await
            .unwrap();

        assert_eq!(recent.uuid, project_uuid);
    }
}
