use entity::entities::file;
use once_cell::sync::Lazy;
use std::collections::HashMap;

pub static FILE_MAP_TO_COLUMN_MAP: Lazy<HashMap<String, file::Column>> = Lazy::new(|| {
    HashMap::from([
        ("id", file::Column::Id),
        ("uuid", file::Column::Uuid),
        ("description", file::Column::Description),
        ("file_name", file::Column::FileName),
        ("extension", file::Column::Extension),
        ("directory", file::Column::Directory),
        ("full_path", file::Column::FullPath),
        ("importance", file::Column::Importance),
        ("task_state", file::Column::TaskState),
        ("archive_id", file::Column::ArchiveId),
        ("created_at", file::Column::CreatedAt),
        ("modified_at", file::Column::ModifiedAt),
        ("synced_at", file::Column::SyncedAt),
        ("is_missing_file", file::Column::IsMissingFile),
        ("is_out_of_sync", file::Column::IsOutOfSync),
    ])
    .into_iter()
    .map(|(k, v)| (k.to_string(), v))
    .collect()
});
