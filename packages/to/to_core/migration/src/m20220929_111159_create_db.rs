use crate::seed_database::seed_database;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[derive(Iden)]
pub enum TextualObjects {
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
    JsonType,
    JsonUniqueId,
    Card,
    CardMap,
    Context,
    TicketIndexInContext,
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        let _ = manager
            .create_table(
                Table::create()
                    .table(TextualObjects::Table)
                    .if_not_exists()
                    // id is uuid
                    .col(
                        ColumnDef::new(TextualObjects::Id)
                            .integer()
                            .not_null()
                            .primary_key()
                            .auto_increment(),
                    )
                    .col(ColumnDef::new(TextualObjects::Uuid).text().not_null())
                    .index(
                        Index::create()
                            .name("uuid")
                            .unique()
                            .col(TextualObjects::Uuid),
                    )
                    .col(ColumnDef::new(TextualObjects::TicketId).text().not_null())
                    .index(
                        Index::create()
                            .name("ticket_id")
                            .col(TextualObjects::TicketId)
                            .unique(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::TicketMinimal)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(ColumnDef::new(TextualObjects::SourceId).text().not_null())
                    .col(
                        ColumnDef::new(TextualObjects::SourceName)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::SourceIdType)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::SourcePath)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::StoreInfo)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::StoreUrl)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::Created)
                            .timestamp()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::Updated)
                            .timestamp()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::Json)
                            .json()
                            .default("'{}'")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::JsonType)
                            .text()
                            .null()
                            .default("NULL"),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::JsonUniqueId)
                            .text()
                            .null()
                            .default("NULL"),
                    )
                    .index(
                        Index::create()
                            .name("json_unique_id")
                            .col(TextualObjects::JsonUniqueId)
                            .unique(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::Card)
                            .json()
                            .default("{}")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::CardMap)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::Context)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObjects::TicketIndexInContext)
                            .integer()
                            .default("0")
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await
            .unwrap();

        seed_database(manager).await;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .drop_table(Table::drop().table(TextualObjects::Table).to_owned())
            .await
    }
}
