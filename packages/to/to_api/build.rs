use std::{env, path::PathBuf};


fn main() {
    let proto_file = "to.api.models.proto";
    let out_dir = PathBuf::from("src/dtos/");

    // let generated_file_path =   env!("OUT_DIR");
    // make sure generated file_path directory exists
    std::fs::create_dir_all(&out_dir).unwrap();

    let mut prost_config = prost_build::Config::new();
    prost_config
        .type_attribute(".", "#[derive(serde::Serialize, serde::Deserialize)]")
        // add utoipa ToSchema attribute to generated structs
        .type_attribute(".", "#[derive(utoipa::ToSchema)]")
        // for Utoipa auto-generated OpenApi $ref, otherwise they will include `super::REFERENCE`
        // .field_attribute("DistantApiSearchResponse.passages", "#[schema(value_type=Vec<Passage>)]")
        // output generated code to the out_dir
        .out_dir(out_dir)

        .compile_protos(&[proto_file], &["../../../contracts/", "../../../contracts/to/"])
        .unwrap_or_else(|e| panic!("protobuf compile error: {}", e));

    println!("cargo:rerun-if-changed={}", proto_file);
}
//
// use std::{env, path::PathBuf};
// use prost_wkt_build::*;
//
// fn main() {
//     let out = PathBuf::from("src/generated/");
//     let descriptor_file = out.join("descriptors.bin");
//     let mut prost_build = prost_build::Config::new();
//     // prost_build
//     //     .type_attribute(
//     //         ".",
//     //         "#[derive(serde::Serialize,serde::Deserialize)]"
//     //     )
//     //     .extern_path(
//     //         ".google.protobuf.Any",
//     //         "::prost_wkt_types::Any"
//     //     )
//     //     .extern_path(
//     //         ".google.protobuf.Timestamp",
//     //         "::prost_wkt_types::Timestamp"
//     //     )
//     //     .extern_path(
//     //         ".google.protobuf.Value",
//     //         "::prost_wkt_types::Value"
//     //     )
//     //     .file_descriptor_set_path(&descriptor_file)
//     //     .compile_protos(
//     //         &["test.proto"],
//     //         &["../../contracts/", "../../contracts/models/"],
//     //     )
//     //     .unwrap();
//     prost_build
//         .type_attribute(
//             ".my.requests",
//             "#[derive(serde::Serialize, serde::Deserialize)] #[serde(default, rename_all=\"camelCase\")]",
//         )
//         .type_attribute(
//             ".my.messages.Foo",
//             "#[derive(serde::Serialize, serde::Deserialize)] #[serde(default, rename_all=\"camelCase\")]",
//         )
//         .type_attribute(
//             ".my.messages.Content",
//             "#[derive(serde::Serialize, serde::Deserialize)] #[serde(rename_all=\"camelCase\")]",
//         )
//         .extern_path(".google.protobuf.Any", "::prost_wkt_types::Any")
//         .extern_path(".google.protobuf.Timestamp", "::prost_wkt_types::Timestamp")
//         .extern_path(".google.protobuf.Value", "::prost_wkt_types::Value")
//         .file_descriptor_set_path(&descriptor_file)
//         .compile_protos( &["test.proto"],
//                                   &["../../contracts/", "../../contracts/models/"])
//         .unwrap();
//
//     let descriptor_bytes =
//         std::fs::read(descriptor_file)
//             .unwrap();
//
//     let descriptor =
//         FileDescriptorSet::decode(&descriptor_bytes[..])
//             .unwrap();
//
//     prost_wkt_build::add_serde(out, descriptor);
// }
