use carrel_commons::carrel::stacks::services::v1::{DocumentResult, SearchResponse};

use tantivy::Index;
use tantivy::LeasedItem;

use tantivy::Searcher;
use tantivy::collector::TopDocs;


use crate::implementations::service_implementations::get_document_from_tantivy_doc;
use crate::indexer::get_index::get_index;
use crate::searcher::build_query::build_query;
use crate::searcher::schema::{DocFields, SearchDocument};

// search query in an index
pub fn search_index(index_path: &str, query_string: &str) -> SearchResponse {
    let index = get_index(index_path).expect("Failed to get index");
    let searcher = get_searcher(&index);
    // get fields from index

    // let query = query_parser.parse_query(&query_string).unwrap();
    let query = build_query(DocFields::as_fields(), query_string);
    let top_docs = searcher.search(&query, &TopDocs::with_limit(10)).unwrap();

    let mut document_results: Vec<DocumentResult> = vec![];
    top_docs
        .into_iter()
        .for_each(|(_score, doc_address)| {
            let retrieved_doc = searcher.doc(doc_address).unwrap();
            let document = get_document_from_tantivy_doc(retrieved_doc, _score.abs());
            document_results.push(document);
        });

    SearchResponse {
        documents: document_results,
        index: index_path.to_string(),
        query: query_string.to_string(),
        ..SearchResponse::default()
    }
}


fn get_searcher(index: &Index) -> LeasedItem<Searcher> {
    let reader = index.reader().expect("Failed to get index reader");
    let searcher = reader.searcher();
    searcher
}


#[cfg(test)]
mod test {
    use carrel_utils::test::use_unit_test_fixture_folder::get_unit_test_fixture_path;

    use crate::indexer::create_index_for_documents::create_index_for_documents;

    use crate::searcher::searcher::search_index;
    use crate::test_utils::util_func::{get_sample_chinese_documents, get_sample_documents};

    const MODULE_NAME: &str = "test_searcher";

    #[test]
    fn test_search_index() {
        let folder = get_unit_test_fixture_path(MODULE_NAME);

        // clear folder
        std::fs::remove_dir_all(folder.clone()).unwrap_or_default();

        let get_sample_documents = get_sample_documents(11);
        let index_url = create_index_for_documents(&folder, MODULE_NAME, get_sample_documents).unwrap();

        let one_result = search_index(&index_url, "title 2");
        assert_eq!(one_result.documents.len(), 10);
        let one_result_json = serde_json::to_string_pretty(&one_result).unwrap();
        println!("One result: {}", one_result_json);

        let no_result = search_index(&index_url, "title 12");
        assert_eq!(no_result.documents.len(), 10);
        let no_result_json = serde_json::to_string_pretty(&no_result).unwrap();
        println!("No result: {}", no_result_json);
    }

    // test search chinese
    #[test]
    fn test_search_chinese() {
        let folder = get_unit_test_fixture_path(MODULE_NAME);

        // clear folder
        std::fs::remove_dir_all(folder.clone()).unwrap_or_default();

        let get_sample_documents = get_sample_chinese_documents(11);
        let index_url = create_index_for_documents(&folder, MODULE_NAME, get_sample_documents).unwrap();

        let one_result = search_index(&index_url, "标题 5");
        assert_eq!(one_result.documents.len(), 10);
        let one_result_json = serde_json::to_string_pretty(&one_result).unwrap();
        println!("One result: {}", one_result_json);

        let no_result = search_index(&index_url, "title 12");
        assert_eq!(no_result.documents.len(), 0);
        let no_result_json = serde_json::to_string_pretty(&no_result).unwrap();
        println!("No result: {}", no_result_json);
    }
}
