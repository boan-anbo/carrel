use std::env;
use std::path::PathBuf;

///! Generate the proto files for Carrel Server.
fn main() {
    let out_dir = "src/generated/";
    let out_path = PathBuf::from(out_dir);
    tonic_build::configure()
        .build_server(true)
        .build_client(true)
        .file_descriptor_set_path(out_path.join("carrel_descriptor.bin"))
        .out_dir("src/generated/")
        // ../../contracts/carrel/scaffold.proto
        .compile(&["../../../contracts/carrel/carrel_scaffold/v1/scaffold.proto"], &["../../../contracts/carrel/carrel_scaffold/v1/"])
        .unwrap();
}
