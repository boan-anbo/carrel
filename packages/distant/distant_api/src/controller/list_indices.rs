use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use distant_es_client::responses::search_result::DistantSearchResult;
use serde_json::json;
use crate::api_error::ApiError;
use crate::distant_api::{DistantApiSearchRequest, DistantApiSearchResponse, DistantListIndexResponse};
use crate::passage::Passage;

#[utoipa::path(
get,
path = "/list_indices",
responses(
(status = 201, description = "Available indices successfully", body = DistantListIndexResponse),

(status = 500, description = "Bad request", body = ApiError),
)
)]
pub(crate) async fn list_indices() -> impl IntoResponse {
    // insert your application logic here

    tracing::info!("checking list of indices");

    let es_client = distant_es_client::distant_client::DistantClient::new().await;

    let indices_result = es_client.list_indices().await;

    match indices_result {
        Ok(indices) => {
            let response = DistantListIndexResponse::from(indices);
            (StatusCode::CREATED, Json(response)).into_response()
        },
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(ApiError {
            code: StatusCode::INTERNAL_SERVER_ERROR.to_string(),
            message: "Es Client list indices failure".to_string(),
            suggestion: "Check if Es server is up and running".to_string(),
            user_payload: String::new(),
            payload_for_user: "".to_string(),
        })).into_response(),
    }

}
