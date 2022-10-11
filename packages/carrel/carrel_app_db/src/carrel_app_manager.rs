use std::path::PathBuf;
use async_trait::async_trait;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use sea_orm::{ActiveModelTrait, DatabaseConnection, DbErr, QueryFilter, ColumnTrait, EntityTrait, InsertResult, IntoActiveModel, QueryOrder, QuerySelect};
use sea_orm::ActiveValue::Set;
use thiserror::Error;
use migration::{Migrator, MigratorTrait};
use entity::generated::prelude::*;
use entity::generated::app_project;
use entity::generated::app_project::{ActiveModel, Entity, Model};

const DEFAULT_APP_DB_NAME: &str = "carrel_app.db";

#[derive(Debug, Error)]
pub enum CarrelAppError {
    #[error("CarrelAppInitError: {0}")]
    CarrelAppInitError(String),
    #[error("CarrelAppDbConnectionError: {0}")]
    CarrelAppDbConnectionError(#[source] DbErr),
    #[error("CarrelAppMigrationError: {0}")]
    CarrelAppMigrationError(#[source] DbErr),
    #[error("CarrelAppDbQueryError: {0}")]
    CarrelAppDbQueryError(#[source] DbErr),
}


pub struct CarrelAppDbManager {
    pub app_directory: PathBuf,
    pub app_db_name: String,
    pub app_db_full_path: PathBuf,

}


#[async_trait]
pub trait ManageCarrelAppDb {
    async fn load(app_directory: &str) -> Result<CarrelAppDbManager, CarrelAppError>;
    async fn init_db(&self) -> Result<(), CarrelAppError>;
    async fn connect(&self) -> Result<DatabaseConnection, CarrelAppError>;
    async fn check_db_health(&self) -> Result<(), CarrelAppError>;
}

#[async_trait]
impl ManageCarrelAppDb for CarrelAppDbManager {
    async fn load(app_directory_str: &str) -> Result<CarrelAppDbManager, CarrelAppError> {
        let app_directory = PathBuf::from(app_directory_str);

        // check if the app_directory exists as a directory, if not throw an error
        if !app_directory.is_dir() {
            let app_directory_str = app_directory.to_str().unwrap();
            return Err(
                CarrelAppError::CarrelAppInitError(
                    format!("The app directory does not exist: {}", app_directory_str
                    )
                )
            );
        }

        let app_db_full_path = app_directory.join(DEFAULT_APP_DB_NAME);
        let app_manager = CarrelAppDbManager {
            app_directory,
            app_db_name: DEFAULT_APP_DB_NAME.to_string(),
            app_db_full_path,
        };

        let _ = app_manager.connect().await;

        app_manager.init_db().await?;

        app_manager.check_db_health().await?;

        Ok(app_manager)
    }
    async fn init_db(&self) -> Result<(), CarrelAppError> {
        let db = self.connect().await?;

        // apply all migrations if any upcoming
        let migrator = Migrator::up(&db, None).await;

        match migrator {
            Ok(_) => Ok(()),
            Err(e) => Err(CarrelAppError::CarrelAppMigrationError(e)),
        }
    }

    async fn connect(&self) -> Result<DatabaseConnection, CarrelAppError> {
        let db_path = &self.app_db_full_path;
        let db_path_str = db_path.to_str().unwrap();
        let sqlite_db_path_str = format!("sqlite://{}{}", db_path_str, "?mode=rwc");
        let db_connection = sea_orm::Database::connect(sqlite_db_path_str).await.map_err(
            CarrelAppError::CarrelAppDbConnectionError
        ).unwrap();

        Ok(db_connection)
    }


    async fn check_db_health(&self) -> Result<(), CarrelAppError> {
        let db = self.connect().await?;
        let result = Migrator::status(&db)
            .await;

        match result {
            Ok(_) => Ok(()),
            Err(err) => Err(CarrelAppError::CarrelAppMigrationError(err)),
        }
    }
}

#[async_trait]
pub trait ManageProjectList {
    async fn get_all_projects(&self) -> Result<Vec<app_project::Model>, CarrelAppError>;
    // if the project has the same uuid, it will be updated
    // if the project has a new uuid, it will be inserted
    async fn save_app_project(&self, project: app_project::ActiveModel) -> Result<app_project::Model, CarrelAppError>;
    async fn get_most_recent_app_project(&self) -> Result<app_project::Model, CarrelAppError>;
    // list a number of most recent project in reverse order
    async fn list_most_recent_app_projects(&self, number: i32) -> Result<Vec<app_project::Model>, CarrelAppError>;
    // this will modify the project's last_used_at field
    async fn open_and_use_app_project_by_uuid(&self, uuid: &str) -> Result<app_project::Model, CarrelAppError>;

    // return -1 for project id if the project is not found
    async fn get_app_project_id_by_uuid(&self, uuid: &str) -> Result<i32, CarrelAppError>;
    async fn get_app_project_by_id(&self, id: i32) -> Result<app_project::Model, CarrelAppError>;
}

#[async_trait]
impl ManageProjectList for CarrelAppDbManager {
    async fn get_all_projects(&self) -> Result<Vec<app_project::Model>, CarrelAppError> {
        let db = self.connect().await?;
        let project_list = app_project::Entity::find()
            .all(&db)
            .await
            .map_err(CarrelAppError::CarrelAppDbQueryError)?;

        Ok(project_list)
    }

    async fn save_app_project(&self, project: ActiveModel) -> Result<app_project::Model, CarrelAppError> {
        let mut project = project;

        let db = self.connect().await?;

        let project_uuid = project.uuid.clone().unwrap();

        // check if any project with the same uuid already exists
        // if it's -1, it means the project is new, otherwise it's an existing project
        let project_id = self.get_app_project_id_by_uuid(project_uuid.as_str()).await?;

        // update all fields that need to be updated for both update or insert
        project.last_used_at = Set(Some(get_now_iso_string()));

        let result: Model;

        // it's update if the project_id is not -1
        if project_id > -1 {
            project.id = Set(project_id);
            // assign the project id to the project

            result = Entity::update(
                project
            ).exec(&db)
                .await
                .map_err(CarrelAppError::CarrelAppDbQueryError)?;
        } else {
            // update project's created_at field
            project.created_at = Set(get_now_iso_string());
            let insert_result = Entity::insert(
                project
            ).exec(&db)
                .await
                .map_err(CarrelAppError::CarrelAppDbQueryError)?;
            result = self.get_app_project_by_id(insert_result.last_insert_id).await?;
        }

        Ok(result)
    }


    async fn get_most_recent_app_project(&self) -> Result<app_project::Model, CarrelAppError> {
        let db = self.connect().await?;
        let project_list = app_project::Entity::find()
            .order_by_desc(app_project::Column::LastUsedAt)
            .one(&db)
            .await
            .map_err(CarrelAppError::CarrelAppDbQueryError)?;

        let project_list = project_list.unwrap();

        // turn it into a active model and update the last used at before returning it
        let mut project = project_list.into_active_model();
        project.last_used_at = Set(Some(get_now_iso_string()));

        let result = self.save_app_project(project).await?;

        Ok(result)
    }

    async fn list_most_recent_app_projects(&self, number: i32) -> Result<Vec<Model>, CarrelAppError> {
        let db = self.connect().await?;
        let project_list = app_project::Entity::find()
            .order_by_desc(app_project::Column::LastUsedAt)
            .limit(number as u64)
            .all(&db)
            .await
            .map_err(CarrelAppError::CarrelAppDbQueryError)?;

        Ok(project_list)
    }

    async fn open_and_use_app_project_by_uuid(&self, uuid: &str) -> Result<app_project::Model, CarrelAppError> {
        let db = self.connect().await?;
        let project_list = app_project::Entity::find()
            .filter(app_project::Column::Uuid.eq(uuid))
            .one(&db)
            .await
            .map_err(CarrelAppError::CarrelAppDbQueryError)?;

        let project_list = project_list.unwrap();

        // turn it into a active model and update the last used at before returning it
        let mut project = project_list.into_active_model();
        project.last_used_at = Set(Some(get_now_iso_string()));

        let result = self.save_app_project(project).await?;

        Ok(result)
    }

    async fn get_app_project_id_by_uuid(&self, uuid: &str) -> Result<i32, CarrelAppError> {
        let db = self.connect().await?;
        let project_with_uuid = app_project::Entity::find()
            .filter(app_project::Column::Uuid.eq(uuid))
            .one(&db)
            .await
            .map_err(CarrelAppError::CarrelAppDbQueryError)?;

        match project_with_uuid {
            Some(project) => Ok(project.id),
            None => Ok(-1),
        }
    }

    async fn get_app_project_by_id(&self, id: i32) -> Result<app_project::Model, CarrelAppError> {
        let db = self.connect().await?;
        let project_list = app_project::Entity::find()
            .filter(app_project::Column::Id.eq(id))
            .one(&db)
            .await
            .map_err(CarrelAppError::CarrelAppDbQueryError)?;

        let project_list = project_list.unwrap();

        Ok(project_list)
    }
}

#[cfg(test)]
mod tests {
    use carrel_utils::datetime::get_iso_string::get_now_iso_string;
    use carrel_utils::fake::Fake;
    use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;
    use carrel_utils::uuid::new_v4;
    use sea_orm::ActiveValue::Set;
    use sea_orm::{IntoActiveModel, NotSet};
    use migration::ColumnSpec::Default;
    use super::*;

    fn get_random_new_project() -> ActiveModel {
        app_project::ActiveModel {
            uuid: Set(new_v4().to_string()),
            name: Set(carrel_utils::fake::faker::name::en::NameWithTitle().fake()),
            description: Set("".to_string()),
            project_directory: Set("".to_string()),
            last_used_at: NotSet,
            deadline_at: NotSet,
            next_meeting_at: NotSet,
            created_at: Set(get_now_iso_string()),
            total_files: Set(0),
            total_fireflies: Set(0),
            total_text_documents: Set(0),
            importance: Set(0),
            task_state: Set(0),
            is_favorite: Set(false as i32),
            is_missing: Set(false as i32),
            is_hidden: Set(false as i32),
            is_archived: Set(false as i32),
            id: NotSet,
        }
    }

    #[tokio::test]
    async fn test_load() {
        // get random test folder
        let random_test_folder = get_random_test_temp_folder_path_buf();

        // load the app manager
        let initial_app_manager = CarrelAppDbManager::load(random_test_folder.to_str().unwrap()).await.unwrap();

        // // check if db exists at the path
        // let db_path = random_test_folder.join(DEFAULT_APP_DB_NAME);
        // assert!(db_path.exists());
        //
        let app_manager = CarrelAppDbManager::load(
            random_test_folder.to_str().unwrap()
        ).await.unwrap();
        //
        let all_projects = app_manager.get_all_projects().await.unwrap();
        //
        // // one seed project should be present
        assert_eq!(all_projects.len(), 1);

        let mut first_project_active_model = all_projects.first().unwrap().clone().into_active_model();

        let random_name = new_v4().to_string();
        first_project_active_model.name = Set(random_name.clone());

        let updated_project = app_manager.save_app_project(first_project_active_model).await.unwrap();

        let first_project_after_update = app_manager.get_all_projects().await.unwrap().first().unwrap().clone();

        assert_eq!(first_project_after_update.name, random_name);

        // insert new

        let new_project = get_random_new_project();
        let new_project_title = new_project.name.clone().unwrap().to_string();
        let saved_project = app_manager.save_app_project(new_project).await.unwrap();

        assert_eq!(saved_project.id, 2);

        let all_projects_after_insert = app_manager.get_all_projects().await.unwrap();

        assert_eq!(all_projects_after_insert.len(), 2);

        let saved_project_after_insert = all_projects_after_insert.last().unwrap();

        assert_eq!(saved_project_after_insert.name, new_project_title);
    }

    #[tokio::test]
    async fn test_get_most_recent_project() {
        // get random test folder
        let random_test_folder = get_random_test_temp_folder_path_buf();

        // load the app manager
        let initial_app_manager = CarrelAppDbManager::load(random_test_folder.to_str().unwrap()).await.unwrap();

        // get first project
        let first_project = initial_app_manager.get_most_recent_app_project().await.unwrap();
        let first_project_uuid = first_project.uuid.clone();

        let first_project_last_used_at = first_project.last_used_at.clone();

        // get most recent project
        let most_recent_project = initial_app_manager.get_most_recent_app_project().await.unwrap();

        // check if the last used at is updated
        assert_ne!(first_project_last_used_at, most_recent_project.last_used_at);

        // should have id 1
        assert_eq!(most_recent_project.id, 1);

        // insert a second project

        let new_project_name = new_v4().to_string();

        let saved_project = initial_app_manager.save_app_project(get_random_new_project()).await.unwrap();

        let most_recent_after_second_insert = initial_app_manager.get_most_recent_app_project().await.unwrap();

        // should have id 1
        assert_eq!(most_recent_after_second_insert.id, 2);
        let second_project_uuid = most_recent_after_second_insert.uuid.clone();

        // open 1st project again
        let first_project_again = initial_app_manager.open_and_use_app_project_by_uuid(first_project_uuid.as_str()).await.unwrap();

        // should have id 1
        assert_eq!(first_project_again.id, 1);

        // get most recent project
        let most_recent_after_opening_first_project_again = initial_app_manager.get_most_recent_app_project().await.unwrap();

        // should have id 1
        assert_eq!(most_recent_after_opening_first_project_again.id, 1);

        // open 2nd project again
        let second_project_again = initial_app_manager.open_and_use_app_project_by_uuid(second_project_uuid.as_str()).await.unwrap();

        // should have id 2
        assert_eq!(second_project_again.id, 2);

        // get most recent project
        let most_recent_after_opening_second_project_again = initial_app_manager.get_most_recent_app_project().await.unwrap();

        // should have id 2
        assert_eq!(most_recent_after_opening_second_project_again.id, 2);
    }
}

