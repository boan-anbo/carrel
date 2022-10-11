//! Query for textual objects using SeaOrm_query
//!
//! # Notes
//!
//! Core entities in SeaOrm are Model and ActiveModel.
//!
//! Model is the read-only entity as the result of a query.
//!
//! ActiveModel is the read-write entity that can be used to insert and update.
//!
//! Model can be converted to ActiveModel using the `into_active_model` method.
//!
//! To use models, you can impl a trait to convert the Model AND ActiveModel to your own struct with something like
//!
//! ```
//! pub trait ToUtilFunc {//!
//!    fn into_your_entity(self) -> YourEntity;
//! }
//!
//! impl ToUtilFunc for your_db_entity::Model {
//!   fn into_your_entity(self) -> YourEntity {
//!         YourEntity {
//!             id: self.id,
//!             name: self.name
//!         }
//!     }
//! }
//!
//! impl ToUtilFunc for your_db_entity::ActiveModel {
//!  fn into_your_entity(self) -> YourEntity {
//!        YourEntity {
//!           id: self.id,
//!          name: self.name
//!       }
//!  }
//!
//! ```
//!
use async_trait::async_trait;
use carrel_commons::generic::api::query::v1::StandardQuery;
use entity::entities::textual_objects;
use entity::entities::textual_objects::{ActiveModel, Column, Model};
use pebble_query::errors::PebbleQueryError;
use pebble_query::pebble_query_result::PebbleQueryResult;
use sea_orm::{Database, DatabaseConnection, DbBackend, ModelTrait, Statement};
use std::io;
use thiserror::Error;
// use seaorm query trait
use sea_orm::{ActiveModelTrait, ColumnTrait, EntityTrait, PaginatorTrait, QueryFilter};
// use seaorm errors
use crate::to::to_struct::TextualObject;
use crate::to_db::to_query::{PebbleQueryTextualObject, PebbleQueryTextualObjectTrait};
use crate::to_db::util_trait::{IntoTextualObject, IntoTextualObjectOption, OrmEntityConverter};
use entity::entities::prelude::*;
use sea_orm::error::DbErr;
use sea_orm::sea_query::SimpleExpr;
use sqlx::encode::IsNull::No;
use uuid::Uuid;

#[derive(Debug, Error)]
pub enum ToOrmError {
    #[error("Database connection error: {0}")]
    DatabaseConnectionError(#[source] DbErr),
    //     DatabaseQueryError
    #[error("Database query error: {0}")]
    DatabaseQueryError(#[source] DbErr),
    // DatabaseDeleteError
    #[error("Database delete error: {0}")]
    DatabaseDeleteError(#[source] DbErr),
    // DatabaseInitError
    #[error("Database init error: {0}")]
    DatabaseInitError(#[source] DbErr),
    // DatabaseFileCreationError
    #[error("Database file creation error: {0}")]
    DatabaseFileCreationError(#[source] io::Error),
    // DatabaseFileAlreadyExistError
    #[error("Database file already exist error: {0}")]
    DatabaseFileAlreadyExistError(String),
    #[error("PebbleQueryError: {0}")]
    PebbleQueryError(#[from] PebbleQueryError),
}

#[derive(Debug, Clone)]
pub struct ToOrm {
    db_path: String,
}

impl ToOrm {
    pub fn new(db_path: &str) -> Self {
        // check if db_path is valid connection string, if not, add sqlite:// to it
        let db_path = if db_path.starts_with("sqlite://") {
            db_path.to_string()
        } else {
            format!("sqlite://{}", db_path)
        };
        ToOrm {
            db_path: String::from(db_path),
        }
    }

    pub fn temporary() -> Self {
        ToOrm {
            db_path: String::from(":memory:"),
        }
    }
}

#[async_trait]
pub trait QueryTo {
    async fn get_connection(&self) -> Result<DatabaseConnection, ToOrmError>;

    // insert
    async fn insert(&self, to: TextualObject) -> Result<TextualObject, ToOrmError>;

    async fn find_by_ticket_id(
        &self,
        ticket_id: &str,
    ) -> Result<Option<textual_objects::Model>, ToOrmError>;
    async fn count_tos(&self) -> Result<u64, ToOrmError>;
    async fn find_by_ticket_ids(
        &self,
        ticket_ids: Vec<String>,
    ) -> Result<Vec<textual_objects::Model>, ToOrmError>;
    async fn find(
        &self,
        find_condition: SimpleExpr,
    ) -> Result<Vec<textual_objects::Model>, ToOrmError>;
    async fn find_all(&self) -> Result<Vec<textual_objects::Model>, ToOrmError>;
    /// Query by the json field and value in the TO.json column.
    ///
    /// # Arguments
    ///
    /// * `json_field`:
    /// * `json_value`:
    ///
    /// returns: Result<Vec<textual_objects::Model>, ToOrmError>
    async fn find_by_json_field(
        &self,
        json_field: &str,
        json_value: &str,
    ) -> Result<Vec<textual_objects::Model>, ToOrmError>;

    /// Select the first TO with the given json field and value in the TO.json column.
    ///
    /// # Arguments
    ///
    /// * `json_field`:
    /// * `json_value`:
    ///
    /// returns: Result<Option<Model>, ToOrmError>
    ///
    /// # Examples
    ///
    /// ```
    ///
    /// ```
    async fn find_first_by_json_field(
        &self,
        json_field: &str,
        json_value: &str,
    ) -> Result<Option<textual_objects::Model>, ToOrmError>;

    /// A helper function to check whether the TO.json column contains the given json_field and json_value.
    ///
    /// Useful for example for checking whether a TO json has a unique field.
    ///
    /// # Arguments
    ///
    /// * `json_field`:
    /// * `json_value`:
    ///
    /// returns: Result<bool, ToOrmError>
    ///
    /// # Examples
    ///
    /// ```
    ///
    /// ```
    async fn find_any_by_json_value(
        &self,
        json_field: &str,
        json_value: &str,
    ) -> Result<bool, ToOrmError>;
    async fn insert_one(&self, to: TextualObject) -> Result<Uuid, ToOrmError>;
    async fn insert_many(&self, tos: Vec<TextualObject>) -> Result<(), ToOrmError>;

    // delete
    // delete_by_ticket_id
    async fn delete_by_ticket_id(&self, ticket_id: &str) -> Result<(), ToOrmError>;

    async fn clear(&self) -> Result<u64, ToOrmError>;

    // check_if_ticket_id_exists
    async fn check_if_ticket_id_exists(&self, ticket_id: &str) -> Result<bool, ToOrmError>;

    /// Main entry point for complex queries, takes in [StandardQuery] and returns [Vec<textual_objects::Model>]
    ///
    /// # Arguments
    ///
    /// * `query`: [StandardQuery](pebble_query::StandardQuery)
    ///
    /// returns: Result<PebbleQueryResult<Entity>, ToOrmError>
    ///
    /// # Examples
    ///
    /// ```
    ///
    /// ```
    async fn query_tos(
        &self,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<textual_objects::Entity>, ToOrmError>;
}

#[async_trait]
impl QueryTo for ToOrm {
    async fn get_connection(&self) -> Result<DatabaseConnection, ToOrmError> {
        let db = Database::connect(&self.db_path)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(db)
    }

    async fn insert(&self, to: TextualObject) -> Result<TextualObject, ToOrmError> {
        let db = self.get_connection().await?;
        let to = to.into_db_entity();
        let insert_result = to
            .insert(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)
            .unwrap();
        Ok(insert_result.into_textual_object())
    }

    async fn find_by_ticket_id(
        &self,
        ticket_id: &str,
    ) -> Result<Option<textual_objects::Model>, ToOrmError> {
        let db = self.get_connection().await?;
        let to_model = TextualObjects::find()
            .filter(Column::TicketId.eq(ticket_id))
            .one(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(to_model)
    }

    async fn count_tos(&self) -> Result<u64, ToOrmError> {
        let db = self.get_connection().await?;
        let count = TextualObjects::find()
            .count(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(count as u64)
    }

    async fn find_by_ticket_ids(
        &self,
        ticket_ids: Vec<String>,
    ) -> Result<Vec<textual_objects::Model>, ToOrmError> {
        let db = self.get_connection().await?;
        let files = TextualObjects::find()
            .filter(Column::TicketId.is_in(ticket_ids))
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(files)
    }

    async fn find(
        &self,
        find_condition: SimpleExpr,
    ) -> Result<Vec<textual_objects::Model>, ToOrmError> {
        let db = self.get_connection().await.unwrap();
        let files = TextualObjects::find()
            .filter(find_condition)
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn find_all(&self) -> Result<Vec<textual_objects::Model>, ToOrmError> {
        let db = self.get_connection().await?;
        let files = TextualObjects::find()
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn find_by_json_field(
        &self,
        json_field: &str,
        json_value: &str,
    ) -> Result<Vec<textual_objects::Model>, ToOrmError> {
        let db = self.get_connection().await.unwrap();

        let sql_statement =
            r#"SELECT * FROM textual_objects WHERE json_extract(textual_objects.json, $1) = $2"#;

        let field_value = "$.".to_string() + json_field;

        let files = TextualObjects::find()
            .from_raw_sql(Statement::from_sql_and_values(
                DbBackend::Sqlite,
                sql_statement,
                vec![field_value.into(), json_value.into()],
            ))
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn find_first_by_json_field(
        &self,
        json_field: &str,
        json_value: &str,
    ) -> Result<Option<Model>, ToOrmError> {
        let results = self.find_by_json_field(json_field, json_value).await?;
        Ok(results.into_iter().nth(0))
    }

    async fn find_any_by_json_value(
        &self,
        json_field: &str,
        json_value: &str,
    ) -> Result<bool, ToOrmError> {
        let first = self
            .find_first_by_json_field(json_field, json_value)
            .await?;
        Ok(first.is_some())
    }

    async fn insert_one(&self, to: TextualObject) -> Result<Uuid, ToOrmError> {
        let db = self.get_connection().await?;
        let to_model = to.into_db_entity();
        let result = to_model
            .insert(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(result.uuid.parse().unwrap())
    }

    async fn insert_many(&self, tos: Vec<TextualObject>) -> Result<(), ToOrmError> {
        let db = self.get_connection().await?;
        let models: Vec<ActiveModel> = tos.into_iter().map(|to| to.into_db_entity()).collect();
        let _ = TextualObjects::insert_many(models)
            .exec(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(())
    }

    async fn delete_by_ticket_id(&self, ticket_id: &str) -> Result<(), ToOrmError> {
        let to = self.find_by_ticket_id(ticket_id).await?;
        if let Some(to) = to {
            let db = self.get_connection().await?;
            let _ = to
                .delete(&db)
                .await
                .map_err(ToOrmError::DatabaseConnectionError)?;
        }
        Ok(())
    }

    async fn clear(&self) -> Result<u64, ToOrmError> {
        let db = self.get_connection().await?;

        let delete_result = TextualObjects::delete_many()
            .exec(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)?;
        Ok(delete_result.rows_affected)
    }

    async fn check_if_ticket_id_exists(&self, ticket_id: &str) -> Result<bool, ToOrmError> {
        let db = self.get_connection().await?;
        let count = TextualObjects::find()
            .filter(Column::TicketId.eq(ticket_id))
            .count(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(count > 0)
    }

    async fn query_tos(
        &self,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<textual_objects::Entity>, ToOrmError> {
        let db = self.get_connection().await?;
        let result = PebbleQueryTextualObject::query_textual_objects(&db, query).await?;

        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use carrel_utils::uuid::new_v4;

    fn get_to_orm() -> ToOrm {
        dotenv::dotenv().ok();
        let db_path = std::env::var("DATABASE_URL").unwrap();
        let query = ToOrm::new(&db_path);
        query
    }

    #[tokio::test]
    async fn test_find_by_ticket_id() {
        let first_to = get_to_orm().find_by_ticket_id("ticket_id1").await.unwrap();
        assert_eq!(first_to.is_some(), true);
        assert_eq!(first_to.unwrap().ticket_id, "ticket_id1");
    }

    #[tokio::test]
    async fn test_count_tos() {
        let count = get_to_orm().count_tos().await.unwrap();
        assert_eq!(count, 3);
    }

    #[tokio::test]
    async fn test_find_by_ticket_ids() {
        let tos = get_to_orm()
            .find_by_ticket_ids(vec!["ticket_id1".to_string(), "ticket_id2".to_string()])
            .await
            .unwrap();
        assert_eq!(tos.len(), 2);
        assert_eq!(tos[0].ticket_id, "ticket_id1");
        assert_eq!(tos[1].ticket_id, "ticket_id2");
    }

    #[tokio::test]
    async fn test_find_by_json_field() {
        let tos_one_result = get_to_orm()
            .find_by_json_field("file_full_name", "chn.pdf")
            .await
            .unwrap();
        assert_eq!(tos_one_result.len(), 1);
        assert_eq!(tos_one_result[0].ticket_id, "ticket_id1");

        let find_first_by_json_field = get_to_orm()
            .find_first_by_json_field("file_full_name", "chn.pdf")
            .await
            .unwrap();

        assert_eq!(find_first_by_json_field.is_some(), true);

        let find_any_one_result = get_to_orm()
            .find_any_by_json_value("file_full_name", "chn.pdf")
            .await
            .unwrap();
        assert_eq!(find_any_one_result, true);

        let tos_exact_no_result = get_to_orm()
            .find_by_json_field("file_full_name", "chn")
            .await
            .unwrap();
        assert_eq!(tos_exact_no_result.len(), 0);

        let find_first_no_result = get_to_orm()
            .find_first_by_json_field("file_full_name", "chn")
            .await
            .unwrap();
        assert_eq!(find_first_no_result.is_some(), false);

        let find_any_no_result = get_to_orm()
            .find_any_by_json_value("file_full_name", "chn")
            .await
            .unwrap();
        assert_eq!(find_any_no_result, false);

        // query non existing field
        let tos_non_existing_field = get_to_orm()
            .find_by_json_field(new_v4().to_string().as_str(), "chn")
            .await
            .unwrap();

        let find_first_non_existing_field = get_to_orm()
            .find_first_by_json_field(new_v4().to_string().as_str(), "chn")
            .await
            .unwrap();
        assert_eq!(find_first_non_existing_field.is_some(), false);

        let find_any_non_existing_field = get_to_orm()
            .find_any_by_json_value(new_v4().to_string().as_str(), "chn")
            .await
            .unwrap();
        assert_eq!(find_any_non_existing_field, false);

        assert_eq!(tos_non_existing_field.len(), 0);

        // query non existing value
        let tos_non_existing_value = get_to_orm()
            .find_by_json_field("file_full_name", new_v4().to_string().as_str())
            .await
            .unwrap();
        assert_eq!(tos_non_existing_value.len(), 0);
    }
}
