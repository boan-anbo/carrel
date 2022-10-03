use carrel_commons::carrel::server::firefly_keeper::v1::{ScanFilesForFirefliesRequest, ScanFilesForFirefliesResponse, ScanFolderForFirefliesRequest, ScanFolderForFirefliesResponse};
use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_server::FirefliesService;
use carrel_core::fireflies::procedures::{FireflyKeeperOption, scan_file_for_fireflies};
use tonic::{Request, Response, Status};


#[derive(Debug, Default)]
pub struct FireflyService {}

#[tonic::async_trait]
impl FirefliesService for FireflyService {
    async fn scan_folder_for_fireflies(&self, request: Request<ScanFolderForFirefliesRequest>) -> Result<Response<ScanFolderForFirefliesResponse>, Status> {
        let req = request.into_inner();
        let result = carrel_core::fireflies::procedures::scan_folder_for_fireflies(req.directory.as_str(), FireflyKeeperOption {
            ignored_directory_names: req.ignore_directories,
            classified_only: req.classified_only,
        }).expect("Failed to scan folder for fireflies");
        let res = Response::new(
            ScanFolderForFirefliesResponse {
                fireflies: Some(result)
            });
        Ok(res)
    }

    async fn scan_files_for_fireflies(&self, request: Request<ScanFilesForFirefliesRequest>) -> Result<Response<ScanFilesForFirefliesResponse>, Status> {
        let req = request.into_inner();
        let files: &[&str] = &req.files.iter().map(|s| s.as_str()).collect::<Vec<&str>>();
        let result = scan_file_for_fireflies(
            files,
            FireflyKeeperOption {
                classified_only: req.classified_only,
                ..Default::default()
            },
        ).expect("Failed to scan files for fireflies");
        let res = Response::new(
            ScanFilesForFirefliesResponse {
                fireflies: Some(result)
            });
        Ok(res)
    }
}

// test
#[cfg(test)]
mod test
{
    use carrel_utils::test::test_folders::get_unit_test_module_folder;
    use tonic::transport::Channel;
    use crate::consts::server_addr::SERVER_ADDR;
    use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_client::FirefliesServiceClient;

    use super::*;

    const MODULE_FIXTURE_FOLDER: &str = "firefly_keeper";


    async fn get_client() -> FirefliesServiceClient<Channel> {
        let client = FirefliesServiceClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build firefly service client and connect to server")
    }

    fn get_firefly_fixture_path() -> String {
        get_unit_test_module_folder(MODULE_FIXTURE_FOLDER)
    }


    #[tokio::test]
    async fn test_scan_for_fireflies() -> Result<(), Box<dyn std::error::Error>> {
        let request = ScanFolderForFirefliesRequest {
            directory: get_firefly_fixture_path(),
            classified_only: false,
            ..Default::default()
        };

        let response = get_client().await.scan_folder_for_fireflies(request).await?;
        let response_value = response.into_inner();

        // there should be three tags
        assert_eq!(response_value.fireflies.unwrap().all_tags_count, 2);


        Ok(())
    }
}
