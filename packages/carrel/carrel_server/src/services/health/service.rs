use std::pin::Pin;
use carrel_commons::grpc::health::v1::health_server::{Health};


use carrel_commons::grpc::health::v1::{HealthCheckRequest, HealthCheckResponse};
use futures_core::stream;
use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct HealthService {}

#[tonic::async_trait]
impl Health for HealthService {
    async fn check(&self, request: Request<HealthCheckRequest>) -> Result<Response<HealthCheckResponse>, Status> {
        let response = Response::new(
            HealthCheckResponse {
                status: 200,
            }
        );
        Ok(response)
    }

}

// test
#[cfg(test)]
mod test
{
    use std::path::Path;
    use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_client::FirefliesServiceClient;
    use carrel_commons::grpc::health::v1::health_client::HealthClient;
    use carrel_utils::test::test_folders::get_unit_test_module_folder;


    use tonic::transport::{Channel, Error};
    use crate::consts::server_addr::SERVER_ADDR;

    use super::*;


    async fn get_client() -> HealthClient<Channel> {
        let mut client = HealthClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build firefly service client and connect to server")
    }


    #[tokio::test]
    async fn test_health_check() -> Result<(), Box<dyn std::error::Error>> {
        let response = get_client().await.check(HealthCheckRequest {
            service: "server".to_string()
        }).await;

        // there should be three tags
        assert_eq!(response.unwrap().into_inner().status, 200);


        Ok(())
    }
}
