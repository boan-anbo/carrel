use sea_orm_migration::prelude::*;

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Task {
    Table,
    Id,
    Identifier,
    Uuid,
    Description,
    State,
    CreatedAt,
    UpdatedAt,
    Progress,
    AllowMultiple,
    LastMessage,
    // who assigned the task
    Commissioner,
}

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .create_table(
                Table::create()
                    .table(Task::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Task::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Task::Identifier).string().not_null())
                    .col(ColumnDef::new(Task::Uuid).string().not_null())
                    .col(ColumnDef::new(Task::Description).string().not_null())
                    .col(ColumnDef::new(Task::State).integer().not_null())
                    .col(ColumnDef::new(Task::CreatedAt).string().not_null())
                    .col(ColumnDef::new(Task::UpdatedAt).string().not_null())
                    .col(ColumnDef::new(Task::Progress).integer().not_null().default(0))
                    .col(ColumnDef::new(Task::AllowMultiple).boolean().not_null().default("false".to_owned()))
                    .col(ColumnDef::new(Task::LastMessage).string().not_null())
                    .col(ColumnDef::new(Task::Commissioner).string().not_null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .drop_table(Table::drop().table(Task::Table).to_owned())
            .await
    }
}

