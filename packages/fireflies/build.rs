use std::fs::{read_dir, rename};
use std::io::Error;
use std::path::{Path, PathBuf};

fn main() {
    // new empty vector
    let proto_files = vec![
        "fireflies/fireflies.proto"
    ];

    let proto_root_folders = vec![
   "../../contracts/", "../../contracts/common/", "../../contracts/fireflies/"
    ];

    let out_dir = PathBuf::from(
        "src/generated/"
    );

    // make sure generated file_path directory exists
    std::fs::create_dir_all(&out_dir).unwrap();

    let mut prost_config = prost_build::Config::new();
    prost_config
        .type_attribute(".", "#[derive(serde::Serialize, serde::Deserialize)]")
        .out_dir(&out_dir)
        .compile_protos(
            &proto_files,
            &proto_root_folders,
        )
        .unwrap_or_else(|e| panic!("protobuf compile error: {}", e));

    // rename generated file to snake case
    rename_prost_generated_filenames(&out_dir).unwrap();

}

fn rename_prost_generated_filenames(dir: &Path) -> Result<(), Error> {
    if dir.is_dir() {
        for entry in read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();

            if path.is_file() {
                let file_stem_renamed = &path
                    .file_stem()
                    .unwrap()
                    .to_str()
                    .unwrap()
                    .replace(".", "_");

                rename(&path, dir.join(format!("{}.rs", file_stem_renamed)))?;
            }
        }
    }
    println!("cargo:rerun-if-changed=build.rs");
    Ok(())
}
