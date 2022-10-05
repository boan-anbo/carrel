use sea_orm_migration::prelude::*;
use crate::ColumnSpec::PrimaryKey;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
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
                    .col(ColumnDef::new(Project::Name).string().not_null())
                    .col(ColumnDef::new(Project::Description).string().not_null())
                    .col(ColumnDef::new(Project::Directory).string().null())
                    .col(ColumnDef::new(Project::DbName).string().null())
                    .col(ColumnDef::new(Project::ToName).string().null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .drop_table(Table::drop().table(Project::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum Project {
    Table,
    Id,
    Name,
    Description,
    Directory,
    DbName,
    ToName,

}
use sea_orm_migration::prelude::*;
use crate::m20220929_111159_create_project::Project;


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
                    // .col(
                    //     ColumnDef::new(Archive::ProjectId)
                    //
                    //         .integer()
                    //
                    //         .not_null()
                    // )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk_archive_project")
                            .from(Archive::Table, Archive::ProjectId)
                            .to(Project::Table, Project::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade)

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
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum File {
    Table,
    Id,
    Description,
    FileName,
    Extension,
    Directory,
    FullPath,
    Importance,
    TaskState,
    ArchiveId,
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
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
                    .col(ColumnDef::new(File::Description).string().not_null())
                    .col(ColumnDef::new(File::FileName).string().not_null())
                    .col(ColumnDef::new(File::Extension).string().not_null())
                    .col(ColumnDef::new(File::Directory).string().not_null())
                    .col(ColumnDef::new(File::FullPath).string().not_null())
                    .col(ColumnDef::new(File::Importance).integer().not_null())
                    .col(ColumnDef::new(File::TaskState).integer().not_null())
                    .col(
                        ColumnDef::new(File::ArchiveId)
                            .integer()
                            .not_null()
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .drop_table(Table::drop().table(File::Table).to_owned())
            .await
    }
}

