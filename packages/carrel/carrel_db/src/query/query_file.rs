use carrel_commons::generic::api::query::v1::StandardQuery;
use pebble_query::errors::PebbleQueryError;
use pebble_query::pebble_query::PebbleQuery;
use pebble_query::pebble_query_result::PebbleQueryResult;
use sea_orm::{DatabaseConnection, EntityTrait, ItemsAndPagesNumber, PaginatorTrait, QueryFilter};
use std::borrow::Borrow;

use crate::query::carrel_file_v1_field_to_column_map::FILE_MAP_TO_COLUMN_MAP;
use entity::entities::file;
use entity::entities::file::Entity;
use migration::async_trait;

pub struct PebbleQueryFile {}

#[async_trait::async_trait]
pub trait PebbleQueryFileTrait {
    async fn query_files(
        db: &DatabaseConnection,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<file::Entity>, PebbleQueryError>;


}

#[async_trait::async_trait]
impl PebbleQueryFileTrait for PebbleQueryFile {
    async fn query_files(
        db: &DatabaseConnection,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<file::Entity>, PebbleQueryError> {
        let mut result = PebbleQuery::query_sea_orm_entity::<file::Entity, file::Model>(
            db,
            query.clone(),
            FILE_MAP_TO_COLUMN_MAP.borrow(),
        )
        .await
        .map_err(PebbleQueryError::SeaOrmDbError)?;

        Ok(result)
    }
}
