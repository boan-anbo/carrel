use std::borrow::Borrow;
use tonic::{Request, Response, Status};
use crate::scaffold::{ScaffoldNewProjectRequest, ScaffoldNewProjectResponse};
use crate::scaffold::scaffold_new_project_service_server::ScaffoldNewProjectService;

#[derive(Debug, Default)]
pub struct ScaffoldService {}

#[tonic::async_trait]
impl ScaffoldNewProjectService for ScaffoldService {
    async fn scaffold_new_project(&self, request: Request<ScaffoldNewProjectRequest>) -> Result<Response<ScaffoldNewProjectResponse>, Status> {
        let request_value = request.into_inner();

        let new_dir_path = carrel_core::scaffold::procedures::scaffold_new_project(
            request_value.project_name.borrow(),
            request_value.project_parent_dir.as_str()
        );

        let response = Response::new(
            ScaffoldNewProjectResponse{
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
    use crate::scaffold::scaffold_new_project_service_client::ScaffoldNewProjectServiceClient;
    use super::*;

    #[tokio::test]
    async fn test_scaffold_new_project() -> Result<(), Box<dyn std::error::Error>> {
        let mut client = ScaffoldNewProjectServiceClient::connect("http://127.0.0.1:8081").await?;

        let request = tonic::Request::new(crate::scaffold::ScaffoldNewProjectRequest {
            project_name: "test111".to_string(),
            project_parent_dir: "".to_string()
        });

        let response = client.scaffold_new_project(request).await?;

        println!("RESPONSE={:?}", response.into_inner().project_dir);

        Ok(())
    }
}
