use std::path::PathBuf;

///! Generate the proto files for Carrel Server.
fn main() {
    let proto_files = vec![
        // commons
        "carrel/common/tag/v1/tag_v1.proto",
        "carrel/common/tag/v2/tag_v2.proto",

        "carrel/common/file/v1/file_v1.proto",
        // directory
        "carrel/common/directory/v1/directory_v1.proto",
        "carrel/common/importance/v1/importance_v1.proto",
        "carrel/common/person/v1/person_v1.proto",
        "carrel/common/passage/v1/passage_v1.proto",
        "carrel/common/storage_info/v1/storage_info_v1.proto",

        "carrel/common/firefly/v1/firefly_v1.proto",
        "carrel/common/firefly/v2/firefly_v2.proto",

        "carrel/common/comment/v1/comment_v1.proto",
        "carrel/common/document/v1/document.proto",
        "carrel/common/snippet/v1/snippet_v1.proto",
        "carrel/common/project/v1/project_v1.proto",
        "carrel/common/project/v2/project_v2.proto",
        "carrel/common/archive/v1/archive_v1.proto",
        // tasks
        "carrel/common/task/v1/task_v1.proto",
        // task_state
        "carrel/common/task_state/v1/task_state_v1.proto",
        //
        // services and apis
        //
        // scaffold
        "carrel/server/scaffold/v1/server_scaffold_v1.proto",
        // firefly_keeper
        "carrel/server/firefly_keeper/v1/server_firefly_keeper_v1.proto",
        // project_manager
        "carrel/server/project_manager/v1/server_project_manager_v1.proto",
        // fs_manager
        "carrel/server/fs_manager/v1/server_fs_manager_v1.proto",

        // services
        "carrel/stacks/services/v1/stacks_services_v1.proto",
        // Constants
        "carrel/constant/supported_text_file/v1/supported_text_file_v1.proto",
        // grpc
        "grpc/health/v1/grpc_health_v1.proto",
        // generic
        "generic/api/request_directory/v1/request_directory_v1.proto",
        // generic query
        "generic/api/query/v1/query_v1.proto",
        // core
        "carrel/core/project_manager/v1/project_manager_v1.proto",
    ];

    let proto_root_folders = vec![
        "../../contracts/",
    ];

    let out_dir = PathBuf::from(
        "src/generated/"
    );

    // clear the out_dir if it exists
    if out_dir.exists() {
        std::fs::remove_dir_all(&out_dir).unwrap();
    }

    // create  directory if it doesn't exist
    std::fs::create_dir_all(&out_dir).unwrap();

    tonic_build::configure()
        .build_server(true)
        .build_client(true)
        .compile_well_known_types(true)
        .type_attribute(".", "#[derive(serde::Serialize, serde::Deserialize)]")
        .file_descriptor_set_path(out_dir.join("carrel_descriptor.bin"))
        .out_dir("src/generated/")
        // ../../contracts/carrel/scaffold.proto
        .compile(&proto_files, &proto_root_folders)
        .unwrap();

    carrel_utils::build::proto::post_process::rename_prost_generated_filenames(&out_dir).unwrap();
}
