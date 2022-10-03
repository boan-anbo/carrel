//! SeaORM Entity. Generated by sea-orm-codegen 0.9.2

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "project")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub name: String,
    pub description: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::archive::Entity"
    from = "Column::Id",
    to = "super::archive::Column::ProjectId"
    )]
    Archive,
}

impl Related<super::archive::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Archive.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
