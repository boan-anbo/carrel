use async_trait::async_trait;
use carrel_commons::carrel::core::project_manager::v1::CreateProjectRequest;
use carrel_db::db::connect::get_connection;
use carrel_db::entities::prelude::Project;
use carrel_db::errors::database_error::SeaOrmDatabaseError;
use carrel_db::entities::project;
use sea_orm::{ActiveModelTrait, EntityTrait, ModelTrait};
use crate::project::db_manager::carrel_db_manager::CarrelDbManager;

// do the same for project
#[async_trait]
pub trait MangageProjects {
    async fn add_project(&self, add_project: CreateProjectRequest) -> Result<i32, SeaOrmDatabaseError>;
    async fn remove_project(&self, project_id: &i32) -> Result<(), SeaOrmDatabaseError>;
    async fn get_project(&self, project_id: &i32) -> Result<project::Model, SeaOrmDatabaseError>;
}


#[async_trait]
impl MangageProjects for CarrelDbManager {
    async fn add_project(&self, add_project: CreateProjectRequest) -> Result<i32, SeaOrmDatabaseError> {

        let project_model = project::ActiveModel::from(add_project);
        let db = get_connection(self.carrel_db_full_path.to_str().unwrap()).await?;
        let created_project = project_model.insert(&db).await.map_err(SeaOrmDatabaseError::DatabaseInsertError)?;
        Ok(created_project.id)

    }
    async fn remove_project(&self, project_id: &i32) -> Result<(), SeaOrmDatabaseError> {
        let db = get_connection(self.carrel_db_full_path.to_str().unwrap()).await?;
        let project = Project::find_by_id(*project_id).one(&db).await.map_err(SeaOrmDatabaseError::DatabaseDeleteError).unwrap().unwrap();
        project.delete(&db).await.map_err(SeaOrmDatabaseError::DatabaseDeleteError)?;
        Ok(())
    }

    async fn get_project(&self, project_id: &i32) -> Result<project::Model, SeaOrmDatabaseError> {
        let db = get_connection(self.carrel_db_full_path.to_str().unwrap()).await?;
        let project = Project::find_by_id(*project_id).one(&db).await.map_err(SeaOrmDatabaseError::DatabaseQueryError).unwrap().unwrap();
        Ok(project)
    }
}

#[cfg(test)]
mod tests {


}
