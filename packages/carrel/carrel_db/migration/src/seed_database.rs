use sea_orm_migration::SchemaManager;
use uuid::Uuid;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use crate::m20220929_111159_create_db::{Archive, File, Project};
use crate::Query;

pub async fn seed_database<'a>(manager: &'a SchemaManager<'a>) {
    // seed project
    let insert_project = Query::insert()
        .into_table(Project::Table)
        .columns(vec![
            Project::Name,
            Project::Description,
            Project::Directory,
            Project::DbName,
            Project::ToName,
        ])
        .values_panic([
            "seed_name".into(),
            "seed_description".into(),
            "seed_directory".into(),
            "seed_db_name".into(),
            "seed_to_name".into(),
        ]).to_owned();

    manager.exec_stmt(insert_project).await.unwrap();

    // add two archives
    let insert_archive_1 = Query::insert()
        .into_table(Archive::Table)
        .columns(vec![
            Archive::ProjectId,
            Archive::Uuid,
            Archive::Name,
            Archive::Description,
            Archive::CreatedAt,
            Archive::UpdatedAt,
        ])
        .values_panic([
            1.into(),
            Uuid::new_v4().to_string().into(),
            "seed_archive_1".into(),
            "seed_archive_1_description".into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
        ]).to_owned();

    manager.exec_stmt(insert_archive_1).await.unwrap();

    let insert_archive_2 = Query::insert()
        .into_table(Archive::Table)
        .columns(vec![
            Archive::ProjectId,
            Archive::Uuid,
            Archive::Name,
            Archive::Description,
            Archive::CreatedAt,
            Archive::UpdatedAt,
        ])
        .values_panic([
            1.into(),
            Uuid::new_v4().to_string().into(),
            "seed_archive_2".into(),
            "seed_archive_2_description".into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
        ]).to_owned();

    manager.exec_stmt(insert_archive_2).await.unwrap();

    // insert 1 files into archive 1
    let insert_file_1 = Query::insert()
        .into_table(File::Table)
        .columns(vec![
            File::Description,
            File::FileName,
            File::Extension,
            File::Directory,
            File::FullPath,
            File::Importance,
            File::TaskState,
            File::CreatedAt,
            File::ModifiedAt,
            File::ArchiveId,
        ])
        .values_panic([
            "seed_file_description_1".into(),
            "seed_file_name_1".into(),
            "pdf".into(),
            "seed_file_directory_1".into(),
            "seed_file_full_path_1".into(),
            1.into(),
            1.into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            1.into(),
        ]).to_owned();


    manager.exec_stmt(insert_file_1).await.unwrap();

    // insert 3 files into archive 2

    let insert_file_2_1 = Query::insert()
        .into_table(File::Table)
        .columns(vec![
            File::Description,
            File::FileName,
            File::Extension,
            File::Directory,
            File::FullPath,
            File::Importance,
            File::TaskState,
            File::CreatedAt,
            File::ModifiedAt,
            File::ArchiveId,
        ])
        .values_panic([
            "seed_file_description_2_1".into(),
            "seed_file_name_2_1".into(),
            "pdf".into(),
            "seed_file_directory_2_1".into(),
            "seed_file_full_path_2_1".into(),
            1.into(),
            1.into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            2.into(),
        ]).to_owned();

    let insert_file_2_2 = Query::insert()
        .into_table(File::Table)
        .columns(vec![
            File::Description,
            File::FileName,
            File::Extension,
            File::Directory,
            File::FullPath,
            File::Importance,
            File::TaskState,
            File::CreatedAt,
            File::ModifiedAt,
            File::ArchiveId,
        ])
        .values_panic([
            "seed_file_description_2_2".into(),
            "seed_file_name_2_2".into(),
            "pdf".into(),
            "seed_file_directory_2_2".into(),
            "seed_file_full_path_2_2".into(),
            4.into(),
            1.into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            2.into(),
        ]).to_owned();

    let insert_file_2_3 = Query::insert()
        .into_table(File::Table)
        .columns(vec![
            File::Description,
            File::FileName,
            File::Extension,
            File::Directory,
            File::FullPath,
            File::Importance,
            File::TaskState,
            File::CreatedAt,
            File::ModifiedAt,
            File::ArchiveId,
        ])
        .values_panic([
            "seed_file_description_2_3".into(),
            "seed_file_name_2_3".into(),
            "md".into(),
            "seed_file_directory_2_3".into(),
            "seed_file_full_path_2_3".into(),
            5.into(),
            1.into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            2.into(),
        ]).to_owned();


    manager.exec_stmt(insert_file_2_1).await.unwrap();
    manager.exec_stmt(insert_file_2_2).await.unwrap();
    manager.exec_stmt(insert_file_2_3).await.unwrap();
}
