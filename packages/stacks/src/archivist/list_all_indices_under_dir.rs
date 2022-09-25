use std::error::Error;
use std::fs::read_dir;
use std::path::PathBuf;
use crate::indexer::is_path_index::is_path_index;

pub fn list_all_indices_under_dir(dir: &str) -> Vec<String> {
    let mut indices = vec![];
    let paths = read_dir(dir).expect("failed to read dir");
    for path in paths {
        let path = path.unwrap().path();
        let path_str = path.to_str().unwrap();
        if is_path_index(path_str) {
            indices.push(path_str.to_string());
        }
    }
    indices
}

#[cfg(test)]
mod test {
    use carrel_utils::test::use_unit_test_fixture_folder::get_unit_test_fixture_path;
    use uuid::Uuid;
    use crate::indexer::create_index_for_documents::create_index_for_documents;
    use super::*;

    // test list_all_indices_under_dir
    #[test]
    fn test_list_all_indices_under_dir() {

        // directory
        let test_dir = get_unit_test_fixture_path("test_list_all_indices_under_dir");

        // clear the initial folder if exists
        std::fs::remove_dir_all(test_dir.clone()).unwrap_or_default();

        // create index
        let created_index_dir_1 = create_index_for_documents(&test_dir, "index_dir1", vec![]).unwrap();
        let created_index_dir_2 = create_index_for_documents(&test_dir, "index_dir2", vec![]).unwrap();
        let created_index_dir_3 = create_index_for_documents(&test_dir, "index_dir3", vec![]).unwrap();

        let indices = super::list_all_indices_under_dir(&test_dir);
        // positive case
        assert_eq!(indices.len(), 3);
        // clear the index
        std::fs::remove_dir_all(&test_dir).unwrap_or_default();
    }
}
