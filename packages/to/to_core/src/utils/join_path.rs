use std::path::PathBuf;

pub fn join_dir_and_file_name(dir_path: &str, db_file_name: &str) -> String {
    let mut path = PathBuf::from(dir_path);
    path.push(db_file_name);
    path.to_str().unwrap().to_string()
}
