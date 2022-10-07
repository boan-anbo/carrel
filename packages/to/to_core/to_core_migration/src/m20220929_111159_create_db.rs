use sea_orm_migration::prelude::*;
use crate::seed_database::seed_database;

#[derive(DeriveMigrationName)]
pub struct Migration;

// pub struct TextualObject {
//     pub id: Uuid,
//     // ticket id
//     pub ticket_id: String,
//     // unique identifier for the textual object in the original source, e.g. url for webpage, zotero citekey for zotero item, etc, doi for article, etc
//     pub ticket_minimal: String,
//
//     pub source_id: String,
//     // name of the source of the textual object, e.g. "Zotero", "DOI"
//     pub source_name: String,
//     // name of the type of id, e.g. url, Zotero Citekey, DOI, etc.
//     pub source_id_type: String,
//     // unique path to the textual object, e.g. "/path/to/file.txt". Eg. doi url.
//     pub source_path: String,
//
//     // store info, kind of store, JSOn or Sqlite, etc.
//     pub store_info: String,
//     // store url, e.g. path, or url
//     pub store_url: String,
//
//     pub created: chrono::NaiveDateTime,
//     pub updated: chrono::NaiveDateTime,
//
//     pub json: sqlx::types::Json<serde_json::Value>,
//
//     pub card: sqlx::types::Json<ToCard>,
//
//     // map of string to string, format: "to_key1, card_key1; to_key2, card_key2;" etc.
//     pub card_map: String,
//
//     pub context: String,
//
//     pub ticket_index_in_context: i32,
// }

#[derive(Iden)]
pub enum TextualObject {
    Table,
    Id,
    Uuid,
    TicketId,
    TicketMinimal,
    SourceId,
    SourceName,
    SourceIdType,
    SourcePath,
    StoreInfo,
    StoreUrl,
    Created,
    Updated,
    Json,
    Card,
    CardMap,
    Context,
    TicketIndexInContext,

}


#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own to_core_migration scripts

        let _ = manager
            .create_table(
                Table::create()
                    .table(TextualObject::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(TextualObject::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::Uuid)
                            .uuid()
                            .not_null()
                            .default(uuid::Uuid::new_v4().to_string()),
                    )
                    .index(
                        Index::create()
                            .name("idx_textual_object_uuid")
                            .unique()
                            .col(TextualObject::Uuid),
                    )
                    .col(ColumnDef::new(TextualObject::TicketId).string().not_null())
                    .col(ColumnDef::new(TextualObject::TicketMinimal).string().not_null())
                    .col(ColumnDef::new(TextualObject::SourceId).string().not_null())
                    .col(ColumnDef::new(TextualObject::SourceName).string().not_null())
                    .col(ColumnDef::new(TextualObject::SourceIdType).string().not_null())
                    .col(ColumnDef::new(TextualObject::SourcePath).string().not_null())
                    .col(ColumnDef::new(TextualObject::StoreInfo).string().not_null())
                    .col(ColumnDef::new(TextualObject::StoreUrl).string().not_null())
                    .col(ColumnDef::new(TextualObject::Created).string().not_null())
                    .col(ColumnDef::new(TextualObject::Updated).string().not_null())
                    .col(ColumnDef::new(TextualObject::Json).json().not_null())
                    .col(ColumnDef::new(TextualObject::Card).json().not_null())
                    .col(ColumnDef::new(TextualObject::CardMap).string().not_null())
                    .col(ColumnDef::new(TextualObject::Context).string().not_null())
                    .col(ColumnDef::new(TextualObject::TicketIndexInContext).integer().not_null())
                    // .col(ColumnDef::new(TextualObject::Name).string().not_null())
                    // .col(ColumnDef::new(TextualObject::Description).string().not_null())
                    // .col(ColumnDef::new(TextualObject::Directory).string().null())
                    // .col(ColumnDef::new(TextualObject::DbName).string().null())
                    // .col(ColumnDef::new(TextualObject::ToName).string().null())
                    // .col(ColumnDef::new(TextualObject::CreateAt).string().not_null())
                    // .col(ColumnDef::new(TextualObject::UpdatedAt).string().not_null())
                .to_owned(),
            )
            .await.unwrap();



        // seed_database(manager).await;



        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own to_core_migration scripts



        manager
            .drop_table(Table::drop().table(TextualObject::Table).to_owned())
            .await
    }
}


