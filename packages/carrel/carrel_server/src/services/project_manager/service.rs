use std::io::Write;
use carrel_commons::carrel::server::project_manager::v1::{AddArchiveRequest, AddArchiveResponse, GetProjectInfoRequest, GetProjectInfoResponse, OpenProjectRequest, OpenProjectResponse};
use carrel_commons::carrel::server::project_manager::v1::project_manager_service_server::{ProjectManagerService, ProjectManagerServiceServer};
use carrel_core::project::archivist::archivist::Archivist;
use carrel_core::project::manage_project::ManageProjectTrait;


use tonic::{Request, Response, Status};
use crate::errors::carrel_server_error::CarrelServerError;
use crate::errors::carrel_server_error::CarrelServerError::InvalidRequestPayload;


#[derive(Debug, Default)]
pub struct ProjectService {}

#[tonic::async_trait]
impl ProjectManagerService for ProjectService {
    async fn open_project(&self, request: Request<OpenProjectRequest>) -> Result<Response<OpenProjectResponse>, Status> {
        todo!()
    }

    async fn get_project_info(&self, request: Request<GetProjectInfoRequest>) -> Result<Response<GetProjectInfoResponse>, Status> {
        todo!()
    }

    async fn add_archive(&self, request: Request<AddArchiveRequest>) -> Result<Response<AddArchiveResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::ProjectManager::load(
            req.project_directory.as_str()
        ).unwrap();

        // if it fails to unwrap, throw InvalidRequestPayload error
        let dto = match req.add_archive_dto {
            Some(dto) => dto,
            None =>
                {
                    let err = InvalidRequestPayload("AddArchiveRequest.add_archive_dto is None".to_string());
                    return Err(
                        Status::invalid_argument(
                            err.to_string()
                        )
                    )
                }
        };

        let result = project.db.project_add_archive(
            dto
        ).await.unwrap();

        let res = Response::new(
            AddArchiveResponse {
                project_directory: project.project_directory.into_os_string().into_string().unwrap(),
                db_file_name: project.config.carrel_db_file_name.into_os_string().into_string().unwrap(),
                project_id: project.project_id,
                archive_id: result
            });
        Ok(res)
    }
}

// test
#[cfg(test)]
mod test
{
    use carrel_commons::carrel::core::project_manager::v1::{AddArchiveDto, ArchiveSourceType};
    use carrel_commons::carrel::server::project_manager::v1::project_manager_service_client::ProjectManagerServiceClient;
    use tonic::transport::Channel;
    use crate::consts::server_addr::SERVER_ADDR;
    use carrel_core::test_utils::carrel_tester::CarrelTester;
    use carrel_core::test_utils::project_tester::ProjectTester;

    use super::*;

    const MODULE_FIXTURE_FOLDER: &str = "ProjectManager_keeper";


    async fn get_client() -> ProjectManagerServiceClient<Channel> {
        let client = ProjectManagerServiceClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build ProjectManager service client and connect to server")
    }




    #[tokio::test]
    async fn test_project_manager_add_archive() -> Result<(), Box<dyn std::error::Error>> {

        // initialize a project manager
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;

        let add_archive_dto = Some( AddArchiveDto {
            name: "carrel_server_tester_archive".to_string(),
            description: "carrel_server_tester_archive_description".to_string(),
            source_url: "carrel_server_tester_archive_source_url".to_string(),
            archive_source_type: ArchiveSourceType::Directory as i32,
            project_id: project_manager.project_id,
        });


        let request = AddArchiveRequest {
            project_directory: project_manager.project_directory.to_str().unwrap().to_string(),
            project_id: project_manager.project_id,
            add_archive_dto
        };

        let response = get_client().await.add_archive(request).await?;
        let response_value = response.into_inner();

        assert_eq!(response_value.project_directory, project_manager.project_directory.to_str().unwrap().to_string());
        assert_eq!(response_value.db_file_name, project_manager.config.carrel_db_file_name.to_str().unwrap().to_string());


        Ok(())
    }
}
