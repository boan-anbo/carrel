use axum::routing::{post};
use axum::Router;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::controller::add_tos;
use crate::distant_api::{DistantApiSearchRequest, DistantApiSearchResponse};
use crate::passage::Passage;
use crate::person::Person;
use crate::file::File;
use crate::document::Document;

pub fn get_app() -> Router {
    #[derive(OpenApi)]
    #[openapi(

    paths(
    crate::controller::add_tos,
    ),
    components(
    schemas(
    DistantApiSearchRequest,
    DistantApiSearchResponse,
    Passage,
    Document,
    Person,
    File
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
        // `POST /users` goes to `create_user`
        .route("/add_tos", post(add_tos));
    app
}
