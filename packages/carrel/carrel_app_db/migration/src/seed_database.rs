use carrel_utils::datetime::get_iso_string::{get_now, get_now_iso_string};
use sea_orm_migration::SchemaManager;

use crate::m20221010_121051_init_db::AppProject;
use crate::Query;

// Table,
// Id,
// // unique identifier of the project
// Uuid,
// Title,
// // The description of the project
// Description,
// ProjectDirectory,
//
// LastUsedAt,
// // Deadline
// DeadlineAt,
// // Next Scheduled use date, i.e. user can assign a date to the project when it will be used next time.
// // This will later be used for managing multiple projects at the same time.
// NextMeetingAt,
// CreatedAt,
// // total archive files
// TotalFiles,
// // total fireflies
// TotalFireflies,
// // total project text documents
// TotalTextDocuments,
//
// Importance,
//
// TaskState, // whether it's completed etc.
//
// // whether the project is favorited
// IsFavorite,
// // the directory no longer exists, need to check on app-init
// IsMissing,
// // when the user choose to hide it from recent history, but preserve the record
// IsHidden,
// // Is archived, meaning completed or no long active
// IsArchived,
pub async fn seed_database<'a>(manager: &'a SchemaManager<'a>) {
    // get cargo root folder
    let cargo_root = carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf("seeded_sample_project");
    // create if not exists

    // seed project
    let seed_project_one = Query::insert()
        .into_table(AppProject::Table)
        .columns(vec![
            AppProject::Name,
            AppProject::Description,
            AppProject::ProjectDirectory,
            AppProject::LastUsedAt,
            AppProject::DeadlineAt,
            AppProject::NextMeetingAt,
            AppProject::CreatedAt,
            AppProject::TotalFiles,
            AppProject::TotalFireflies,
            AppProject::TotalTextDocuments,
            AppProject::Importance,
            AppProject::TaskState,
            AppProject::IsFavorite,
            AppProject::IsMissing,
            AppProject::IsHidden,
            AppProject::IsArchived,
        ])
        .values_panic([
            "Sample_project".into(),
            "This is a sample project".into(),
            cargo_root.to_str().unwrap().into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            0.into(),
            0.into(),
            0.into(),
            0.into(),
            0.into(),
            false.into(),
            false.into(),
            false.into(),
            false.into(),
        ]).to_owned();

    manager.exec_stmt(seed_project_one).await.unwrap();
}
