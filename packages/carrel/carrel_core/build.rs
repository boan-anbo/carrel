use std::fs::{read_dir, rename};
use std::io::Error;
use std::path::{Path, PathBuf};


fn main() {
    // // new empty vector
    // let proto_files = vec![
    //     "fireflies/fireflies.proto"
    // ];
    //
    // let proto_root_folders = vec![
    //     "../../../contracts/", "../../../contracts/common/", "../../../contracts/fireflies/"
    // ];
    //
    // let out_dir = PathBuf::from(
    //     "src/generated/"
    // );
    //
    // // make sure generated file_path directory exists
    // std::fs::create_dir_all(&out_dir).unwrap();
    //
    // let mut prost_config = prost_build::Config::new();
    // prost_config
    //     .type_attribute(".", "#[derive(serde::Serialize, serde::Deserialize)]")
    //     .out_dir(&out_dir)
    //     .compile_protos(
    //         &proto_files,
    //         &proto_root_folders,
    //     )
    //     .unwrap_or_else(|e| panic!("protobuf compile error: {}", e));
    //
    // // rename generated file to snake case
    // carrel_utils::build::proto::post_process::rename_prost_generated_filenames(&out_dir).unwrap();

}
