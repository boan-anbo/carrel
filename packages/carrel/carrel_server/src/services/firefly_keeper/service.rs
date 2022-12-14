use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_server::FirefliesService;
use carrel_commons::carrel::server::firefly_keeper::v1::{ScanFilesForFirefliesRequest, ScanFilesForFirefliesResponse, ScanFolderForFirefliesRequest, ScanFolderForFirefliesResponse, TestBackgroundRequest, TestBackgroundResponse};
use carrel_core::fireflies::procedures::{scan_file_for_fireflies, FireflyKeeperOption};
use tokio::spawn;
use tokio::task::spawn_blocking;
use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct FireflyService {}

#[tonic::async_trait]
impl FirefliesService for FireflyService {
    async fn scan_folder_for_fireflies(
        &self,
        request: Request<ScanFolderForFirefliesRequest>,
    ) -> Result<Response<ScanFolderForFirefliesResponse>, Status> {
        let req = request.into_inner();
        let result = carrel_core::fireflies::procedures::scan_folder_for_fireflies(
            req.directory.as_str(),
            FireflyKeeperOption {
                ignored_directory_names: req.ignore_directories,
                classified_only: req.classified_only,
            },
        )
            .expect("Failed to scan folder for fireflies");
        let res = Response::new(ScanFolderForFirefliesResponse {
            fireflies: Some(result),
        });
        Ok(res)
    }

    async fn scan_files_for_fireflies(
        &self,
        request: Request<ScanFilesForFirefliesRequest>,
    ) -> Result<Response<ScanFilesForFirefliesResponse>, Status> {
        let req = request.into_inner();
        let files: &[&str] = &req.files.iter().map(|s| s.as_str()).collect::<Vec<&str>>();
        let result = scan_file_for_fireflies(
            files,
            FireflyKeeperOption {
                classified_only: req.classified_only,
                ..Default::default()
            },
        )
            .expect("Failed to scan files for fireflies");
        let res = Response::new(ScanFilesForFirefliesResponse {
            fireflies: Some(result),
        });
        Ok(res)
    }

    async fn test_background(&self, request: Request<TestBackgroundRequest>) -> Result<Response<TestBackgroundResponse>, Status> {
        // spawn a new thread to do the work
        let req = request.into_inner();
        let res = spawn(do_something());
        let res = Response::new(TestBackgroundResponse {
            message: "ended".to_string(),
        });
        Ok(res)
    }
}

async fn do_something() {
    // print a string every 2 seconds
    for i in 0..10 {
        println!("{}: doing something", i);
        std::thread::sleep(std::time::Duration::from_secs(2));
    }
}

// test
#[cfg(test)]
mod test {
    use crate::consts::server_addr::SERVER_ADDR;
    use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_client::FirefliesServiceClient;
    use carrel_utils::test::test_folders::get_test_fixture_module_folder_path;
    use tonic::transport::Channel;

    use super::*;

    const MODULE_FIXTURE_FOLDER: &str = "firefly_keeper";

    async fn get_client() -> FirefliesServiceClient<Channel> {
        let client = FirefliesServiceClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build firefly service client and connect to server")
    }

    fn get_firefly_fixture_path() -> String {
        get_test_fixture_module_folder_path(MODULE_FIXTURE_FOLDER)
    }

    #[tokio::test]
    async fn test_scan_for_fireflies() -> Result<(), Box<dyn std::error::Error>> {
        let request = ScanFolderForFirefliesRequest {
            directory: get_firefly_fixture_path(),
            classified_only: false,
            ..Default::default()
        };

        let response = get_client()
            .await
            .scan_folder_for_fireflies(request)
            .await?;
        let response_value = response.into_inner();

        // there should be three tags
        assert_eq!(response_value.fireflies.unwrap().all_fireflies_count, 2);

        Ok(())
    }
}
