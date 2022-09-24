// build a schmea

use tantivy::Index;
use tantivy::schema::{Schema, STORED, TEXT};
use crate::indexer::constants::INDEX_MEMBORY_HEAP;

pub fn build_schema(index_directory: &str) -> Schema {
    let mut schema_builder = Schema::builder();
    // title field
    schema_builder.add_text_field("title", TEXT | STORED);
    // content fields
    schema_builder.add_text_field("content", TEXT | STORED);
    // file path field
    schema_builder.add_text_field("file_path", TEXT | STORED);

    let schema = schema_builder.build();

    schema

}

pub fn create_index(index_directory: &str) -> Index {
    let schema = build_schema(index_directory);
    let index = Index::create_in_dir(index_directory, schema).expect("Failed to create index");

    index
}

pub fn create_and_add_documents_to_index(index_directory: &str, docs: carrel_commons::carrel::common::) {

}
