use std::net::SocketAddr;

use carrel_commons::carrel::FILE_DESCRIPTOR_SET;
use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_server::FirefliesServiceServer;
use carrel_commons::carrel::server::project_manager::v1::project_manager_service_server::ProjectManagerServiceServer;
use carrel_commons::carrel::server::scaffold::v1::scaffold_new_project_service_server::ScaffoldNewProjectServiceServer;
use carrel_commons::grpc::health::v1::health_server::HealthServer;
use tonic::transport::Server;

use crate::consts::server_addr::SERVER_ADDR;
use crate::launch::{attach_tracing_subscriber, load_cors};
use crate::services::firefly_keeper::service::FireflyService;
use crate::services::health::service::HealthService;
use crate::services::project_manager::service::ProjectService;
use crate::services::scaffold::service::ScaffoldService;

pub async fn launch_server() {

    dotenv::dotenv().ok();

    let address: SocketAddr = SERVER_ADDR.server_addr.as_str().parse().unwrap_or_else(|_| {
        // check if the address has a port, if not, provide an error message telling the user to provide a port
        if SERVER_ADDR.server_addr.contains(':') {
            panic!("Unable to parse address: {}", SERVER_ADDR.server_addr.as_str())
        } else {
            panic!("Unable to parse address: {}. Did you forget to provide a port?", SERVER_ADDR.server_addr.as_str())
        }
    });
    println!("Ip address: {}", &address.ip());


    attach_tracing_subscriber::attach_tracing_subscriber();
    // Add this


    let cors = load_cors::load_cors();

    // not refactored cause I'm not sure about the return type of the reflection service
    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(FILE_DESCRIPTOR_SET)
        .build()
        .unwrap();

    Server::builder()
        .accept_http1(true)
        .layer(cors)
        .add_service(
            tonic_web::config()
                .allow_all_origins()
                .enable(ScaffoldNewProjectServiceServer::new(ScaffoldService::default()))
        )
        // .enable(FirefliesServiceServer::new(FireflyService::default()))
        .add_service(
            tonic_web::config()
                .allow_all_origins()
                .enable(FirefliesServiceServer::new(FireflyService::default()))
        )
        .add_service(
            tonic_web::config()
                .allow_all_origins()
                .enable(ProjectManagerServiceServer::new(ProjectService::default()))
        )
        .add_service(
            tonic_web::config()
                .allow_all_origins()
                .enable(HealthServer::new(HealthService::default()))
        )
        .add_service(reflection_service)
        .serve(address)
        .await.expect("Cannot launch server");
}

