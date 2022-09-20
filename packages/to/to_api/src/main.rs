use std::net::SocketAddr;

use axum::{
    http::StatusCode,
    response::IntoResponse,
    Router, routing::{get, post},
};
use tracing::Level;
use tracing_subscriber::FmtSubscriber;
use utoipa_swagger_ui::SwaggerUi;

use crate::controllers::tos::{add_tos, find_tos};

mod controllers;
mod app;
pub mod api_doc;
pub mod api_paths;
pub(crate) mod test_utils;
pub mod open_api_paths;
pub mod dto_impls;

pub mod to_api_dtos {
    include!("dtos/to_api_dtos.rs");
}


use open_api_paths::{SWAGGER_PATH, OPENAPI_SPEC_JSON_PATH};
#[tokio::main]
async fn main() {

    // check if user provided port
    let args: Vec<String> = std::env::args().collect();

    // get first arg
    let user_provided_port = args.get(1).unwrap_or(&"13003".to_string()).clone();
    // try parse port as number
    let port: u16 = user_provided_port.parse().unwrap();

    // initialize .env
    dotenv::dotenv().ok();

    // initialize tracing
    // tracing_subscriber::fmt::init();

    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::DEBUG)
        .finish();
    tracing::subscriber::set_global_default(subscriber).expect("setting default subscriber failed");

    let app = app::get_app();

    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    tracing::info!("listening on {}", addr);
    tracing::info!("swagger ui available at {}{}", addr, SWAGGER_PATH.replace("*tail", ""));
    tracing::info!("openapi spec available at {}{}", addr, OPENAPI_SPEC_JSON_PATH);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// basic handler that responds with a static string
async fn root() -> &'static str {
    "Hello, Textual World!"
}

