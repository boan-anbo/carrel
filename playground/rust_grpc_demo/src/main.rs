use tonic::{transport::Server, Request, Response, Status};


use bookstore::{CarrelTestRequest, CarrelTestResponse};
use crate::bookstore::carrel_test_service_server::{CarrelTestService, CarrelTestServiceServer};

mod bookstore {
    include!("carrel.test_proto.rs");


    // Add this
    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("greeter_descriptor");
}


#[derive(Default)]
pub struct BookStoreImpl {}

#[tonic::async_trait]
impl CarrelTestService for BookStoreImpl {
    async fn test(&self, request: Request<CarrelTestRequest>) -> Result<Response<CarrelTestResponse>, Status> {
        let req = request.into_inner();
        println!("Got a request: {:?}", &req.name);
        Ok(Response::new(CarrelTestResponse {
            message: format!("Hello {}!", req.name)
        }))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:50051".parse().unwrap();
    let bookstore = BookStoreImpl::default();

    println!("Bookstore server listening on {}", addr);

    // Add this
    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(bookstore::FILE_DESCRIPTOR_SET)
        .build()
        .unwrap();

    Server::builder()
        .add_service(CarrelTestServiceServer::new(bookstore))
        .add_service(reflection_service)
        .serve(addr)
        .await?;

    Ok(())
}