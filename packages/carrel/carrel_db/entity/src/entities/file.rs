//! SeaORM Entity. Generated by sea-orm-codegen 0.9.3

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "file")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub uuid: String,
    pub description: String,
    pub file_name: String,
    pub extension: String,
    pub directory: String,
    pub full_path: String,
    pub importance: i32,
    pub task_state: i32,
    pub created_at: String,
    pub modified_at: String,
    pub synced_at: Option<String>,
    pub is_missing_file: i32,
    pub is_out_of_sync: i32,
    pub archive_id: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::archive::Entity",
        from = "Column::ArchiveId",
        to = "super::archive::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Archive,
}

impl Related<super::archive::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Archive.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
