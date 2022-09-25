use tantivy::Index;
use crate::indexer::get_index::get_index;

// check if a path is an index
pub fn is_path_index(path: &str) -> bool {
    let index = get_index(path);
    index.is_ok()
}

#[cfg(test)]
mod test {
    use uuid::Uuid;
    use crate::indexer::create_index_for_documents::create_index_for_documents;
    use super::*;

    // test is_path_index
    #[test]
    fn test_is_path_index() {
        let path = format!("C:\\{}", Uuid::new_v4().to_string());
        let is_index = super::is_path_index(&path);
        // negative case
        assert!(!is_index);

        // create index
        let created_index_dir = create_index_for_documents(&path, "test_is_path_index", vec![]).unwrap();
        let is_index = super::is_path_index(&created_index_dir);
        // positive case
        assert!(is_index);
        // clear the index
        std::fs::remove_dir_all(&created_index_dir).unwrap_or_default();
    }
}
