use async_trait::async_trait;
use sea_orm::{DbErr, EntityTrait, QueryFilter, ColumnTrait, IntoActiveModel};
use sea_orm::prelude::Uuid;
use entity::generated::prelude::Task;
use crate::carrel_app_manager::{CarrelAppDbManager, ManageCarrelAppDb};
use sea_orm::ActiveModelTrait;
use sea_orm::ActiveValue::Set;
use entity::generated::task;
use entity::generated::task::Model;
use carrel_commons::carrel::core::project_manager::v1::TaskState;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum TaskError {
    #[error("Duplicate not allowed for task with identifier {0}")]
    MultipleTaskNotAllowed(String),
}

#[async_trait]
pub trait CarrelTaskTrait {
    async fn add_task(&self, identifier: &str, description: &str, commissioner: &str, allow_multiple: bool) -> Result<Uuid, TaskError>;

    async fn has_task_by_identifier(&self, identifier: &str) -> bool;

    async fn has_task_by_uuid(&self, uuid: String) -> bool;

    async fn get_task_by_uuid(&self, uuid: String) -> Option<task::Model>;

    async fn get_task_by_identifier(&self, identifier: &str) -> Option<task::Model>;

    async fn update_task_progress(&self, uuid: String, progress: i32, message: Option<String>) -> Result<task::Model, DbErr>;

    async fn delete_task(&self, uuid: String) -> Result<(), DbErr>;

    async fn mark_task_as_completed(&self, uuid: String, message: Option<String>) -> Result<task::Model, DbErr>;

    async fn start_task(&self, uuid: String, message: Option<String>) -> Result<task::Model, DbErr>;

    async fn stop_task(&self, uuid: String, message: Option<String>) -> Result<task::Model, DbErr>;

    async fn does_identifier_allow_multiple(&self, identifier: &str) -> bool;

    async fn clear_all_tasks(&self) -> Result<(), DbErr>;

    async fn clear_all_tasks_by_identifier(&self, identifier: &str) -> Result<(), DbErr>;
}

#[async_trait]
impl CarrelTaskTrait for CarrelAppDbManager {
    async fn add_task(&self, identifier: &str, description: &str, commissioner: &str, allow_multiple: bool) -> Result<Uuid, TaskError> {
        let db = self.connect().await.unwrap();

        // check if the identifier allows multiple tasks
        if !self.does_identifier_allow_multiple(identifier).await {
            // check if there is already a task with the same identifier
            // get the other past task
            let task_with_same_identifier = self.get_task_by_identifier(identifier).await;
            if let Some(task) = task_with_same_identifier {
                // check if the task is completed
                if task.state != i32::from(TaskState::Finished) {
                    return Err(TaskError::MultipleTaskNotAllowed(identifier.to_string()));
                }
            }
        }

        let task = Task::new_active_model(identifier, description, commissioner, allow_multiple);
        let uuid = task.uuid.clone();
        let _ = task.insert(&db).await.expect(
            "Failed to insert task"
        );


        Ok(Uuid::parse_str(uuid.unwrap().as_str()).unwrap())
    }


    async fn has_task_by_identifier(&self, identifier: &str) -> bool {
        let db = self.connect().await.unwrap();
        let task = Task::find().filter(
            <Task as EntityTrait>::Column::Identifier.eq(identifier)
        ).one(&db).await.unwrap();
        match task {
            Some(_) => true,
            None => false
        }
    }

    async fn has_task_by_uuid(&self, uuid: String) -> bool {
        let db = self.connect().await.unwrap();
        let task = Task::find().filter(
            <Task as EntityTrait>::Column::Uuid.eq(uuid)
        ).one(&db).await.unwrap();
        match task {
            Some(_) => true,
            None => false
        }
    }

    async fn get_task_by_uuid(&self, uuid: String) -> Option<task::Model> {
        let db = self.connect().await.unwrap();
        let task = Task::find().filter(
            <Task as EntityTrait>::Column::Uuid.eq(uuid)
        ).one(&db).await.unwrap();
        task
    }

    async fn get_task_by_identifier(&self, identifier: &str) -> Option<Model> {
        let db = self.connect().await.unwrap();
        let task = Task::find().filter(
            <Task as EntityTrait>::Column::Identifier.eq(identifier)
        ).one(&db).await.unwrap();
        task
    }

    async fn update_task_progress(&self, uuid: String, progress: i32, message: Option<String>) -> Result<task::Model, DbErr> {
        let db = self.connect().await.unwrap();
        let task = self.get_task_by_uuid(uuid).await.unwrap();
        let mut active_task = task.into_active_model();
        active_task.progress = Set(progress);
        active_task.updated_at = Set(get_now_iso_string());
        if let Some(message) = message {
            active_task.last_message = Set(message);
        }
        let updated_task = active_task.update(&db).await.expect("Failed to update task");
        Ok(updated_task)
    }

    async fn delete_task(&self, uuid: String) -> Result<(), DbErr> {
        let db = self.connect().await.unwrap();
        let task = self.get_task_by_uuid(uuid).await.unwrap();
        let active_task = task.into_active_model();
        active_task.delete(&db).await?;
        Ok(())
    }

    async fn mark_task_as_completed(&self, uuid: String, message: Option<String>) -> Result<Model, DbErr> {
        let db = self.connect().await.unwrap();
        let task = self.get_task_by_uuid(uuid).await.unwrap();
        let mut active_task = task.into_active_model();
        active_task.state = Set(TaskState::Finished as i32);
        active_task.updated_at = Set(get_now_iso_string());
        if let Some(message) = message {
            active_task.last_message = Set(message);
        }
        let updated_task = active_task.update(&db).await.expect("Failed to update task");
        Ok(updated_task)
    }

    async fn start_task(&self, uuid: String, message: Option<String>) -> Result<Model, DbErr> {
        let db = self.connect().await.unwrap();
        let task = self.get_task_by_uuid(uuid).await.unwrap();
        let mut active_task = task.into_active_model();
        active_task.state = Set(TaskState::Running as i32);
        active_task.updated_at = Set(get_now_iso_string());
        if let Some(message) = message {
            active_task.last_message = Set(message);
        }
        let updated_task = active_task.update(&db).await.expect("Failed to update task");
        Ok(updated_task)
    }

    async fn stop_task(&self, uuid: String, message: Option<String>) -> Result<Model, DbErr> {
        let db = self.connect().await.unwrap();
        let task = self.get_task_by_uuid(uuid).await.unwrap();
        let mut active_task = task.into_active_model();
        active_task.state = Set(TaskState::Paused as i32);
        active_task.updated_at = Set(get_now_iso_string());
        if let Some(message) = message {
            active_task.last_message = Set(message);
        }
        let updated_task = active_task.update(&db).await.expect("Failed to update task");
        Ok(updated_task)
    }

    async fn does_identifier_allow_multiple(&self, identifier: &str) -> bool {
        let db = self.connect().await.unwrap();
        let task = Task::find().filter(
            <Task as EntityTrait>::Column::Identifier.eq(identifier)
        ).one(&db).await.unwrap();
        match task {
            Some(task) => task.allow_multiple == 1,
            None => false
        }
    }

    async fn clear_all_tasks(&self) -> Result<(), DbErr> {
        let db = self.connect().await.unwrap();
        let tasks = Task::find().all(&db).await?;
        for task in tasks {
            let active_task = task.into_active_model();
            active_task.delete(&db).await?;
        }
        Ok(())
    }

    async fn clear_all_tasks_by_identifier(&self, identifier: &str) -> Result<(), DbErr> {
        let db = self.connect().await.unwrap();
        let tasks = Task::find().filter(
            <Task as EntityTrait>::Column::Identifier.eq(identifier)
        ).all(&db).await?;
        for task in tasks {
            let active_task = task.into_active_model();
            active_task.delete(&db).await?;
        }
        Ok(())
    }
}


#[cfg(test)]
mod tests {
    use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;
    use super::*;


    async fn get_random_manager() -> CarrelAppDbManager {
        // get random test folder
        let random_test_folder = get_random_test_temp_folder_path_buf();

        // load the app manager
        let initial_app_manager = CarrelAppDbManager::load(random_test_folder.to_str().unwrap()).await.unwrap();
        initial_app_manager
    }

    #[tokio::test]
    async fn test_add_task() {
        let dm = get_random_manager().await;
        let uuid = dm.add_task("test", "test", "job_assigner", false).await.unwrap();
        // create dulplicate should panic
        let duplicate_not_allowed = dm.add_task("test", "test", "job_assigner", false).await.is_err();
        assert!(duplicate_not_allowed);
        let find_all = Task::find().all(&dm.connect().await.unwrap()).await.unwrap();
        assert_eq!(find_all.len(), 1);
        assert_eq!(find_all[0].identifier, "test");
        // has task
        assert_eq!(dm.has_task_by_identifier("test").await, true);
        // check initial progress
        assert_eq!(find_all[0].progress, 0);
        // update progress
        let updated_task = dm.update_task_progress(uuid.to_string(), 50, None).await.unwrap();
        assert_eq!(updated_task.progress, 50);
        // check if task exists
        // start
        let started_task = dm.start_task(uuid.to_string(), None).await.unwrap();
        assert_eq!(started_task.state, TaskState::Running as i32);

        // stop
        let stopped_task = dm.stop_task(uuid.to_string(), None).await.unwrap();
        assert_eq!(stopped_task.state, TaskState::Paused as i32);

        // mark as completed
        let completed_task = dm.mark_task_as_completed(uuid.to_string(), None).await.unwrap();
        assert_eq!(completed_task.state, TaskState::Finished as i32);

        // delete task
        dm.delete_task(uuid.to_string()).await.unwrap();
        assert_eq!(dm.has_task_by_identifier("test").await, false);
    }
}