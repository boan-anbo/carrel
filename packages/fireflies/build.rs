use std::path::PathBuf;

fn main() {
    // new empty vector
    let proto_files = vec![
        "fireflies.proto"
    ];

    let proto_root_folders = vec![
        "../../contracts/fireflies-api", "../../contracts/fireflies-api/"
    ];

    let out_dir = PathBuf::from(
        "src/generated/"
    );

    // make sure generated file_path directory exists
    std::fs::create_dir_all(&out_dir).unwrap();

    let mut prost_config = prost_build::Config::new();
    prost_config
        .type_attribute(".", "#[derive(serde::Serialize, serde::Deserialize)]")
        .out_dir(out_dir)
        .compile_protos(
            &proto_files,
            &proto_root_folders,
        )
        .unwrap_or_else(|e| panic!("protobuf compile error: {}", e));

}
