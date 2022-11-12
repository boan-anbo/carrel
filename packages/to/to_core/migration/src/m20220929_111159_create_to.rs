use crate::seed_database::seed_database;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

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
    JsonType,
    JsonUniqueId,
    Card,
    CardMap,
    Context,
    TicketIndexInContext,
    TagCount,
}

#[derive(Iden)]
pub enum Tag {
    Table,
    Id,
    Key,
    Value,
    Note,
    RawTagString,
    Uuid,
    ToId,
    ToUuid,
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum TagRelation {
    Table,
    Id,
    SourceId,
    TargetId,
    RelationType,
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        let _ = manager
            .create_table(
                Table::create()
                    .table(TextualObject::Table)
                    .if_not_exists()
                    // id is uuid
                    .col(
                        ColumnDef::new(TextualObject::Id)
                            .integer()
                            .not_null()
                            .primary_key()
                            .auto_increment(),
                    )
                    .col(ColumnDef::new(TextualObject::Uuid).text().not_null())
                    .index(
                        Index::create()
                            .name("uuid")
                            .unique()
                            .col(TextualObject::Uuid),
                    )
                    .col(ColumnDef::new(TextualObject::TicketId).text().not_null())
                    .index(
                        Index::create()
                            .name("ticket_id")
                            .col(TextualObject::TicketId)
                            .unique(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::TicketMinimal)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(ColumnDef::new(TextualObject::SourceId).text().not_null())
                    .col(
                        ColumnDef::new(TextualObject::SourceName)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::SourceIdType)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::SourcePath)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::StoreInfo)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::StoreUrl)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::Created)
                            .timestamp()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::Updated)
                            .timestamp()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::Json)
                            .json()
                            .default("'{}'")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::JsonType)
                            .text()
                            .null()
                            .default("NULL"),
                    )
                    .col(
                        ColumnDef::new(TextualObject::JsonUniqueId)
                            .text()
                            .null()
                            .default("NULL"),
                    )
                    .col(
                        ColumnDef::new(TextualObject::Card)
                            .json()
                            .default("{}")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::CardMap)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::Context)
                            .text()
                            .default("")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::TicketIndexInContext)
                            .integer()
                            .default("0")
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(TextualObject::TagCount)
                            .integer()
                            .default("0")
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await
            .unwrap();


        // .index(
        //     Index::create()
        //         .name("json_unique_id")
        //         .col(TextualObject::JsonUniqueId)
        //         .unique(),
        // )
        let _  = manager
            .create_index(
                Index::create()
                    .name("json_unique_id")
                    .table(TextualObject::Table)
                    .col(TextualObject::JsonUniqueId)
                    .to_owned(),
            )
            .await;

        let _ = manager
            .create_table(
                Table::create()
                    .table(Tag::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Tag::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Tag::Key).string().not_null())
                    .col(ColumnDef::new(Tag::Value).string().null())
                    .col(ColumnDef::new(Tag::Note).string().null())
                    .col(ColumnDef::new(Tag::RawTagString).string().not_null())
                    .col(ColumnDef::new(Tag::Uuid).string().not_null().unique_key().default("uuid_generate_v4()"))
                    .col(ColumnDef::new(Tag::ToId).integer().not_null().default(0))
                    .foreign_key(
                        ForeignKey::create()
                            .name("to_id")
                            .from(Tag::Table, Tag::ToId)
                            .to(TextualObject::Table, TextualObject::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .col(ColumnDef::new(Tag::ToUuid).string().not_null().default("uuid_generate_v4()"))

                    .to_owned(),
            )
            .await;

        // create two indexes for tag_key and tag_uuid
        let _ = manager
            .create_index(
                Index::create()
                    .name("tag_key")
                    .table(Tag::Table)
                    .col(Tag::Key)
                    .to_owned(),
            )

            .await;

        let _ = manager
            .create_index(
                Index::create()
                    .name("tag_uuid")
                    .table(Tag::Table)
                    .col(Tag::Uuid)
                    .to_owned(),
            )
            .await;


        let _ = manager
            .create_table(
                Table::create()
                    .table(TagRelation::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(TagRelation::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )

                    .col(ColumnDef::new(TagRelation::SourceId).string().not_null())
                    .col(ColumnDef::new(TagRelation::TargetId).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("source_id")
                            .from(TagRelation::Table, TagRelation::SourceId)
                            .to(Tag::Table, Tag::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("target_id")
                            .from(TagRelation::Table, TagRelation::TargetId)
                            .to(Tag::Table, Tag::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .col(ColumnDef::new(TagRelation::RelationType).integer().not_null().default(0))
                    .to_owned(),
            )
            .await;


        seed_database(manager).await;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        let _ = manager
            .drop_table(Table::drop().table(TextualObject::Table).to_owned())
            .await;

        let _ = manager
            .drop_table(Table::drop().table(Tag::Table).to_owned())
            .await;

        manager
            .drop_table(Table::drop().table(TagRelation::Table).to_owned())
            .await
    }
}
