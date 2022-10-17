use sea_orm::FromQueryResult;
use carrel_commons::carrel::common::tag::v2::TagGroup as CommonTagGroup;

#[derive(Debug, FromQueryResult)]
pub struct KeyGroups {
    pub key: String,
    pub value: String,
    pub key_count: i32,
}

impl KeyGroups {
    pub fn into_common_key_group(self) -> CommonTagGroup {
        CommonTagGroup {
            key: self.key,
            value: self.value,
            key_count: self.key_count,
        }
    }
}
