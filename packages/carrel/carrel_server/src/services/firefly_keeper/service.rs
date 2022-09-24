use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_server::FirefliesService;
use carrel_commons::carrel::server::firefly_keeper::v1::FireFliesResponse;
use carrel_commons::generic::api::request_directory::v1::DirectoryRequest;
use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct FireflyService {}

#[tonic::async_trait]
impl FirefliesService for FireflyService {
    async fn scan_folder_for_fireflies(&self, request: Request<DirectoryRequest>) -> Result<Response<FireFliesResponse>, Status> {
        let req = request.into_inner();
        let result = carrel_core::fireflies::procedures::scan_folder_for_fireflies(
            req.directory_path.as_str()
        ).unwrap();
        let res = Response::new(
            FireFliesResponse {
                fireflies: Some(result)
            });
        Ok(res)
    }
}

// test
#[cfg(test)]
mod test
{
    use std::path::Path;
    use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_client::FirefliesServiceClient;


    use tonic::transport::{Channel, Error};
    use crate::consts::server_addr::SERVER_ADDR;
    use crate::utils::tests::setup::setup_tests::{get_all_test_fixture_path, get_unit_test_fixture_path};

    use super::*;

    const MODULE_FIXTURE_FOLDER: &str = "firefly_keeper";


    async fn get_client() -> FirefliesServiceClient<Channel> {
        let mut client = FirefliesServiceClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build firefly service client and connect to server")
    }

    fn get_firefly_fixture_path() -> String {
        get_unit_test_fixture_path(MODULE_FIXTURE_FOLDER)
    }


    #[tokio::test]
    async fn test_scaffold_new_project() -> Result<(), Box<dyn std::error::Error>> {
        let request = DirectoryRequest {
            directory_path: get_firefly_fixture_path(),
            note: "firefly_fixture_test".to_string(),
        };

        let response = get_client().await.scan_folder_for_fireflies(request).await?;

        // there should be one note
        assert_eq!(response.into_inner().fireflies.unwrap().notes.len(), 1);

        Ok(())
    }
}
