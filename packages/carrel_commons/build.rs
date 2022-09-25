use std::env;
use std::path::PathBuf;

///! Generate the proto files for Carrel Server.
fn main() {
    let proto_files = vec![
        // commons
        "carrel/common/tag/v1/tag.proto",
        "carrel/common/file/v1/file.proto",
        "carrel/common/importance/v1/importance.proto",
        "carrel/common/person/v1/person.proto",
        "carrel/common/passage/v1/passage.proto",
        "carrel/common/storage_info/v1/storage_info.proto",
        "carrel/common/card/v1/card.proto",
        "carrel/common/comment/v1/comment.proto",
        "carrel/common/document/v1/document.proto",
        "carrel/common/snippet_location/v1/snippet_location.proto",
        // services and apis
        //
        // scaffold
        "carrel/server/scaffold/v1/scaffold.proto",
        // firefly_keeper
        "carrel/server/firefly_keeper/v1/firefly_keeper.proto",
        // services
        "carrel/stacks/services/v1/stacks_services_v1.proto",

    ];

    let proto_root_folders = vec![
        "../../contracts/",
    ];

    let out_dir = PathBuf::from(
        "src/generated/"
    );

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
