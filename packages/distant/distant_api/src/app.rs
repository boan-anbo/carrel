use axum::http::Method;
use axum::routing::{post};
use axum::Router;
use tower_http::cors::{any, Any, CorsLayer};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;
use crate::controller::search::search;
use crate::controller::scroll::scroll;

use crate::distant_api::{
    DistantApiScrollRequest,
    DistantApiSearchRequest,
    DistantApiSearchResponse,
    DistantListIndexResponse,
    IndexInfo
};
use crate::passage::Passage;
use crate::person::Person;
use crate::file::File;
use crate::document::Document;
use crate::api_error::ApiError;
use crate::controller::list_indices::list_indices;

pub const SWAGGER_PATH: &'static str = "/swagger-ui/*tail";

pub const OPENAPI_SPEC_JSON_PATH: &'static str = "/api-doc/openapi.json";

pub fn get_app() -> Router {
    #[derive(OpenApi)]
    #[openapi(

    paths(
    crate::controller::search::search,
    crate::controller::scroll::scroll,
    crate::controller::list_indices::list_indices,
    ),
    components(
    schemas(
    DistantApiSearchRequest,
    DistantApiSearchResponse,
    DistantApiScrollRequest,
    Passage,
    Document,
    Person,
    File,
    ApiError,
    IndexInfo,
    DistantListIndexResponse
    )
    ),
    tags(
    (name = "ToApi", description = "Textual Object Api")
    )
    )]
    pub(crate) struct ApiDoc;

    let cors = CorsLayer::new()
        // allow `GET` and `POST` when accessing the resource
        .allow_methods(vec![Method::GET, Method::POST])
        .allow_headers(Any)
        // allow requests from any origin
        .allow_origin(Any);
    // build our application with a route
    let app = Router::new()
        .merge(SwaggerUi::new(SWAGGER_PATH).url(OPENAPI_SPEC_JSON_PATH, ApiDoc::openapi()))
        .route("/search", post(search))
        .route("/scroll", post(scroll))
        .route("/list_indices", axum::routing::get(list_indices));
    app.layer(cors)
}
