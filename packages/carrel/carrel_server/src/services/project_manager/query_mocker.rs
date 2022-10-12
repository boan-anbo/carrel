use carrel_commons::carrel::common::firefly::v2::Firefly as FireflyV2;
use carrel_commons::carrel::server::project_manager::v1::{QueryFirefliesRequest, QueryFirefliesResponse};
use carrel_commons::generic::api::query::v1::StandardQueryResultMetadata;
use carrel_utils::fake::Fake;
use carrel_utils::fake::faker::lorem;
use carrel_utils::fake::faker::lorem::en::{Word, Words};
use carrel_utils::fake::faker::lorem::raw::Sentence;
use carrel_utils::uuid::new_v4;
use tonic::{async_trait, Response, Status};

pub struct QueryMocker {}

#[async_trait]
pub trait QueryMockerTrait {
    async fn mock_query_fireflies(req: QueryFirefliesRequest) -> Result<Response<QueryFirefliesResponse>, Status>;
}

#[async_trait]
impl QueryMockerTrait for QueryMocker {
    async fn mock_query_fireflies(req: QueryFirefliesRequest) -> Result<Response<QueryFirefliesResponse>, Status> {
        let query = req.query.unwrap();

        let mut fireflies = Vec::new();
        let length = query.length;

        for i in 0..length {
            let random = get_sample_firefly(i);
            fireflies.push(random);
        }


        let res = QueryFirefliesResponse {
            project_directory: "mock_directory".to_string(),
            response_metadata: Some(StandardQueryResultMetadata{
                result_items: fireflies.len() as i32,
                offset: query.offset,
                length,
                page: query.page,
                result_total_pages:  query.page * 5,
                result_total_items: (fireflies.len() * 5) as i32,
                query: Some(query),
                filter_count: None,
                filter_reason: None
            }),
            fireflies,
        };

        Ok(Response::new(res))

    }
}

fn get_sample_firefly(index: i32) -> FireflyV2 {
    FireflyV2 {
        uuid: new_v4().to_string(),
        title: format!("Title {}", index),
        description: format!("Description {}", index),
        light: format!("Light {}", index),
        context: format!("Context {}", index),
        full_text: format!("Full Text {}", index),
        comment: format!("Comment {}", index),
        comment_author: "".to_string(),
        comment_created_at: "".to_string(),
        comment_modified_at: "".to_string(),
        importance: 0,
        location_actual: "".to_string(),
        location_actual_type: "".to_string(),
        location_raw: "".to_string(),
        location_raw_type: "".to_string(),
        document_title: "".to_string(),
        document_description: "".to_string(),
        document_reference: "".to_string(),
        document_publication_year: 0,
        document_publication_datetime: "".to_string(),
        document_author: "".to_string(),
        document_metadata: Default::default(),
        document_id: "".to_string(),
        document_id_type: "".to_string(),
        document_storage_id: "".to_string(),
        document_storage_id_type: "".to_string(),
        document_storage_url: "".to_string(),
        file_directory: "".to_string(),
        file_full_name: "".to_string(),
        file_extension: "".to_string(),
        file_full_path: "".to_string(),
        select_tag: None,
        tags: vec![],
        storage_id_str: "".to_string(),
        storage_id_int: 0,
        storage_description: "".to_string(),
        storage_url: "".to_string(),
        created_at: "".to_string(),
        modified_at: "".to_string(),
        extracted_at: "".to_string(),
        viewed_at: "".to_string(),
        collection_uuids: vec![],
        metadata: Default::default(),
        more_comments: Default::default(),
        location_actual_modified_at: "".to_string(),
        document_pages: 0,
        unique_id: "".to_string(),
    }
}