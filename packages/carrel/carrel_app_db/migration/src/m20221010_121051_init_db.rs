use carrel_utils::uuid::new_v4;
use sea_orm_migration::prelude::*;
use crate::seed_database::seed_database;

#[derive(DeriveMigrationName)]
pub struct Migration;


/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub(crate) enum AppProject {
    Table,
    Id,
    // unique identifier of the project
    Uuid,
    Name,
    // The description of the project
    Description,
    ProjectDirectory,

    LastUsedAt,
    // Deadline
    DeadlineAt,
    // Next Scheduled use date, i.e. user can assign a date to the project when it will be used next time.
    // This will later be used for managing multiple projects at the same time.
    NextMeetingAt,
    CreatedAt,
    // total archive files
    TotalFiles,
    // total fireflies
    TotalFireflies,
    // total project text documents
    TotalTextDocuments,

    Importance,

    TaskState, // whether it's completed etc.

    // whether the project is favorited
    IsFavorite,
    // the directory no longer exists, need to check on app-init
    IsMissing,
    // when the user choose to hide it from recent history, but preserve the record
    IsHidden,
    // Is archived, meaning completed or no long active
    IsArchived,

}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let _ = manager
            .create_table(
                Table::create()
                    .table(AppProject::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(AppProject::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(AppProject::Uuid)
                            .string()
                            .not_null()
                            .default(new_v4().to_string()),
                    )
                    .col(ColumnDef::new(AppProject::Name).string().not_null())
                    .col(ColumnDef::new(AppProject::Description).string().not_null())
                    .col(ColumnDef::new(AppProject::ProjectDirectory).string().not_null())

                    .col(ColumnDef::new(AppProject::LastUsedAt).string().null())
                    .col(ColumnDef::new(AppProject::DeadlineAt).string().null())
                    .col(ColumnDef::new(AppProject::NextMeetingAt).string().null())
                    .col(ColumnDef::new(AppProject::CreatedAt).string().not_null())

                    .col(ColumnDef::new(AppProject::TotalFiles).integer().not_null())
                    .col(ColumnDef::new(AppProject::TotalFireflies).integer().not_null())
                    .col(ColumnDef::new(AppProject::TotalTextDocuments).integer().not_null())

                    .col(ColumnDef::new(AppProject::Importance).integer().not_null())

                    .col(ColumnDef::new(AppProject::TaskState).integer().not_null())
                    .col(ColumnDef::new(AppProject::IsFavorite).boolean().not_null())
                    .col(ColumnDef::new(AppProject::IsMissing).boolean().not_null())
                    .col(ColumnDef::new(AppProject::IsHidden).boolean().not_null())
                    .col(ColumnDef::new(AppProject::IsArchived).boolean().not_null())

                    .to_owned(),
            )
            .await;

        seed_database(manager).await;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(AppProject::Table).to_owned())
            .await
    }
}
