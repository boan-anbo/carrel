use axum::http::StatusCode;
use axum::Json;
use axum::response::{IntoResponse};

use crate::distant_api::{DistantApiSearchRequest, DistantApiSearchResponse};

#[utoipa::path(
post,
path = "/add_tos",
request_body = DistantApiSearchRequest,
responses(
(status = 201, description = "Tos item created successfully", body = DistantApiSearchResponse),
)
)]
pub(crate) async fn add_tos(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(_request): Json<DistantApiSearchRequest>,
) -> impl IntoResponse {
    // insert your application logic here

    tracing::info!("add_tos");

    // println!("{:?}", &request.query);

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    let response = DistantApiSearchResponse {
        passages: vec![],
        count: 1,
    };
    (StatusCode::CREATED, Json(response))
}
