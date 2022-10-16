//! SeaORM Entity. Generated by sea-orm-codegen 0.9.2

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "tag")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub key: String,
    pub value: Option<String>,
    pub note: Option<String>,
    pub raw_tag_string: String,
    pub uuid: String,
    pub to_id: i32,
    pub to_uuid: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::textual_objects::Entity",
        from = "Column::ToId",
        to = "super::textual_objects::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    TextualObjects,
}

impl Related<super::textual_objects::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::TextualObjects.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
