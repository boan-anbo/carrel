use carrel_commons::grpc::health::v1::health_server::Health;

use carrel_commons::grpc::health::v1::{HealthCheckRequest, HealthCheckResponse};

use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct HealthService {}

#[tonic::async_trait]
impl Health for HealthService {
    async fn check(
        &self,
        _request: Request<HealthCheckRequest>,
    ) -> Result<Response<HealthCheckResponse>, Status> {
        let response = Response::new(HealthCheckResponse { status: 200 });
        Ok(response)
    }
}

// test
#[cfg(test)]
mod test {
    use carrel_commons::grpc::health::v1::health_client::HealthClient;

    use crate::consts::server_addr::SERVER_ADDR;
    use tonic::transport::Channel;

    use super::*;

    async fn get_client() -> HealthClient<Channel> {
        let client = HealthClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build firefly service client and connect to server")
    }

    #[tokio::test]
    async fn test_health_check() -> Result<(), Box<dyn std::error::Error>> {
        let response = get_client()
            .await
            .check(HealthCheckRequest {
                service: "server".to_string(),
            })
            .await;

        // there should be three tags
        assert_eq!(response.unwrap().into_inner().status, 200);

        Ok(())
    }
}
