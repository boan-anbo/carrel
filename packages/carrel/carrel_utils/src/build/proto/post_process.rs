use std::fs::{read_dir, rename};
use std::io::Error;
use std::path::Path;

/// [Prost](https://docs.rs/prost) generated files cannot rename file names generated from the package information of proto files and end up producing files like `name.v1.rs`.
/// This function renames these files and replace `.` with `_` to `name_v1.rs`.
pub fn rename_prost_generated_filenames(dir: &Path) -> Result<(), Error> {
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
                    .replace(
                        '.',
                        "_"
                    );

                let ext = path.extension().unwrap().to_str().unwrap();

                rename(&path, dir.join(format!("{}.{}", file_stem_renamed, ext)))?;
            }
        }
    }
    println!("cargo:rerun-if-changed=build.rs");
    Ok(())
}
