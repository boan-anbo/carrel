use carrel_commons::carrel::common::file::v1::File;
use carrel_commons::carrel::server::project_manager::v1::RemoveFilesFromArchiveRequest;
use carrel_commons::carrel::server::project_manager::v1::AddFilesToArchiveResponse;
use carrel_commons::carrel::server::project_manager::v1::AddFilesToArchiveRequest;
use carrel_commons::carrel::server::project_manager::v1::OpenProjectAndGetInfoResponse;
use carrel_commons::carrel::server::project_manager::v1::OpenProjectAndGetInfoRequest;
use carrel_commons::carrel::server::project_manager::v1::GetArchiveFilesResponse;
use carrel_commons::carrel::server::project_manager::v1::GetArchiveFilesRequest;
use carrel_commons::carrel::server::project_manager::v1::AddArchiveResponse;
use carrel_commons::carrel::server::project_manager::v1::AddArchiveRequest;
use carrel_commons::carrel::server::project_manager::v1::RemoveFilesFromArchiveResponse;
use carrel_commons::carrel::server::project_manager::v1::project_manager_service_server::{ProjectManagerService};
use carrel_core::project::archivist::archivist::Archivist;
use carrel_core::project::file_manager::file_manager::ManageFileTrait;
use carrel_core::project::manage_project::ManageProjectTrait;
use carrel_core::project::project_manager::ProjectManager;


use tonic::{Request, Response, Status};
use crate::errors::carrel_server_error::CarrelServerError::InvalidRequestPayload;


#[derive(Debug, Default)]
pub struct ProjectService {}

#[tonic::async_trait]
impl ProjectManagerService for ProjectService {
    async fn open_project_and_get_info(&self, request: Request<OpenProjectAndGetInfoRequest>) -> Result<Response<OpenProjectAndGetInfoResponse>, Status> {
        let request = request.into_inner();
        let project_manager = ProjectManager::load(request.project_directory.as_str()).await.unwrap();
        let project_info = project_manager.get_project_info().await;
        let res = OpenProjectAndGetInfoResponse {
            project_info: Some(project_info),
        };
        Ok(Response::new(res))
    }


    async fn add_archive(&self, request: Request<AddArchiveRequest>) -> Result<Response<AddArchiveResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::ProjectManager::load(
            req.project_directory.as_str()
        ).await.unwrap();
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
                    );
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
                archive_id: result,
            });
        Ok(res)
    }

    async fn get_archive_files(&self, request: Request<GetArchiveFilesRequest>) -> Result<Response<GetArchiveFilesResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::ProjectManager::load(
            req.project_directory.as_str()
        ).await.unwrap();
        let files = project.db.archive_list_files(
            req.archive_id
        ).await.unwrap();
        let res = Response::new(
            GetArchiveFilesResponse {
                project_directory: project.project_directory.into_os_string().into_string().unwrap(),
                project_id: project.project_id,
                archive_id: req.archive_id,
                files: files.into_iter().map(move |f| File::from(f)).collect(),
            }
        );
        Ok(res)
    }

    async fn add_files_to_archive(&self, request: tonic::Request<AddFilesToArchiveRequest>) -> Result<tonic::Response<AddFilesToArchiveResponse>, tonic::Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::ProjectManager::load(
            req.project_directory.as_str()
        ).await.unwrap();
        let resutl = project.db.archive_add_files(
            req.archive_id,
            &req.file_paths,
        ).await.unwrap();
        let inserted_files = project.db.archive_list_files(req.archive_id).await.unwrap();
        let res = Response::new(
            AddFilesToArchiveResponse {
                project_directory: project.project_directory.into_os_string().into_string().unwrap(),
                project_id: project.project_id,
                archive_id: req.archive_id,
                files: inserted_files.into_iter().map(move |f| File::from(f)).collect(),
            }
        );
        Ok(res)
    }

    async fn remove_files_from_archive(&self, request: tonic::Request<RemoveFilesFromArchiveRequest>) -> Result<tonic::Response<RemoveFilesFromArchiveResponse>, tonic::Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::ProjectManager::load(
            req.project_directory.as_str()
        ).await.unwrap();
        let affected_rows = (project.db.archive_remove_files_by_uuid(
            req.archive_id,
            req.file_uuids,
        ).await).unwrap_or(0) as i64;

        let res = Response::new(
            RemoveFilesFromArchiveResponse {
                project_directory: project.project_directory.into_os_string().into_string().unwrap(),
                project_id: project.project_id,
                archive_id: req.archive_id,
                // return 0 if no result in res
                affected_rows,
                is_affacted_rows_zero: affected_rows == 0,
            }
        );
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


    async fn get_client() -> ProjectManagerServiceClient<Channel> {
        let client = ProjectManagerServiceClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build ProjectManager service client and connect to server")
    }


    #[tokio::test]
    async fn test_project_manager_add_archive() -> Result<(), Box<dyn std::error::Error>> {

        // initialize a project manager
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;

        let add_archive_dto = Some(AddArchiveDto {
            name: "carrel_server_tester_archive".to_string(),
            description: "carrel_server_tester_archive_description".to_string(),
            source_url: "carrel_server_tester_archive_source_url".to_string(),
            archive_source_type: ArchiveSourceType::Directory as i32,
            project_id: project_manager.project_id,
        });


        let request = AddArchiveRequest {
            project_directory: project_manager.project_directory.to_str().unwrap().to_string(),
            project_id: project_manager.project_id,
            add_archive_dto,
        };

        let response = get_client().await.add_archive(request).await?;
        let response_value = response.into_inner();

        assert_eq!(response_value.project_directory, project_manager.project_directory.to_str().unwrap().to_string());
        assert_eq!(response_value.db_file_name, project_manager.config.carrel_db_file_name.to_str().unwrap().to_string());

        Ok(())
    }

    #[tokio::test]
    async fn test_opening_project() -> Result<(), Box<dyn std::error::Error>> {
        let random_folder = carrel_utils::test::test_folders::get_random_test_temp_folder();
        let request = OpenProjectAndGetInfoRequest {
            project_directory: random_folder.clone(),
        };

        let response = get_client().await.open_project_and_get_info(request).await?;
        let response_value = response.into_inner();

        let project_info = response_value.project_info.unwrap();

        assert_eq!(project_info.directory.as_str(), random_folder.as_str());
        assert_eq!(project_info.project_id, 1);
        Ok(())
    }

    #[tokio::test]
    async fn test_get_archive_files() -> Result<(), Box<dyn std::error::Error>> {
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;
        let archive_id = 2;
        let request = GetArchiveFilesRequest {
            project_directory: project_manager.project_directory.to_str().unwrap().to_string(),
            project_id: project_manager.project_id,
            archive_id,
        };

        let response = get_client().await.get_archive_files(request).await?;
        let response_value = response.into_inner();

        assert_eq!(response_value.project_directory, project_manager.project_directory.to_str().unwrap().to_string());
        assert_eq!(response_value.project_id, project_manager.project_id);
        assert_eq!(response_value.archive_id, archive_id);
        assert_eq!(response_value.files.len(), 3);

        let archive_id = 1;
        let request = GetArchiveFilesRequest {
            project_directory: project_manager.project_directory.to_str().unwrap().to_string(),
            project_id: project_manager.project_id,
            archive_id,
        };

        let response = get_client().await.get_archive_files(request).await?;
        let response_value = response.into_inner();

        assert_eq!(response_value.files.len(), 1);
        Ok(())
    }
}
