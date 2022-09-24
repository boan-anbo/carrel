use std::net::SocketAddr;


use tonic::transport::Server;
use crate::attach_tracing_subscriber;

use crate::load_cors;
use crate::load_health_reporter;

use crate::proto_scaffold;
use crate::ScaffoldNewProjectServiceServer;

pub async fn launch_server() {
    let address: SocketAddr = "127.0.0.1:8081".parse().unwrap();
    println!("{}", &address.ip());
    let scaffold_service = crate::scaffold::service::ScaffoldService::default();

    dotenv::dotenv().ok();

    load_health_reporter::load_health_reporter().await;

    attach_tracing_subscriber::attach_tracing_subscriber();
    // Add this


    let cors = load_cors::load_cors();

    // not refactored cause I'm not sure about the return type of the reflection service
    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(proto_scaffold::FILE_DESCRIPTOR_SET)
        .build()
        .unwrap();

    Server::builder()
        .accept_http1(true)
        .layer(cors)
        .add_service(tonic_web::config()
            .allow_all_origins().enable(ScaffoldNewProjectServiceServer::new(scaffold_service)))
        .add_service(reflection_service)
        .serve(address)
        .await.expect("Cannot launch server");
}

