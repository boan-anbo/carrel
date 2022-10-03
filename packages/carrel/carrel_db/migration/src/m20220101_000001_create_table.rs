use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .create_table(
                Table::create()
                    .table(Archive::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Archive::Id)
                            .integer()
                            .not_null()
                            .primary_key()
                            .auto_increment()
                            ,
                    )
                    .col(
                        ColumnDef::new(Archive::Uuid)
                            .uuid()
                            .not_null()
                    )
                    .col(
                        ColumnDef::new(Archive::ProjectId)
                            .integer()
                            .not_null()
                    )
                    .col(ColumnDef::new(Archive::Name).string().not_null())
                    .col(ColumnDef::new(Archive::Description).string().not_null())
                    .col(ColumnDef::new(Archive::CreatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Archive::UpdatedAt).timestamp_with_time_zone().not_null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        manager
            .drop_table(Table::drop().table(Archive::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Archive {
    Table,
    Id,
    ProjectId,
    Uuid,
    Name,
    Description,
    CreatedAt,
    UpdatedAt,
}
