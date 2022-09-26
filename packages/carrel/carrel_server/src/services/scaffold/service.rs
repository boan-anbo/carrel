use std::borrow::Borrow;

use carrel_commons::carrel::server::scaffold::v1::{ScaffoldNewProjectRequest, ScaffoldNewProjectResponse};
use carrel_commons::carrel::server::scaffold::v1::scaffold_new_project_service_server::ScaffoldNewProjectService;
use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct ScaffoldService {}

#[tonic::async_trait]
impl ScaffoldNewProjectService for ScaffoldService {
    async fn scaffold_new_project(&self, request: Request<ScaffoldNewProjectRequest>) -> Result<Response<ScaffoldNewProjectResponse>, Status> {
        let request_value = request.into_inner();

        let new_dir_path = carrel_core::scaffold::procedures::scaffold_new_project(
            request_value.project_name.borrow(),
            request_value.project_parent_dir.as_str(),
        );

        let response = Response::new(
            ScaffoldNewProjectResponse {
                project_dir: new_dir_path.unwrap()
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

    use carrel_commons::carrel::server::scaffold::v1::scaffold_new_project_service_client::ScaffoldNewProjectServiceClient;
    use carrel_utils::test::test_folders::get_unit_test_module_folder;
    use tonic::transport::Channel;

    use crate::consts::server_addr::SERVER_ADDR;

    use super::*;

    const MODULE_FIXTURE_FOLDER: &str = "scaffold";


    async fn get_client() -> ScaffoldNewProjectServiceClient<Channel> {
        ScaffoldNewProjectServiceClient::connect(SERVER_ADDR.http_server_addr.as_str()).await.expect("cannot build scaffold service client")
    }

    fn get_scaffold_fixture_path() -> String {
        get_unit_test_module_folder(MODULE_FIXTURE_FOLDER)
    }


    #[tokio::test]
    async fn test_scaffold_new_project() -> Result<(), Box<dyn std::error::Error>> {
        let request = tonic::Request::new(ScaffoldNewProjectRequest {
            project_name: "created_scaffold_project".to_string(),
            project_parent_dir: get_scaffold_fixture_path(),
        });

        let response = get_client().await.scaffold_new_project(request).await?;


        // make sure a new folder is created in the fixture folder
        let new_project_dir = Path::new(response.get_ref().project_dir.as_str());
        assert!(new_project_dir.exists());

        // remove the new folder after test
        std::fs::remove_dir_all(new_project_dir).expect("cannot remove scaffold project folder");

        Ok(())
    }
}
