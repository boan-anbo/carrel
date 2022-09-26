use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_server::FirefliesService;
use carrel_commons::carrel::server::firefly_keeper::v1::FireFliesResponse;
use carrel_commons::generic::api::request_directory::v1::GenericDirectoryRequest;
use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct FireflyService {}

#[tonic::async_trait]
impl FirefliesService for FireflyService {
    async fn scan_folder_for_fireflies(&self, request: Request<GenericDirectoryRequest>) -> Result<Response<FireFliesResponse>, Status> {
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
    use carrel_utils::test::test_folders::get_unit_test_module_folder;


    use tonic::transport::{Channel, Error};
    use crate::consts::server_addr::SERVER_ADDR;

    use super::*;

    const MODULE_FIXTURE_FOLDER: &str = "firefly_keeper";


    async fn get_client() -> FirefliesServiceClient<Channel> {
        let mut client = FirefliesServiceClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build firefly service client and connect to server")
    }

    fn get_firefly_fixture_path() -> String {
        get_unit_test_module_folder(MODULE_FIXTURE_FOLDER)
    }


    #[tokio::test]
    async fn test_scan_for_fireflies() -> Result<(), Box<dyn std::error::Error>> {
        let request = GenericDirectoryRequest {
            directory_path: get_firefly_fixture_path(),
            note: "firefly_fixture_test".to_string(),
        };

        let response = get_client().await.scan_folder_for_fireflies(request).await?;
        let response_value = response.into_inner();

        // there should be three tags
        assert_eq!(response_value.fireflies.unwrap().all_tags_count, 2);



        Ok(())
    }
}
