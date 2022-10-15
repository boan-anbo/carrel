use carrel_commons::carrel::common::file::v1::File;
use carrel_commons::carrel::common::firefly::v2::Firefly as FireflyV2;
use carrel_commons::carrel::server::project_manager::v1::{QueryFilesRequest, QueryFilesResponse, QueryFirefliesRequest, QueryFirefliesResponse};
use carrel_commons::generic::api::query::v1::{SortCondition, SortDirection, StandardQueryResultMetadata};
use carrel_utils::uuid::new_v4;
use tonic::{async_trait, Response, Status};

pub struct QueryMocker {}

#[async_trait]
pub trait QueryMockerTrait {
    async fn mock_query_fireflies(req: QueryFirefliesRequest) -> Result<Response<QueryFirefliesResponse>, Status>;
    async fn mock_query_files(req: QueryFilesRequest) -> Result<Response<QueryFilesResponse>, Status>;
}

#[async_trait]
impl QueryMockerTrait for QueryMocker {
    async fn mock_query_fireflies(req: QueryFirefliesRequest) -> Result<Response<QueryFirefliesResponse>, Status> {
        let query = req.query.unwrap();

        let mut fireflies = Vec::new();
        let length = query.length;

        for i in 0..length {
            let random = get_sample_firefly(query.offset.checked_add(i).unwrap());
            fireflies.push(random);
        }

        let query_sort = query.sort.clone();
        if query_sort.is_some() {
            match SortDirection::from_i32(query_sort.unwrap().order).unwrap_or(SortDirection::Unspecified) {
                SortDirection::Unspecified => {}
                SortDirection::Asc => fireflies.sort_by(|a, b| a.title.cmp(&b.title)),
                SortDirection::Desc => fireflies.sort_by(|a, b| b.title.cmp(&a.title)),
            }
        }

        if query.filter.is_some() {
            let filter_set = query.filter.clone().unwrap();
            let global_filter = filter_set.global_filter.unwrap();
            fireflies.retain(|firefly| firefly.title.contains(&global_filter));
        }

        let res = QueryFirefliesResponse {
            project_directory: "mock_directory".to_string(),
            response_metadata: Some(StandardQueryResultMetadata {
                result_items: fireflies.len() as i32,
                offset: query.offset,
                length,
                page: query.page,
                result_total_pages: query.page * 5,
                result_total_items: (fireflies.len() * 5) as i32,
                query: Some(query),
                filter_count: None,
                filter_reason: None,
            }),
            fireflies,
        };


        Ok(Response::new(res))
    }

    async fn mock_query_files(req: QueryFilesRequest) -> Result<Response<QueryFilesResponse>, Status> {
        let query = req.query.unwrap();

        let mut files = Vec::new();
        let length = query.length;

        for i in 0..length {
            let random = get_sample_file(query.offset.checked_add(i).unwrap());
            files.push(random);
        }

        let query_sort = query.sort.clone();
        if query_sort.is_some() {
            match SortDirection::from_i32(query_sort.unwrap().order).unwrap_or(SortDirection::Unspecified) {
                SortDirection::Unspecified => {}
                SortDirection::Asc => files.sort_by(|a, b| a.file_name.cmp(&b.file_name)),
                SortDirection::Desc => files.sort_by(|a, b| b.file_name.cmp(&a.file_name)),
            }
        }

        if query.filter.is_some() {
            let filter_set = query.filter.clone().unwrap();
            if let Some(global_filter) = filter_set.global_filter {
                files.retain(|file| file.file_name.contains(&global_filter));
            }
        }

        let res = QueryFilesResponse {
            project_directory: "mock_directory".to_string(),
            response_metadata: Some(StandardQueryResultMetadata {
                result_items: files.len() as i32,
                offset: query.offset,
                length,
                page: query.page,
                result_total_pages: query.page * 5,
                result_total_items: (files.len() * 5) as i32,
                query: Some(query),
                filter_count: None,
                filter_reason: None,
            }),
            files,
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

fn get_sample_file(index: i32) -> File {
    File {
        // id: 0,
        // uuid: "".to_string(),
        // description: "".to_string(),
        // importance: 0,
        // file_name: "".to_string(),
        // extension: "".to_string(),
        // directory: "".to_string(),
        // full_path: "".to_string(),
        // created_at: "".to_string(),
        // modified_at: "".to_string(),
        // synced_at: None,
        // is_missing_file: false,
        // is_out_of_sync: false,
        // collection_id: "".to_string(),
        // task_state: 0
        id: index,
        uuid: new_v4().to_string(),
        description: format!("Description {}", index),
        importance: 0,
        file_name: format!("File Name {}", index),
        extension: format!("Extension {}", index),
        directory: format!("Directory {}", index),
        full_path: format!("Full Path {}", index),
        created_at: format!("Created At {}", index),
        modified_at: format!("Modified At {}", index),
        synced_at: None,
        is_missing_file: false,
        is_out_of_sync: false,

        collection_id: "".to_string(),
        task_state: 0,
    }
}
