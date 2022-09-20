use axum::http::StatusCode;
use axum::Json;
use axum::response::IntoResponse;
use to_core::to_dtos::to_add_dto::ToAddDto;
use to_core::to_dtos::to_add_dto::ToAddManyDto;
use to_core::to_dtos::to_find_dto::ToFindRequestDto;
use to_core::to_dtos::to_find_dto::ToFindResultDto;
use to_core::to_machine::to_machine_struct::ToMachine;

#[utoipa::path(
post,
path = "/find_tos",
request_body = TextualObjectFindRequestDto,
responses(
(status = 201, description = "Tos item created successfully", body = TextualObjectFindResultDto),
)
)]
pub(crate) async fn find_tos(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(_payload): Json<ToFindRequestDto>,
) -> impl IntoResponse {
    // insert your application logic here

    let mut tom = ToMachine::new_from_find_dto(
        &_payload).await;

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    let result = tom.find_tos_by_ticket_ids(&_payload).await.unwrap();

    (StatusCode::CREATED, Json(result))
}

#[utoipa::path(
post,
path = "/add_tos",
request_body = TextualObjectAddManyDto,
responses(
(status = 201, description = "Tos item created successfully", body = TextualObjectStoredReceipt),
)
)]
pub(crate) async fn add_tos(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(_payload): Json<ToAddManyDto>,
) -> impl IntoResponse {

    let mut tom = ToMachine::new_from_add_dto(
        &_payload).await;

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    let receipt = tom.add_tos(_payload).await.unwrap();
    (StatusCode::CREATED, Json(receipt))
}

// test
#[cfg(test)]
mod test {
    use std::collections::HashMap;

    use axum::body::{Body, HttpBody};
    use axum::http;
    use axum::http::{Request, StatusCode};
    use serde_json::{json, Value};
    use tower::ServiceExt;

    use crate::api_paths::ApiPaths;
    use crate::app::get_app;
    use crate::test_utils::test_utils::get_test_folder_path_string;

    use super::*;

    #[tokio::test]
    async fn add_todos_should_work() {
        let app = get_app();
        // get cargo test folder
        let cargo_test_folder = get_test_folder_path_string();
        // get cargo test folder


        let mut tos: Vec<ToAddDto> = Vec::new();

        let request_body = ToAddManyDto {
            store_dir: cargo_test_folder,
            tos,
            ..Default::default()
        };

        let response = app
            .oneshot(
                Request::builder()
                    .method(http::Method::POST)
                    .uri(ApiPaths::AddTos.to_string())
                    .header(http::header::CONTENT_TYPE, mime::APPLICATION_JSON.as_ref())
                    .body(Body::from(
                        serde_json::to_vec(&json!(request_body)).unwrap(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();


        println!("{:?}", &response);
        let status = &response.status();

        let body = hyper::body::to_bytes(response.into_body()).await.unwrap();
        let body: Value = serde_json::from_slice(&body).unwrap();

        println!("{:?}", &body);

        assert_eq!(status, &StatusCode::CREATED);
        assert_eq!(body, json!({ "data": [1, 2, 3, 4] }));
    }
}
