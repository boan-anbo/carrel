use std::error::Error;
use std::path::Path;
use crate::indexer::is_path_index::is_path_index;

// remove index path
pub fn remove_index(path: &str) {
    // check if the dir exists
    if !Path::new(path).exists() {
        return;
    }

    // check if the path is an index
    if !is_path_index(path) {
        return;
    };

    // remove the index
    std::fs::remove_dir_all(path).expect(format!("failed to remove index {}", path).as_str());
}
