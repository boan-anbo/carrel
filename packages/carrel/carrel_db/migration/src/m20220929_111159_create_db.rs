use crate::seed_database::seed_database;
use carrel_utils::uuid::new_v4;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[derive(Iden)]
pub enum Project {
    Table,
    Id,
    Uuid,
    Name,
    Description,
    Directory,
    DbName,
    ToName,
    ArchiveCount,
    FileCount,
    CreateAt,
    UpdatedAt,
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub(crate) enum Archive {
    Table,
    Id,
    ProjectId,
    Uuid,
    Name,
    Description,
    Importance,
    IsFavorite,
    CreatedAt,
    UpdatedAt,
}

#[derive(Iden)]
pub(crate) enum File {
    Table,
    Id,
    Uuid,
    Description,
    FileName,
    Extension,
    Directory,
    FullPath,
    Importance,
    TaskState,
    ArchiveId,
    CreatedAt,
    ModifiedAt,
    SyncedAt,
    IsMissingFile,
    // when the modified_at is newer than synced_at, it means the file is not synced
    IsOutOfSync,
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        let _ = manager
            .create_table(
                Table::create()
                    .table(Project::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Project::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(Project::Uuid)
                            .uuid()
                            .not_null()
                            .default(new_v4().to_string()),
                    )
                    .col(ColumnDef::new(Project::Name).string().not_null())
                    .col(ColumnDef::new(Project::Description).string().not_null())
                    .col(ColumnDef::new(Project::Directory).string().null())
                    .col(ColumnDef::new(Project::DbName).string().null())
                    .col(ColumnDef::new(Project::ToName).string().null())
                    .col(ColumnDef::new(Project::CreateAt).string().not_null())
                    .col(ColumnDef::new(Project::UpdatedAt).string().not_null())
                    .col(ColumnDef::new(Project::ArchiveCount).integer().not_null().default(0))
                    .col(ColumnDef::new(Project::FileCount).integer().not_null().default(0))
                    .to_owned(),
            )
            .await
            .unwrap();

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
                            .auto_increment(),
                    )
                    .col(ColumnDef::new(Archive::ProjectId).integer().not_null())
                    .col(ColumnDef::new(Archive::Uuid).uuid().not_null())
                    .col(ColumnDef::new(Archive::Name).string().not_null())
                    .col(ColumnDef::new(Archive::Description).string().not_null())
                    .col(
                        ColumnDef::new(Archive::Importance)
                            .integer()
                            .not_null()
                            .default(0),
                    )
                    .col(
                        ColumnDef::new(Archive::IsFavorite)
                            .boolean()
                            .not_null()
                            .default(false),
                    )
                    .col(ColumnDef::new(Archive::CreatedAt).string().not_null())
                    .col(ColumnDef::new(Archive::UpdatedAt).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_archive_project")
                            .from(Archive::Table, Archive::ProjectId)
                            .to(Project::Table, Project::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
            .unwrap();

        manager
            .create_table(
                Table::create()
                    .table(File::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(File::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(File::Uuid).uuid().not_null())
                    .index(
                        Index::create()
                            .name("idx_file_uuid")
                            .table(File::Table)
                            .col(File::Uuid)
                            .unique(),
                    )
                    .col(ColumnDef::new(File::Description).string().not_null())
                    .col(ColumnDef::new(File::FileName).string().not_null())
                    .col(ColumnDef::new(File::Extension).string().not_null())
                    .col(ColumnDef::new(File::Directory).string().not_null())
                    .col(ColumnDef::new(File::FullPath).string().not_null())
                    .col(ColumnDef::new(File::Importance).integer().not_null())
                    .col(ColumnDef::new(File::TaskState).integer().not_null())
                    .col(ColumnDef::new(File::CreatedAt).string().not_null())
                    .col(ColumnDef::new(File::ModifiedAt).string().not_null())
                    .col(
                        ColumnDef::new(File::SyncedAt)
                            .string()
                            .null()
                            .default("NULL"),
                    )
                    .col(
                        ColumnDef::new(File::IsMissingFile)
                            .boolean()
                            .not_null()
                            .default(false),
                    )
                    // default to true, because a newly added file has not been synced
                    .col(
                        ColumnDef::new(File::IsOutOfSync)
                            .boolean()
                            .not_null()
                            .default(true),
                    )
                    .col(ColumnDef::new(File::ArchiveId).integer().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_file_archive")
                            .from(File::Table, File::ArchiveId)
                            .to(Archive::Table, Archive::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
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
            .drop_table(Table::drop().table(File::Table).to_owned())
            .await
            .unwrap();

        manager
            .drop_table(Table::drop().table(Archive::Table).to_owned())
            .await
            .unwrap();

        manager
            .drop_table(Table::drop().table(Project::Table).to_owned())
            .await
    }
}
