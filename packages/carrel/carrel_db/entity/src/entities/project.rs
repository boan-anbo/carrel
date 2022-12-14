//! SeaORM Entity. Generated by sea-orm-codegen 0.9.3

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "project")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub uuid: String,
    pub name: String,
    pub description: String,
    pub directory: Option<String>,
    pub db_name: Option<String>,
    pub to_name: Option<String>,
    pub create_at: String,
    pub updated_at: String,
    pub archive_count: i32,
    pub file_count: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::archive::Entity")]
    Archive,
}

impl Related<super::archive::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Archive.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
