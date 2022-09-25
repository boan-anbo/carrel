use tantivy::{Index, TantivyError};


// get an index instance from a given index path
pub fn get_index(index_path: &str) -> Result<Index, TantivyError> {
    let index = Index::open_in_dir(index_path)?;
    Ok(index)
}

#[cfg(test)]
mod test {
    use carrel_commons::carrel::common::document::v1::Document;
    use carrel_commons::carrel::common::file::v1::File;
    use carrel_utils::test::use_unit_test_fixture_folder::get_unit_test_fixture_path;
    use uuid::Uuid;
    use crate::indexer::create_index_for_documents::create_index_for_documents;

    use super::*;

    // test get_index
    #[test]
    pub fn test_get_index() {
        // the parent dictory of the index
        let test_module_name = "test_get_index";
        // the index name, which will be used as the sub dictory of the parent dictory
        let index_name = "test_get_index";
        // the path to the test fixture folder
        let index_directory = get_unit_test_fixture_path(test_module_name);
        // the path to the index, should be the same as the one returned by the function after successful indexing.
        let index_path_intial = format!("{}/{}", &index_directory, index_name);

        // clear the initial folder
        std::fs::remove_dir_all(index_path_intial.clone()).unwrap_or_default();
        // use for loop to do the above
        let mut docs = Vec::new();
        for i in 1..1_000 {
            let doc = Document {
                title: format!("title{}", i),
                content: format!("content{}", i),
                files: vec![File {
                    uuid: Uuid::new_v4().to_string(),
                    file_name: format!("file{}", i),
                    file_full_path: format!("file{}", i),
                    file_extension: "txt".to_string(),
                    file_dir: format!("dir{}", i),
                }],
                ..Document::default()
            };
            docs.push(doc);
        }
        let index_url = create_index_for_documents(&index_directory, index_name, docs).unwrap();
        // read the index
        let index = get_index(&index_url).unwrap();
        // get the path of the index
    }
}
