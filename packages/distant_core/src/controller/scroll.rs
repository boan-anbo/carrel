use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use distant_es_client::responses::search_result::DistantSearchResult;
use serde_json::json;
use crate::api_error::ApiError;
use crate::distant_api::{DistantApiScrollRequest, DistantApiSearchResponse};
use crate::passage::Passage;

#[utoipa::path(
post,
path = "/scroll",
request_body = DistantApiScrollRequest,
responses(
(status = 201, description = "Tos item created successfully", body = DistantApiSearchResponse),
(status = 500, description = "Bad request", body = ApiError),
)
)]
pub(crate) async fn scroll(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(_request): Json<DistantApiScrollRequest>,
) -> impl IntoResponse {
    // insert your application logic here

    tracing::info!("scrolling for {}", _request.scroll_id);

    let es_client = distant_es_client::distant_client::DistantClient::new().await;

    // let search_result = es_client.search().await;
    let search_result: Result<DistantSearchResult, _> = es_client.scroll(
        _request.scroll_id.as_str(),
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
