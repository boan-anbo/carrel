use std::borrow::Borrow;

use carrel_commons::generic::api::query::v1::StandardQuery;
use pebble_query::errors::PebbleQueryError;
use pebble_query::pebble_query::PebbleQuery;
use pebble_query::pebble_query_result::PebbleQueryResult;
use sea_orm::{DatabaseConnection, EntityTrait, ItemsAndPagesNumber, PaginatorTrait, QueryFilter};
use uuid::Uuid;

use entity::entities::{tag, textual_objects};
use entity::entities::tag::Entity;

use crate::to_db::to_field_to_column_maps::{TAG_MAP_TO_COLUMN_MAP, TO_MAP_TO_COLUMN_MAP};

pub struct PebbleQueryTextualObject {}

#[async_trait::async_trait]
pub trait PebbleQueryTextualObjectTrait {
    async fn query_textual_objects(
        db: &DatabaseConnection,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<textual_objects::Entity>, PebbleQueryError>;

    async fn query_tags(
        db: &DatabaseConnection,
        query: StandardQuery,
    ) -> Result<PebbleQueryResult<tag::Entity>, PebbleQueryError>;


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


    async fn query_tags(db: &DatabaseConnection, query: StandardQuery) -> Result<PebbleQueryResult<Entity>, PebbleQueryError> {
        let result = PebbleQuery::query_sea_orm_entity::<Entity, tag::Model>(
            db,
            query.clone(),
            TAG_MAP_TO_COLUMN_MAP.borrow(),
        )
            .await
            .map_err(PebbleQueryError::SeaOrmDbError)?;

        Ok(result)
    }

}


#[cfg(test)]
mod test {
    use carrel_commons::generic::api::query::v1::{Condition, FilterSet, Operator};
    use migration::ColumnSpec::Default;
    use crate::to_db::to_orm::{ToOrm, ToOrmTrait};
    use super::*;

    fn get_to_orm_dev_db() -> ToOrm {
        dotenv::dotenv().ok();
        let db_path = std::env::var("DATABASE_URL").unwrap();
        let query = ToOrm::new(&db_path);
        query
    }
    #[tokio::test]
    async fn test_query_tags() {
        let db =  get_to_orm_dev_db();
        let query = StandardQuery{
            sort: None,
            offset: 0,
            length: 0,
            page: 0,
            filter: Some(FilterSet{
                global_filter: None,
                must: vec![
                    Condition{
                        field: "key".to_string(),
                        operator: Operator::Equals as i32,
                        value: Some("tag_key_1".to_string()),
                        value_list: vec![],
                        value_to: None
                    }
                ],
                any: vec![]
            }),
            find_one: false
        };

        let result = db.query_tags(query).await.unwrap();
        assert_eq!(result.results.len(), 1);
    }
}