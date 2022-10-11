use std::borrow::Borrow;

use carrel_commons::generic::api::query::v1::StandardQuery;
use pebble_query::errors::PebbleQueryError;
use pebble_query::pebble_query::PebbleQuery;
use pebble_query::pebble_query_result::PebbleQueryResult;
use sea_orm::{DatabaseConnection, EntityTrait, ItemsAndPagesNumber, PaginatorTrait, QueryFilter};

use entity::entities::textual_objects;

use crate::to_db::to_field_to_column_map::TO_MAP_TO_COLUMN_MAP;

pub struct PebbleQueryTextualObject {}

#[async_trait::async_trait]
pub trait PebbleQueryTextualObjectTrait {
    async fn query_textual_objects(
        db: &DatabaseConnection,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<textual_objects::Entity>, PebbleQueryError>;
}

#[async_trait::async_trait]
impl PebbleQueryTextualObjectTrait for PebbleQueryTextualObject {
    async fn query_textual_objects(
        db: &DatabaseConnection,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<textual_objects::Entity>, PebbleQueryError> {
        let result = PebbleQuery::query_sea_orm_entity::<textual_objects::Entity, textual_objects::Model>(
            db,
            query.clone(),
            TO_MAP_TO_COLUMN_MAP.borrow(),
        )
            .await
            .map_err(PebbleQueryError::SeaOrmDbError)?;


        Ok(result)
    }
}
