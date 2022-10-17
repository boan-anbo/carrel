use sea_orm_macros::derive_from_query_result as FromQueryResult;

#[derive(Debug, FromQueryResult)]
pub struct KeyGroups {
    pub key: String,
    pub value: String,
    pub key_count: i32,
}
