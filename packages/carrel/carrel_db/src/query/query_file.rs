use std::borrow::Borrow;

use carrel_commons::generic::api::query::v1::StandardQuery;
use pebble_query::errors::PebbleQueryError;
use pebble_query::pebble_query::PebbleQuery;
use pebble_query::pebble_query_result::PebbleQueryResult;
use sea_orm::{DatabaseConnection};

use entity::entities::file;
use migration::async_trait;

use crate::query::carrel_file_v1_field_to_column_map::FILE_MAP_TO_COLUMN_MAP;

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
        let result = PebbleQuery::query_sea_orm_entity::<file::Entity, file::Model>(
            db,
            query.clone(),
            FILE_MAP_TO_COLUMN_MAP.borrow(),
        )
            .await
            .map_err(PebbleQueryError::SeaOrmDbError)?;

        Ok(result)
    }
}
