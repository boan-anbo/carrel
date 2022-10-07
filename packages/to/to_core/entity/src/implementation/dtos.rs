//! This module implements basic conversions for the ease of crud operations between model and dtos.
use crate::entities::file::Model;
//
//
// impl From<AddArchiveDto> for archive::ActiveModel {
//     fn from(add_archive: AddArchiveDto) -> Self {
//         archive::ActiveModel {
//             id: Default::default(),
//             project_id: Set(add_archive.project_id),
//             uuid: Set(carrel_utils::uuid::new_v4().to_string()),
//             name: Set(add_archive.name),
//             description: Set(add_archive.description),
//             created_at: Set(carrel_utils::datetime::get_iso_string::get_now_iso_string()),
//             updated_at: Set(carrel_utils::datetime::get_iso_string::get_now_iso_string()),
//         }
//     }
// }
//
// impl From<CreateProjectRequest> for project::ActiveModel {
//     fn from(create_project: CreateProjectRequest) -> Self {
//
//         project::ActiveModel {
//             id: Default::default(),
//             name: Set(create_project.name),
//             description: Set(create_project.description),
//             directory: Set(Some(create_project.directory)),
//             db_name: Set(Some(create_project.db_name)),
//             to_name: Set(Some(create_project.to_name)),
//             create_at: Set(get_now_iso_string()),
//             updated_at: Set(get_now_iso_string()),
//
//         }
//     }
// }
//
//
// impl From<&str> for file::ActiveModel {
//     fn from(file_path: &str) -> Self {
//         let file_path_buf = PathBuf::from(file_path);
//         let file_name = file_path_buf.file_name().unwrap().to_str().unwrap();
//         let file_extension = file_path_buf.extension().unwrap().to_str().unwrap();
//         let dir = file_path_buf.parent().unwrap().to_str().unwrap();
//
//         file::ActiveModel {
//             id: Default::default(),
//             description: Set("".to_string()),
//             file_name: Set(file_name.to_string()),
//             extension: Set(file_extension.to_string()),
//             directory: Set(dir.to_string()),
//             full_path: Set(file_path.to_string()),
//             importance: Set(0),
//             task_state: Set(0),
//             created_at: Set(get_now_iso_string()),
//             modified_at: Set(get_now_iso_string()),
//             archive_id: Set(0),
//             uuid: Set(carrel_utils::uuid::new_v4().to_string()),
//         }
//     }
// }
//
//
// impl From<file::Model> for File {
//     fn from(db_file : Model) -> Self {
//         File {
//             uuid: db_file.uuid,
//             description: db_file.description,
//             importance: db_file.importance,
//             file_name: db_file.file_name,
//             file_extension: db_file.extension,
//             file_dir: db_file.directory,
//             file_full_path: db_file.full_path,
//             tasks: vec![]
//         }
//
//     }
// }
