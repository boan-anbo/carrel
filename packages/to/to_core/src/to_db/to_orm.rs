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
use std::io;

use async_trait::async_trait;
use carrel_commons::carrel::common::tag::v2::Tag as CommonTagV2;
use carrel_commons::generic::api::query::v1::{FilterSet, Operator, StandardQuery};
use carrel_commons::generic::api::query::v1::Condition as GenericCondition;
use entity::entities::{tag, textual_object};
use entity::entities::prelude::*;
use entity::entities::textual_object::{ActiveModel, Column, Entity, Model};
use pebble_query::errors::PebbleQueryError;
use pebble_query::pebble_query_result::{PebbleQueryResult, PebbleQueryResultGeneric, PebbleQueryResultUtilTrait};
use sea_orm::{Database, DatabaseConnection, DbBackend, FromQueryResult, ModelTrait, Statement};
// use seaorm query trait
use sea_orm::{ActiveModelTrait, ColumnTrait, EntityTrait, PaginatorTrait, QueryFilter};
use sea_orm::error::DbErr;
use sea_orm::sea_query::SimpleExpr;
use thiserror::Error;
use uuid::Uuid;

// use seaorm errors
use crate::to::to_struct::TextualObject;
use crate::to_db::to_query::{PebbleQueryTextualObject, PebbleQueryTextualObjectTrait};
use crate::to_db::util_trait::{ToOrmMapper, ToOrmMapperTrait};
use crate::to_tag::to_tag_key_group::KeyGroups;
use crate::to_tag::to_tag_struct::ToTag;

#[derive(Debug, Error)]
pub enum ToOrmError {
    #[error("Database connection error: {0}")]
    DatabaseConnectionError(#[source] DbErr),
    //     DatabaseQueryError
    #[error("Database query error: {0}")]
    DatabaseQueryError(#[source] DbErr),
    #[error("Database insert error: {0}")]
    DatabaseInsertError(#[source] DbErr),
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
    /// Helper function to convert the query results of scalar to with its tags.
    pub(crate) async fn add_tags_to_to_result(&self, pebble_tag_query_result: PebbleQueryResult<textual_object::Entity>) -> PebbleQueryResultGeneric<TextualObject> {
        let mut new_tos: Vec<TextualObject> = vec![];

        for to in pebble_tag_query_result.results.into_iter() {
            let tags = self.get_tags_by_to(to.clone()).await;
            let to = ToOrmMapper::to_and_tag_model_to_to_and_tag(to, tags);
            new_tos.push(to);
        }

        PebbleQueryResultGeneric {
            results: new_tos,
            metadata: pebble_tag_query_result.metadata,
        }
    }

    pub async fn get_tags_by_to(&self, to: Model) -> Vec<tag::Model> {
        let db = self.get_connection().await.unwrap();
        let mut tags: Vec<tag::Model> = vec![];
        let to_tags = to.find_related(tag::Entity).all(&db).await.map_err(ToOrmError::DatabaseQueryError).unwrap();
        tags.extend(to_tags);
        tags
    }
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
pub trait ToOrmTrait {
    async fn get_connection(&self) -> Result<DatabaseConnection, ToOrmError>;

    ///
    ///
    /// # Arguments
    ///
    /// * `to`:
    /// * `to_tags`:
    ///
    /// returns: Result<i32, ToOrmError>: id of the last inserted, or error
    ///
    ///
    /// # Examples
    ///
    /// ```
    ///
    /// ```
    async fn insert_to(&self, to: TextualObject, to_tags: Vec<ToTag>) -> Result<i32, ToOrmError>;

    async fn find_by_id(&self, id: i32) -> Result<Option<TextualObject>, ToOrmError>;


    async fn find_by_ticket_id(
        &self,
        ticket_id: &str,
    ) -> Result<Option<textual_object::Model>, ToOrmError>;

    async fn count_tos(&self) -> Result<u64, ToOrmError>;

    async fn find_by_ticket_ids(
        &self,
        ticket_ids: Vec<String>,
    ) -> Result<Vec<textual_object::Model>, ToOrmError>;
    async fn find(
        &self,
        find_condition: SimpleExpr,
    ) -> Result<Vec<textual_object::Model>, ToOrmError>;
    async fn find_all(&self) -> Result<Vec<textual_object::Model>, ToOrmError>;
    /// Query by the json field and value in the TO.json column.
    ///
    /// # Arguments
    ///
    /// * `json_field`:
    /// * `json_value`:
    ///
    /// returns: Result<Vec<textual_object::Model>, ToOrmError>
    async fn find_by_json_field(
        &self,
        json_field: &str,
        json_value: &str,
    ) -> Result<Vec<textual_object::Model>, ToOrmError>;

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
    ) -> Result<Option<textual_object::Model>, ToOrmError>;

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

    /// Main entry point for complex queries, takes in [StandardQuery] and returns [Vec<textual_object::Model>]
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
    ) -> Result<PebbleQueryResultGeneric<TextualObject>, ToOrmError>;

    async fn query_tos_by_uuids(&self, mut query: StandardQuery, uuids: Vec<String>) -> Result<PebbleQueryResultGeneric<TextualObject>, ToOrmError>;

    async fn query_tags(
        &self,
        query: StandardQuery,
    ) -> Result<PebbleQueryResultGeneric<ToTag>, ToOrmError>;

    // insert tags belonging to a TO
    async fn insert_to_tags(&self, tags: Vec<CommonTagV2>, to_id: i32) -> Result<(), ToOrmError>;

    // find to by tag uuid
    async fn find_by_tag_uuid(&self, tag_uuid: Uuid) -> Result<Option<TextualObject>, ToOrmError>;

    // list all tags with distinct key groups
    async fn list_tags_group_by_key(&self) -> Result<Vec<KeyGroups>, ToOrmError>;

    // get tags by key
    async fn find_tags_by_key(&self, key: &str) -> Result<Vec<ToTag>, ToOrmError>;

    // get tags by key and value
    async fn find_tags_by_key_and_value(&self, key: String, value: String) -> Result<Vec<ToTag>, ToOrmError>;
}

#[async_trait]
impl ToOrmTrait for ToOrm {
    async fn get_connection(&self) -> Result<DatabaseConnection, ToOrmError> {
        let db = Database::connect(&self.db_path)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(db)
    }

    /// Insert a TO and its tags into the database.
    async fn insert_to(&self, to: TextualObject, to_tags: Vec<ToTag>) -> Result<i32, ToOrmError> {
        let db = self.get_connection().await?;
        let to = ToOrmMapper::to_into_active_model(to);
        /// insert to first.
        let insert_result = to
            .insert(&db)
            .await
            .map_err(ToOrmError::DatabaseInsertError)
            .unwrap();

        let to_uuid: Uuid = Uuid::parse_str(&insert_result.uuid).unwrap();

        // if there are related tags, insert them with alongside the TO
        if !to_tags.is_empty() {
            let tags = ToOrmMapper::to_tags_into_active_models(to_tags, insert_result.id, to_uuid);

            let _ = tag::Entity::insert_many(tags)
                .exec(&db)
                .await
                .map_err(ToOrmError::DatabaseInsertError)
                .unwrap();
        }

        // insert tags


        Ok(insert_result.id)
    }

    async fn find_by_id(&self, id: i32) -> Result<Option<TextualObject>, ToOrmError> {
        let db = self.get_connection().await?;

        let to = textual_object::Entity::find_by_id(id)
            .one(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)?;
        if to.is_none() {
            return Ok(None);
        }
        let to = to.unwrap();
        let tags = self.get_tags_by_to(to.clone()).await;

        let to = ToOrmMapper::to_and_tag_model_to_to_and_tag(to, tags);
        Ok(Some(to))
    }


    async fn find_by_ticket_id(
        &self,
        ticket_id: &str,
    ) -> Result<Option<textual_object::Model>, ToOrmError> {
        let db = self.get_connection().await?;
        let to_model = textual_object::Entity::find()
            .filter(Column::TicketId.eq(ticket_id))
            .one(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(to_model)
    }

    async fn count_tos(&self) -> Result<u64, ToOrmError> {
        let db = self.get_connection().await?;
        let count = textual_object::Entity::find()
            .count(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(count as u64)
    }

    async fn find_by_ticket_ids(
        &self,
        ticket_ids: Vec<String>,
    ) -> Result<Vec<textual_object::Model>, ToOrmError> {
        let db = self.get_connection().await?;
        let files = textual_object::Entity::find()
            .filter(Column::TicketId.is_in(ticket_ids))
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(files)
    }

    async fn find(
        &self,
        find_condition: SimpleExpr,
    ) -> Result<Vec<textual_object::Model>, ToOrmError> {
        let db = self.get_connection().await.unwrap();
        let files = textual_object::Entity::find()
            .filter(find_condition)
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn find_all(&self) -> Result<Vec<textual_object::Model>, ToOrmError> {
        let db = self.get_connection().await?;
        let files = textual_object::Entity::find()
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)?;
        Ok(files)
    }

    async fn find_by_json_field(
        &self,
        json_field: &str,
        json_value: &str,
    ) -> Result<Vec<textual_object::Model>, ToOrmError> {
        let db = self.get_connection().await.unwrap();

        let sql_statement =
            r#"SELECT * FROM textual_objects WHERE json_extract(textual_objects.json, $1) = $2"#;

        let field_value = "$.".to_string() + json_field;

        let files = textual_object::Entity::find()
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
        let to_model = ToOrmMapper::to_into_active_model(to);
        let result = to_model
            .insert(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(result.uuid.parse().unwrap())
    }

    async fn insert_many(&self, tos: Vec<TextualObject>) -> Result<(), ToOrmError> {
        let db = self.get_connection().await?;
        let models: Vec<ActiveModel> = tos.into_iter().map(|to| ToOrmMapper::to_into_active_model(to)).collect();
        let _ = textual_object::Entity::insert_many(models)
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

        let delete_result = textual_object::Entity::delete_many()
            .exec(&db)
            .await
            .map_err(ToOrmError::DatabaseQueryError)?;
        Ok(delete_result.rows_affected)
    }

    async fn check_if_ticket_id_exists(&self, ticket_id: &str) -> Result<bool, ToOrmError> {
        let db = self.get_connection().await?;
        let count = textual_object::Entity::find()
            .filter(Column::TicketId.eq(ticket_id))
            .count(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(count > 0)
    }

    async fn query_tos(
        &self,
        query: StandardQuery,
    ) -> Result<PebbleQueryResultGeneric<TextualObject>, ToOrmError> {
        let db = self.get_connection().await?;
        let result = PebbleQueryTextualObject::query_textual_objects(&db, query).await?;

        let result_with_tags = self.add_tags_to_to_result(result).await;

        Ok(result_with_tags)
    }

    async fn query_tos_by_uuids(&self, mut query: StandardQuery, uuids: Vec<String>) -> Result<PebbleQueryResultGeneric<TextualObject>, ToOrmError> {
        let new_condition = GenericCondition {
            field: "uuid".to_string(),
            operator: Operator::In as i32,
            value: None,
            value_list: uuids,
            value_to: None,
        };

        if query.filter.is_none() {
            query.filter = Some(FilterSet {
                must: vec![
                    new_condition
                ],
                any: vec![],
                global_filter: None,
            })
        } else {
            let mut filter = query.filter.clone().unwrap();
            filter.must.push(new_condition);
            query.filter = Some(filter);
        }

        let results = self.query_tos(query).await?;
        Ok(results)
    }

    async fn query_tags(&self, query: StandardQuery) -> Result<PebbleQueryResultGeneric<ToTag>, ToOrmError> {
        let db = self.get_connection().await?;
        let result = PebbleQueryTextualObject::query_tags(&db, query).await?;
        // |to_tag_model| ToOrmMapper::to_tag_model_to_to_tag(to_tag_model)
        let totags = result.map_into_generic::<ToTag>(|to_tag_model| Some(ToOrmMapper::to_tag_model_to_to_tag(to_tag_model)), Some("to_tag_model_to_to_tag".to_string()));
        Ok(totags)
    }

    async fn insert_to_tags(&self, tags: Vec<CommonTagV2>, to_id: i32) -> Result<(), ToOrmError> {
        let db = self.get_connection().await?;
        let models: Vec<tag::ActiveModel> = tags.into_iter().map(|common_tag| {
            tag::ActiveModel::from_common_v2_and_to(common_tag, to_id)
        }).collect();
        let _ = Tag::insert_many(models)
            .exec(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;
        Ok(())
    }

    async fn find_by_tag_uuid(&self, tag_uuid: Uuid) -> Result<Option<TextualObject>, ToOrmError> {
        let db = self.get_connection().await?;
        let tag = Tag::find()
            .filter(Column::Uuid.eq(tag_uuid.to_string()))
            .one(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;

        if let Some(tag) = tag {
            let to = self.find_by_id(tag.to_id).await?;
            Ok(to)
        } else {
            Ok(None)
        }
    }

    async fn list_tags_group_by_key(&self) -> Result<Vec<KeyGroups>, ToOrmError> {
        let db = self.get_connection().await?;
        let tags = KeyGroups::find_by_statement(
            Statement::from_string(
                DbBackend::Sqlite,
                r#"SELECT key, value, Count(key) as 'key_count' from tag group by tag.key, tag.value"#.to_owned(),
            )
        )
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;

        Ok(tags)
    }

    async fn find_tags_by_key(&self, key: &str) -> Result<Vec<ToTag>, ToOrmError> {
        let db = self.get_connection().await?;
        let tags = Tag::find()
            .filter(tag::Column::Key.eq(key))
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;

        let tags = tags.into_iter().map(|tag| ToOrmMapper::to_tag_model_to_to_tag(tag)).collect();
        Ok(tags)
    }

    async fn find_tags_by_key_and_value(&self, key: String, value: String) -> Result<Vec<ToTag>, ToOrmError> {
        let db = self.get_connection().await?;
        let tags = Tag::find()
            .filter(tag::Column::Key.eq(key))
            .filter(tag::Column::Value.eq(value))
            .all(&db)
            .await
            .map_err(ToOrmError::DatabaseConnectionError)?;

        let tags = tags.into_iter().map(|tag| ToOrmMapper::to_tag_model_to_to_tag(tag)).collect();
        Ok(tags)
    }
}

#[cfg(test)]
mod tests {
    use carrel_utils::uuid::new_v4;

    use super::*;

    pub fn get_to_orm_dev_db() -> ToOrm {
        dotenv::dotenv().ok();
        let db_path = std::env::var("DATABASE_URL").unwrap();
        let query = ToOrm::new(&db_path);
        query
    }

    #[tokio::test]
    async fn test_find_by_ticket_id() {
        let first_to = get_to_orm_dev_db().find_by_ticket_id("ticket_id1").await.unwrap();
        assert_eq!(first_to.is_some(), true);
        assert_eq!(first_to.unwrap().ticket_id, "ticket_id1");
    }

    #[tokio::test]
    async fn test_count_tos() {
        let count = get_to_orm_dev_db().count_tos().await.unwrap();
        assert_eq!(count, 3);
    }

    #[tokio::test]
    async fn test_find_by_ticket_ids() {
        let tos = get_to_orm_dev_db()
            .find_by_ticket_ids(vec!["ticket_id1".to_string(), "ticket_id2".to_string()])
            .await
            .unwrap();
        assert_eq!(tos.len(), 2);
        assert_eq!(tos[0].ticket_id, "ticket_id1");
        assert_eq!(tos[1].ticket_id, "ticket_id2");
    }

    #[tokio::test]
    async fn test_find_by_json_field() {
        let tos_one_result = get_to_orm_dev_db()
            .find_by_json_field("file_full_name", "chn.pdf")
            .await
            .unwrap();
        assert_eq!(tos_one_result.len(), 1);
        assert_eq!(tos_one_result[0].ticket_id, "ticket_id1");

        let find_first_by_json_field = get_to_orm_dev_db()
            .find_first_by_json_field("file_full_name", "chn.pdf")
            .await
            .unwrap();

        assert_eq!(find_first_by_json_field.is_some(), true);

        let find_any_one_result = get_to_orm_dev_db()
            .find_any_by_json_value("file_full_name", "chn.pdf")
            .await
            .unwrap();
        assert_eq!(find_any_one_result, true);

        let tos_exact_no_result = get_to_orm_dev_db()
            .find_by_json_field("file_full_name", "chn")
            .await
            .unwrap();
        assert_eq!(tos_exact_no_result.len(), 0);

        let find_first_no_result = get_to_orm_dev_db()
            .find_first_by_json_field("file_full_name", "chn")
            .await
            .unwrap();
        assert_eq!(find_first_no_result.is_some(), false);

        let find_any_no_result = get_to_orm_dev_db()
            .find_any_by_json_value("file_full_name", "chn")
            .await
            .unwrap();
        assert_eq!(find_any_no_result, false);

        // query non existing field
        let tos_non_existing_field = get_to_orm_dev_db()
            .find_by_json_field(new_v4().to_string().as_str(), "chn")
            .await
            .unwrap();

        let find_first_non_existing_field = get_to_orm_dev_db()
            .find_first_by_json_field(new_v4().to_string().as_str(), "chn")
            .await
            .unwrap();
        assert_eq!(find_first_non_existing_field.is_some(), false);

        let find_any_non_existing_field = get_to_orm_dev_db()
            .find_any_by_json_value(new_v4().to_string().as_str(), "chn")
            .await
            .unwrap();
        assert_eq!(find_any_non_existing_field, false);

        assert_eq!(tos_non_existing_field.len(), 0);

        // query non existing value
        let tos_non_existing_value = get_to_orm_dev_db()
            .find_by_json_field("file_full_name", new_v4().to_string().as_str())
            .await
            .unwrap();
        assert_eq!(tos_non_existing_value.len(), 0);
    }

    #[tokio::test]
    async fn test_list_tag_by_keys() {
        let to_orm = get_to_orm_dev_db();
        let tags = to_orm.list_tags_group_by_key().await.unwrap();
        assert_eq!(tags.len(), 3);
        let first_tag_group = tags.get(0).unwrap();
        assert_eq!(first_tag_group.key, "tag_key_1");
        assert_eq!(first_tag_group.value, Some("tag_value_1".to_owned()));
        assert_eq!(first_tag_group.key_count, 1);

        let second_tag_group = tags.get(1).unwrap();
        assert_eq!(second_tag_group.key, "tag_key_1");
        assert_eq!(second_tag_group.value, Some("tag_value_2".to_owned()));
        assert_eq!(second_tag_group.key_count, 1);

        let third_tag_group = tags.get(2).unwrap();
        assert_eq!(third_tag_group.key, "tag_key_2");
        assert_eq!(third_tag_group.value, Some("tag_value_2".to_owned()));
        assert_eq!(third_tag_group.key_count, 1);
    }

    #[tokio::test]
    async fn find_tag_by_and_and_value() {
        let to_orm = get_to_orm_dev_db();
        let tags_by_key_and_value = to_orm.find_tags_by_key_and_value("tag_key_1".to_string(), "tag_value_1".to_string()).await.unwrap();
        assert_eq!(tags_by_key_and_value.len(), 1);
        let first_tag = tags_by_key_and_value.get(0).unwrap();
        assert_eq!(first_tag.key, "tag_key_1".to_owned());
        assert_eq!(first_tag.value, Some("tag_value_1".to_owned()));

        let tags_by_key = to_orm.find_tags_by_key("tag_key_1").await.unwrap();
        assert_eq!(tags_by_key.len(), 3);
        let first_tag = tags_by_key.get(0).unwrap();
        assert_eq!(first_tag.key, "tag_key_1");
        assert_eq!(first_tag.value, Some("tag_value_1".to_owned()));
        let second_tag = tags_by_key.get(1).unwrap();
        assert_eq!(second_tag.key, "tag_key_1");
        assert_eq!(second_tag.value, Some("tag_value_3".to_owned()));
    }
}
