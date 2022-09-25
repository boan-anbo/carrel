// build a schmea

use std::fmt::Debug;

use carrel_commons::carrel::common::document::v1::Document;
use retry::delay::Fixed;
use retry::retry;
use tantivy::{doc, Index, Opstamp, TantivyError};
use tantivy::schema::{Schema, STORED, TEXT};
use tantivy::time::error::Error;
use crate::searcher::schema::{DocFields, SearchDocument};
use crate::indexer::index_memory_size::INDEX_MEMBORY_HEAP;

/// create an index for documents and return the path to the created index
///
/// # Returns
/// * the path to the created index
pub fn create_index_for_documents(index_directory: &str, index_name: &str, docs: Vec<Document>) -> Result<String, TantivyError> {

    // title field
    let fields = DocFields::as_fields();

    let schema = DocFields::as_schema();

    let index_path = format!("{}/{}", index_directory, index_name);

    // create the index path if it doesn't exist
    std::fs::create_dir_all(index_path.clone()).unwrap();

    let index = Index::create_in_dir(&index_path, schema).expect("Failed to create index");
    let mut index_writer = index.writer(INDEX_MEMBORY_HEAP as usize).unwrap();
    for doc in docs {
        let _ = index_writer.add_document(doc!(
            fields.title => doc.title,
            fields.description => doc.description,
            fields.citation => doc.citation,
            fields.publication_date => doc.publication_date,
            fields.creator => doc.creators.into_iter().map(|c| c.first_name).collect::<Vec<String>>().join(", "),
            fields.source_id => doc.source_id,
            fields.source_id_type => doc.source_id_type,
            fields.source_url => doc.source_url,
            fields.archive_location => doc.archive_location,
            fields.file_fullpath => doc.files.first().unwrap().file_full_path.as_str(),
            fields.file_name => doc.files.first().unwrap().file_name.as_str(),
            fields.file_extension => doc.files.first().unwrap().file_extension.as_str(),
            fields.file_dir => doc.files.first().unwrap().file_dir.as_str(),
            fields.pages => doc.pages,
            fields.modified => doc.modified,
            fields.created => doc.created,
            fields.content => doc.content,
            fields.uuid => doc.uuid,
        ));
    }

    // retry to commit the index if it fails
    let result = retry(Fixed::from_millis(100).take(10), || {
        index_writer.commit().map_err(|e| {
            println!("Failed to commit index: {:?}", e);
            e
        })
    });

    match result {
        Ok(_) => Ok(index_path),
        Err(e) => Err(e.error),
    }
}

#[cfg(test)]
mod test {
    use carrel_commons::carrel::common::file::v1::File;
    use carrel_utils::test::use_unit_test_fixture_folder::get_unit_test_fixture_path;
    use uuid::Uuid;

    use crate::indexer::get_index::get_index;
    use crate::test_utils::util_func::get_sample_documents;

    use super::*;

    #[test]
    pub fn test_create_index_for_sample_documents() {
        // the parent dictory of the index
        let test_module_name = "test_create_index_for_documents";
        // the index name, which will be used as the sub dictory of the parent dictory
        let index_name = "test_adding_multiple_documents";
        // the path to the test fixture folder
        let index_directory = get_unit_test_fixture_path(test_module_name);
        // the path to the index, should be the same as the one returned by the function after successful indexing.
        let index_path_intial = format!("{}/{}", &index_directory, index_name);

        // clear the initial folder
        std::fs::remove_dir_all(index_path_intial.clone()).unwrap_or_default();
        // use for loop to do the above
        let mut docs = get_sample_documents(10000);

        let index_path_created = create_index_for_documents(&index_directory, index_name, docs).unwrap();

        assert_eq!(index_path_intial, index_path_created);
        // std::fs::remove_dir_all(index_dir).unwrap();
    }
}

