use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use distant_es_client::responses::search_result::DistantSearchResult;
use serde_json::json;
use crate::api_error::ApiError;
use crate::distant_api::{DistantApiSearchRequest, DistantApiSearchResponse};
use crate::passage::Passage;

#[utoipa::path(
post,
path = "/search",
request_body = DistantApiSearchRequest,
responses(
(status = 201, description = "Tos item created successfully", body = DistantApiSearchResponse),
(status = 500, description = "Bad request", body = ApiError),
)
)]
pub(crate) async fn search(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(_request): Json<DistantApiSearchRequest>,
) -> impl IntoResponse {
    // insert your application logic here

    tracing::info!("searching for {}", _request.query);

    let es_client = distant_es_client::distant_client::DistantClient::new().await;

    // map indices to Vec<&str>
    let indices: Vec<&str> = _request.indices.iter().map(|s| s.as_str()).collect();
    // let search_result = es_client.search().await;
    let search_result: Result<DistantSearchResult, _> = es_client.search(
        indices,
        _request.query.as_str(),
    ).await;

    match search_result {
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(ApiError {
            code: StatusCode::INTERNAL_SERVER_ERROR.to_string(),
            message: "Es Client search failure".to_string(),
            suggestion: "Check if Es server is up and running".to_string(),
            user_payload: json!(_request).to_string(),
            payload_for_user: "".to_string(),
        })).into_response(),
        Ok(r) => {

            let response = DistantApiSearchResponse::from(&r);
            (StatusCode::CREATED, Json(response)).into_response()
        }
    }
}
