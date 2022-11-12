//! This package provide a tester to test the project manager.
//!
//! # Features
//!
//! - get project manager
//! - get project manager with seeded db
//! - get seeded DbManager
//!
use crate::project::db_manager::carrel_db_manager::CarrelDbManager;
use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::CreateProjectRequest;
use crate::project::project_manager::project_manager::CarrelProjectManager;

#[async_trait]
pub trait ProjectTester {
    fn get_test_create_project() -> CreateProjectRequest;
    fn get_test_db_manager() -> CarrelDbManager;
    async fn get_seeded_db() -> CarrelDbManager;
    async fn get_project_manager_with_seeded_db() -> CarrelProjectManager;
}

#[cfg(test)]
mod test {
    use crate::project::db_manager::carrel_db_manager::CarrelDbManagerTrait;
    use crate::test_utils::carrel_tester::CarrelTester;
    use crate::test_utils::project_tester::ProjectTester;
    use carrel_db::entities::prelude::{Archive, Project};
    use sea_orm::EntityTrait;
    use std::path::PathBuf;

    #[tokio::test]
    async fn test_get_seeded_db() {
        let db_manager = CarrelTester::get_seeded_db().await;
        let connection = db_manager.get_connection().await;
        let project = Project::find_by_id(1)
            .one(&connection)
            .await
            .unwrap()
            .unwrap();
        assert_eq!(project.name, "seed_name");
        assert_eq!(project.description, "seed_description");

        let archive2 = Archive::find_by_id(2)
            .one(&connection)
            .await
            .unwrap()
            .unwrap();
        assert_eq!(archive2.name, "seed_archive_2");

        // clear the dr
        let db_path = PathBuf::from(db_manager.carrel_db_name.to_str().unwrap());
        let db_folder = db_path.parent().unwrap();

        let remove_result = std::fs::remove_dir_all(db_folder);
        // if the remove fails, it's probably because the db is still in use
        // so we'll just ignore it
        if let Err(e) = remove_result {
            println!("Error removing test db: {}", e);
        }
    }
}
