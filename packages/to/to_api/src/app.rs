use std::borrow::Borrow;

use axum::Router;
use axum::routing::{get, post};
use to_core::to_dtos::to_add_dto::{ ToAddManyDto};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::api_paths::ApiPaths;
use crate::controllers::tags::scan_text_for_tags;
use crate::controllers::tos::{add_tos, find_tos};
use crate::to_api_dtos::{ToApiScanRequest, ToApiTagScanResult, ToApiTag};


pub fn get_app() -> Router {
    #[derive(OpenApi)]
    #[openapi(

    paths(
    crate::controllers::tos::add_tos,
    crate::controllers::tos::find_tos,
    crate::controllers::tags::scan_text_for_tags,
    ),
    components(
    schemas(
    to_core::to_dtos::to_add_dto::ToAddManyDto,
    to_core::to_dtos::to_add_dto::ToAddDto,
    ToApiScanRequest,
    ToApiTagScanResult,
    ToApiTag
    )
    ),
    tags(
    (name = "ToApi", description = "Textual Object Api")
    )

    )]
    pub(crate) struct ApiDoc;
// build our application with a route
    let app = Router::new()
        .merge(SwaggerUi::new("/swagger-ui/*tail").url("/api-doc/openapi.json", ApiDoc::openapi()))
        // `GET /` goes to `root`
        .route("/", get(crate::root))
        // `POST /users` goes to `create_user`
        .route("/add_tos", post(add_tos))
        .route("/find_tos", post(find_tos))
        .route(ApiPaths::ScanTags.into(), post(scan_text_for_tags));
    ;

    app
}
