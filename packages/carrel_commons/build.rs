use std::env;
use std::path::PathBuf;

///! Generate the proto files for Carrel Server.
fn main() {
    let proto_files = vec![
        "carrel/server/scaffold/v1/scaffold.proto",
        "carrel/server/firefly_keeper/v1/firefly_keeper.proto",
    ];

    let proto_root_folders = vec![
        "../../../contracts/",
    ];

    let out_dir = PathBuf::from(
        "src/generated/"
    );

    // create  directory if it doesn't exist
    std::fs::create_dir_all(&out_dir).unwrap();

    tonic_build::configure()
        .build_server(true)
        .build_client(true)
        .type_attribute(".", "#[derive(serde::Serialize, serde::Deserialize)]")
        .file_descriptor_set_path(out_dir.join("carrel_descriptor.bin"))
        .out_dir("src/generated/")
        // ../../contracts/carrel/scaffold.proto
        .compile(&proto_files, &proto_root_folders)
        .unwrap();

    carrel_utils::build::proto::post_process::rename_prost_generated_filenames(&out_dir).unwrap();
}
