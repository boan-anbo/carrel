use std::net::SocketAddr;
use tonic::codegen::http::Method;
use tonic::transport::Server;
use tower_http::cors::{Any, CorsLayer};
use tracing::Level;
use tracing_subscriber::FmtSubscriber;
use crate::scaffold::scaffold_new_project_service_server::ScaffoldNewProjectServiceServer;
use crate::scaffold_service::scaffold_service::ScaffoldService;

mod scaffold_service;

pub mod scaffold {
    include!("generated/carrel_scaffold.v1.rs");

    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("carrel_descriptor");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let address: SocketAddr = "127.0.0.1:8081".parse().unwrap();
    println!("{}",&address.ip());
    let scaffold_service = ScaffoldService::default();

    dotenv::dotenv().ok();

    let (mut health_reporter, health_service) = tonic_health::server::health_reporter();
    health_reporter
        .set_serving::<ScaffoldNewProjectServiceServer<ScaffoldService>>()
        .await;

    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::DEBUG)
        .finish();

    tracing::subscriber::set_global_default(subscriber).expect("setting default subscriber failed");
    // Add this

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(scaffold::FILE_DESCRIPTOR_SET)
        .build()
        .unwrap();

    let cors = CorsLayer::new()
        // allow `GET` and `POST` when accessing the resource
        .allow_methods([Method::GET, Method::POST])
        // allow requests from any origin
        .allow_origin(Any)
        .allow_headers(Any);

    Server::builder()
        .accept_http1(true)
        .layer(cors)
        .add_service(tonic_web::config()
            .allow_all_origins().enable(ScaffoldNewProjectServiceServer::new(scaffold_service)))
        .add_service(reflection_service)
        .serve(address)
        .await?;
    Ok(())

}
