use std::ffi::OsStr;
use std::fs;
use std::path::PathBuf;
use carrel_commons::carrel::common::directory::v1::Directory;
use carrel_commons::carrel::common::file::v1::File;
use carrel_utils::uuid::new_v4;
use thiserror::Error;
use std::fs::metadata;
use carrel_utils::fs::file_metadata::get_file_modified_time_iso_string;
use futures::TryFutureExt;
use crate::fs::fs_manager::FSManagerError::IOError;

#[derive(Error, Debug)]
pub enum FSManagerError {
    #[error("Not a directory error: {0}")]
    NotADirectoryError(PathBuf),
    #[error("Not a file error: {0}")]
    NotAFileError(PathBuf),
    #[error("IO error: {0}")]
    IOError(#[source] std::io::Error),
}

pub struct FSManager {}

pub trait FSManagerTrait {
    // generate a directory tree from a path.
    fn generate_dir_tree(path: &str) -> Result<Directory, FSManagerError>;
    // path_buf to directory
    fn path_buf_to_directory(file_buf: &PathBuf) -> Result<Directory, FSManagerError>;
    // path_buf to file
    fn path_buf_to_file( file_buf: &PathBuf) -> Result<File, FSManagerError>;
}

impl FSManagerTrait for FSManager {
    fn generate_dir_tree(path: &str) -> Result<Directory, FSManagerError> {
        // create a pathbuf first
        let pathbuf = PathBuf::from(path);
        // check if it's a directory, otherwise, throw
        if !pathbuf.is_dir() {
            return Err(FSManagerError::NotADirectoryError(pathbuf));
        }

        let mut root_dir = FSManager::path_buf_to_directory(&pathbuf)?;

        // recursively generate the directory tree
        let tree = generate_dir_tree_recursive(&mut root_dir)?;

        Ok(tree.to_owned())
    }


    fn path_buf_to_directory( pathbuf: &PathBuf) -> Result<Directory, FSManagerError> {
        if !pathbuf.is_dir() {
            return Err(FSManagerError::NotADirectoryError(pathbuf.clone()));
        }
        let dir = Directory {
            uuid: new_v4().to_string(),
            description: "".to_string(),
            name: pathbuf.file_name().unwrap().to_str().unwrap().to_string(),
            full_path: pathbuf.to_str().unwrap().to_string(),
            created_at: "".to_string(),
            modified_at: "".to_string(),
            files: vec![],
            sub_dirs: vec![],
        };
        Ok(dir)
    }

    fn path_buf_to_file(file_buf: &PathBuf) -> Result<File, FSManagerError> {
        if !file_buf.is_file() {
            return Err(FSManagerError::NotAFileError(file_buf.clone()));
        }

        let modified_at = get_file_modified_time_iso_string(file_buf.to_str().unwrap());
        // convert system time to iso string
        let created_at = get_file_modified_time_iso_string(file_buf.to_str().unwrap());

        let file = File {
            id: 0,
            uuid: new_v4().to_string(),
            description: "".to_string(),
            importance: 0,
            file_name: file_buf.file_name().unwrap().to_str().unwrap().to_string(),
            extension: file_buf.extension().unwrap_or(OsStr::new("")).to_str().unwrap().to_string(),
            directory: file_buf.parent().unwrap().to_str().unwrap().to_string(),
            full_path: file_buf.to_str().unwrap().to_string(),
            created_at,
            modified_at,
            synced_at: None,
            is_missing_file: false,
            is_out_of_sync: false,
            collection_id: "".to_string(),
            task_state: 0,
        };
        Ok(file)
    }
}

fn generate_dir_tree_recursive(root_dir: &mut Directory) -> Result<&mut Directory, FSManagerError> {
    // list all entries
    let entries = fs::read_dir(root_dir.full_path.clone()).map_err(IOError)?;

    // loop over entries
    for entry in entries {
        let entry = entry.expect("failed to read entry");
        let path = entry.path();


        let is_file = path.is_file();

        // if path is file
        if is_file {
            let file = FSManager::path_buf_to_file(&path)?;
            root_dir.files.push(file);
        }

        // if path is directory then recursively scan directory
        if path.is_dir() {
            let mut dir = FSManager::path_buf_to_directory(&path)?;
            generate_dir_tree_recursive(&mut dir)?;
            root_dir.sub_dirs.push(dir);
        }
    }

    Ok(root_dir)
}


#[cfg(test)]
mod test {
    use carrel_utils::test::test_folders::{get_test_fixture_module_folder_path, get_test_fixture_module_folder_path_buf};
    use super::*;

    #[test]
    fn test_generate_dir_tree() {
        let path = get_test_fixture_module_folder_path_buf("simple_directory");
        // assert existence
        assert!(path.exists());

        let tree = FSManager::generate_dir_tree(path.to_str().unwrap()).unwrap();

        // assert root directory
        assert_eq!(tree.name, "simple_directory");
        // it should have two sub directories
        assert_eq!(tree.sub_dirs.len(), 2);
        // it should have 1 root file
        assert_eq!(tree.files.len(), 1);
        let first_sub_dir = &tree.sub_dirs[0];
        // the first sub directory should have 1 file
        assert_eq!(first_sub_dir.files.len(), 1);
        // the name should be "first_dir_file_1.txt"
        assert_eq!(first_sub_dir.files[0].file_name, "first_dir_file_1.txt");
        // the first sub directory should have 1 sub directory
        assert_eq!(first_sub_dir.sub_dirs.len(), 1);
        let first_sub_dir_first_sub_dir = &first_sub_dir.sub_dirs[0];
        // the first sub directory should have 1 file
        assert_eq!(first_sub_dir_first_sub_dir.files.len(), 1);
        // the name should be "first_dir_first_sub_dir_file_1.txt"
        assert_eq!(first_sub_dir_first_sub_dir.files[0].file_name, "first_dir_first_subdir_1.txt");
        let second_sub_dir = &tree.sub_dirs[1];
        // the second sub directory should have 1 file
        assert_eq!(second_sub_dir.files.len(), 1);
        // the name should be "second_dir_file_1.txt"

    }
}