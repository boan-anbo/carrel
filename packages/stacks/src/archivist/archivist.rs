use std::error::Error;
use std::path::PathBuf;
use carrel_commons::carrel::common::document::v1::Document;
use carrel_commons::carrel::stacks::services::v1::SearchResponse;
use crate::archivist::list_all_indices_under_dir::list_all_indices_under_dir;
use crate::indexer::create_index_for_documents::create_index_for_documents;
use crate::indexer::remove_index::remove_index;
use crate::searcher::searcher::search_index;

pub struct Archivist {}

pub trait Archive {
    // list all indices under a directory
    fn list_all_indices_under_dir(&self, dir: &str) -> Vec<String>;
    fn store_documents(&self, index_name: &str, index_dir: &str, documents: Vec<Document>) -> String;
    fn get_documents(&self, index_path: &str, query: &str) -> SearchResponse;
    fn remove_index(&self, index_path: &str);
}

impl Archive for Archivist {
    fn list_all_indices_under_dir(&self, dir: &str) -> Vec<String> {
        let indices = list_all_indices_under_dir(dir);
        indices
    }

    fn store_documents(&self, index_name: &str, index_dir: &str, documents: Vec<Document>) -> String {
        let created_index = create_index_for_documents(index_dir, index_name, documents).expect("failed to create index");
        created_index
    }

    fn get_documents(&self, index_path: &str, query: &str) -> SearchResponse {
        let search_responses = search_index(index_path, query);
        search_responses
    }

    fn remove_index(&self, index_path: &str) {
        remove_index(index_path);
    }
}
