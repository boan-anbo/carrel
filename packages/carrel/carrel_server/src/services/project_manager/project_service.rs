use carrel_commons::carrel::common::archive::v1::Archive;
use carrel_commons::carrel::common::file::v1::File;
use carrel_commons::carrel::server::project_manager::v1::project_manager_service_server::ProjectManagerService;
use carrel_commons::carrel::server::project_manager::v1::AddArchiveRequest;
use carrel_commons::carrel::server::project_manager::v1::AddArchiveResponse;
use carrel_commons::carrel::server::project_manager::v1::AddFilesToArchiveRequest;
use carrel_commons::carrel::server::project_manager::v1::AddFilesToArchiveResponse;
use carrel_commons::carrel::server::project_manager::v1::GetArchiveFilesRequest;
use carrel_commons::carrel::server::project_manager::v1::GetArchiveFilesResponse;
use carrel_commons::carrel::server::project_manager::v1::RemoveFilesFromArchiveResponse;
use carrel_commons::carrel::server::project_manager::v1::{
    AddDirectoryToArchiveRequest, AddDirectoryToArchiveResponse, ListAllProjectArchivesRequest,
    ListAllProjectArchivesResponse, ListAllProjectFilesRequest, ListAllProjectFilesResponse,
    ListAllProjectFirefliesRequest, ListAllProjectFirefliesResponse, ListFilesInArchiveRequest,
    ListFilesInArchiveResponse, ListRecentProjectsRequest, ListRecentProjectsResponse,
    OpenProjectRequest, OpenProjectResponse, QueryFilesRequest, QueryFilesResponse,
    QueryFirefliesRequest, QueryFirefliesResponse, RemoveFilesFromArchiveRequest,
    SyncProjectArchivesRequest, SyncProjectArchivesResponse,
};
use carrel_core::app::app_manager::carrel_app_manager::ManageProjectList;
use carrel_core::app::app_manager::entity::implementation::AppProject;
use carrel_core::app::app_manager::{CarrelAppManager, ManageCarrelApp};
use carrel_core::carrel::carrel_core::{CarrelCore, CarrelCoreTrait};
use carrel_core::carrel_db::implementation::archive_traits::ArchiveTrait;
use carrel_core::project::archivist::archivist::Archivist;
use carrel_core::project::file_manager::file_manager::ManageFileTrait;
use carrel_core::project::project_manager::CarrelProjectManager;
use carrel_core::project::project_manager_methods::keep_project_fireflies::KeepProjectFireflies;
use carrel_core::project::project_manager_methods::manage_project::ManageProjectTrait;
use carrel_core::project::to_manager::to_manager::KeepFireflies;
use carrel_core::project::to_manager::util_trait::ToFireflyUtils;
use carrel_utils::fs::get_all_files_under_directory::get_all_file_paths_under_directory;

use crate::errors::carrel_server_error::CarrelServerError::InvalidRequestPayload;
use tonic::{Request, Response, Status};
use crate::services::project_manager::query_mocker;
use crate::services::project_manager::query_mocker::{QueryMocker, QueryMockerTrait};

#[derive(Debug, Default)]
pub struct ProjectService {}

#[tonic::async_trait]
impl ProjectManagerService for ProjectService {
    async fn open_project(
        &self,
        request: Request<OpenProjectRequest>,
    ) -> Result<Response<OpenProjectResponse>, Status> {
        let request = request.into_inner();
        let project_directory = request.project_directory;
        let app_directory = request.app_directory;
        let connect = CarrelCore::new(app_directory.as_str(), project_directory.as_str()).await;
        let result = connect
            .open_project()
            .await
            .map_err(|e| Status::internal(e.to_string()))?;
        let payload = OpenProjectResponse {
            app_directory,
            project_directory,
            project_info: Some(result),
        };
        Ok(Response::new(payload))
    }

    async fn add_archive(
        &self,
        request: Request<AddArchiveRequest>,
    ) -> Result<Response<AddArchiveResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        // if it fails to unwrap, throw InvalidRequestPayload error
        let dto = match req.add_archive_dto {
            Some(dto) => dto,
            None => {
                let err =
                    InvalidRequestPayload("AddArchiveRequest.add_archive_dto is None".to_string());
                return Err(Status::invalid_argument(err.to_string()));
            }
        };

        let result = project.db.project_add_archive(dto).await.unwrap();

        let res = Response::new(AddArchiveResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            db_file_name: project
                .config
                .carrel_db
                .into_os_string()
                .into_string()
                .unwrap(),
            project_id: project.project_id,
            archive_id: result,
        });
        Ok(res)
    }

    async fn get_archive_files(
        &self,
        request: Request<GetArchiveFilesRequest>,
    ) -> Result<Response<GetArchiveFilesResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let files = project.db.archive_list_files(req.archive_id).await.unwrap();
        let res = Response::new(GetArchiveFilesResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            project_id: project.project_id,
            archive_id: req.archive_id,
            files: files.into_iter().map(move |f| File::from(f)).collect(),
        });
        Ok(res)
    }

    async fn add_files_to_archive(
        &self,
        request: tonic::Request<AddFilesToArchiveRequest>,
    ) -> Result<tonic::Response<AddFilesToArchiveResponse>, tonic::Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let _ = project
            .db
            .archive_add_files(req.archive_id, &req.file_paths)
            .await
            .unwrap();
        let inserted_files = project.db.archive_list_files(req.archive_id).await.unwrap();
        let res = Response::new(AddFilesToArchiveResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            project_id: project.project_id,
            archive_id: req.archive_id,
            files: inserted_files
                .into_iter()
                .map(move |f| File::from(f))
                .collect(),
        });
        Ok(res)
    }

    async fn add_directory_to_archive(
        &self,
        request: Request<AddDirectoryToArchiveRequest>,
    ) -> Result<Response<AddDirectoryToArchiveResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let all_files_under_directory =
            get_all_file_paths_under_directory(req.source_directory.as_str(), &["pdf"], None);

        let result = self
            .add_files_to_archive(Request::new(AddFilesToArchiveRequest {
                project_directory: req.project_directory,
                archive_id: req.archive_id,
                file_paths: all_files_under_directory,
            }))
            .await
            .unwrap();

        let res = Response::new(AddDirectoryToArchiveResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            archive_id: req.archive_id,
            files: result.into_inner().files,
        });
        Ok(res)
    }

    async fn remove_files_from_archive(
        &self,
        request: tonic::Request<RemoveFilesFromArchiveRequest>,
    ) -> Result<tonic::Response<RemoveFilesFromArchiveResponse>, tonic::Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let affected_rows = (project
            .db
            .archive_remove_files_by_uuid(req.archive_id, req.file_uuids)
            .await)
            .unwrap_or(0) as i64;

        let res = Response::new(RemoveFilesFromArchiveResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            project_id: project.project_id,
            archive_id: req.archive_id,
            // return 0 if no result in res
            affected_rows,
            is_affacted_rows_zero: affected_rows == 0,
        });
        Ok(res)
    }

    async fn list_all_project_archives(
        &self,
        request: Request<ListAllProjectArchivesRequest>,
    ) -> Result<Response<ListAllProjectArchivesResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let archives_models = project.db.project_list_archives().await.unwrap();
        let archives: Vec<Archive> = archives_models
            .into_iter()
            .map(move |a| a.into_archive())
            .collect();
        let res = Response::new(ListAllProjectArchivesResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            archives,
        });
        Ok(res)
    }

    async fn list_files_in_archive(
        &self,
        request: Request<ListFilesInArchiveRequest>,
    ) -> Result<Response<ListFilesInArchiveResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let files = project.db.archive_list_files(req.archive_id).await.unwrap();
        let res = Response::new(ListFilesInArchiveResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            archive_id: req.archive_id,
            // convert to File db model to File proto
            files: files.into_iter().map(move |f| File::from(f)).collect(),
        });
        Ok(res)
    }

    async fn sync_project_archives(
        &self,
        request: Request<SyncProjectArchivesRequest>,
    ) -> Result<Response<SyncProjectArchivesResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let all_updated_file_models = project.sync_all_project_files().await.unwrap();
        let res = SyncProjectArchivesResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            synced_files: all_updated_file_models
                .into_iter()
                .map(move |f| File::from(f))
                .collect(),
            new_fireflies: vec![],
        };
        let res = Response::new(res);
        Ok(res)
    }

    async fn list_all_project_files(
        &self,
        request: Request<ListAllProjectFilesRequest>,
    ) -> Result<Response<ListAllProjectFilesResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let all_file_models = project.db.file_list_all_files().await.unwrap();
        let res = ListAllProjectFilesResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            files: all_file_models
                .into_iter()
                .map(move |f| File::from(f))
                .collect(),
        };
        let res = Response::new(res);
        Ok(res)
    }

    async fn list_all_project_fireflies(
        &self,
        request: Request<ListAllProjectFirefliesRequest>,
    ) -> Result<Response<ListAllProjectFirefliesResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let fireflies = project.to.list_all_fireflies().await;
        let res = ListAllProjectFirefliesResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            count: fireflies.len() as u64,
            fireflies,
        };
        let res = Response::new(res);
        Ok(res)
    }

    /// Main query entry point for the server
    ///
    /// # Arguments
    ///
    /// * `request`:
    ///
    /// returns: Result<Response<QueryFilesResponse>, Status>
    ///
    /// # Examples
    ///
    /// ```
    ///
    /// ```
    async fn query_files(
        &self,
        request: Request<QueryFilesRequest>,
    ) -> Result<Response<QueryFilesResponse>, Status> {
        let req = request.into_inner();
        let project = carrel_core::project::project_manager::CarrelProjectManager::load(
            req.project_directory.as_str(),
        )
            .await
            .unwrap();
        let query = match req.query {
            None => {
                return Err(Status::invalid_argument("Query cannot be empty"));
            }
            Some(q) => q,
        };

        let result = project.db.query_files(query).await.unwrap();
        let res = QueryFilesResponse {
            project_directory: project
                .project_directory
                .into_os_string()
                .into_string()
                .unwrap(),
            files: result.results.into_iter().map(File::from).collect(),
            response_metadata: Some(result.metadata),
        };
        let res = Response::new(res);

        Ok(res)
    }

    /// Main entry point for quering fireflies
    async fn query_fireflies(
        &self,
        request: Request<QueryFirefliesRequest>,
    ) -> Result<Response<QueryFirefliesResponse>, Status> {
        let req = request.into_inner();
        // check if it's mock query
        let mock = req.is_mock;

        if mock {
            return QueryMocker::mock_query_fireflies(req).await
        }

        let query = req.query.unwrap();
        let cpm = CarrelProjectManager::load(req.project_directory.as_str())
            .await
            .unwrap()
            .to;
        let result = cpm.query_fireflies(query).await.unwrap();
        let res = QueryFirefliesResponse {
            project_directory: req.project_directory,
            fireflies: result.results,
            response_metadata: Some(result.metadata),
        };
        let res = Response::new(res);
        Ok(res)
    }

    async fn list_recent_projects(
        &self,
        request: Request<ListRecentProjectsRequest>,
    ) -> Result<Response<ListRecentProjectsResponse>, Status> {
        let req = request.into_inner();
        let app_directory = req.app_directory;
        let num_of_projects = req.number_of_projects;
        let app = CarrelAppManager::load(app_directory.as_str()).await;
        let projects = app
            .app_db
            .list_most_recent_app_projects(num_of_projects)
            .await
            .map_err(|e| Status::internal(format!("Error listing recent projects: {}", e)))?;
        let result = ListRecentProjectsResponse {
            projects: projects
                .into_iter()
                .map(|p| p.into_common_project_v2())
                .collect(),
            app_directory,
        };
        Ok(Response::new(result))
    }
}

// test
#[cfg(test)]
mod test {
    use crate::consts::server_addr::SERVER_ADDR;
    use carrel_commons::carrel::core::project_manager::v1::{AddArchiveDto, ArchiveSourceType};
    use carrel_commons::carrel::server::project_manager::v1::project_manager_service_client::CarrelProjectManagerServiceClient;
    use carrel_core::test_utils::carrel_tester::CarrelTester;
    use carrel_core::test_utils::project_tester::ProjectTester;
    use tonic::transport::Channel;

    use super::*;

    async fn get_client() -> CarrelProjectManagerServiceClient<Channel> {
        let client =
            CarrelProjectManagerServiceClient::connect(SERVER_ADDR.http_server_addr.as_str()).await;
        client.expect("Failed to build CarrelProjectManager service client and connect to server")
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
            project_directory: project_manager
                .project_directory
                .to_str()
                .unwrap()
                .to_string(),
            project_id: project_manager.project_id,
            add_archive_dto,
        };

        let response = get_client().await.add_archive(request).await?;
        let response_value = response.into_inner();

        assert_eq!(
            response_value.project_directory,
            project_manager
                .project_directory
                .to_str()
                .unwrap()
                .to_string()
        );
        assert_eq!(
            response_value.db_file_name,
            project_manager
                .config
                .carrel_db
                .to_str()
                .unwrap()
                .to_string()
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_opening_project() -> Result<(), Box<dyn std::error::Error>> {
        let random_folder = carrel_utils::test::test_folders::get_random_test_temp_folder();
        let request = OpenProjectAndGetInfoRequest {
            project_directory: random_folder.clone(),
        };

        let response = get_client()
            .await
            .open_project_and_get_info(request)
            .await?;
        let response_value = response.into_inner();

        let project_info = response_value.project_info.unwrap();

        assert_eq!(project_info.directory.as_str(), random_folder.as_str());
        assert_eq!(project_info.project_id, 1);
        Ok(())
    }

    #[tokio::test]
    async fn test_query_archive_files() -> Result<(), Box<dyn std::error::Error>> {
        let project_manager = CarrelTester::get_project_manager_with_seeded_db().await;
        let archive_id = 2;
        let request = GetArchiveFilesRequest {
            project_directory: project_manager
                .project_directory
                .to_str()
                .unwrap()
                .to_string(),
            project_id: project_manager.project_id,
            archive_id,
        };

        let response = get_client().await.get_archive_files(request).await?;
        let response_value = response.into_inner();

        assert_eq!(
            response_value.project_directory,
            project_manager
                .project_directory
                .to_str()
                .unwrap()
                .to_string()
        );
        assert_eq!(response_value.project_id, project_manager.project_id);
        assert_eq!(response_value.archive_id, archive_id);
        assert_eq!(response_value.files.len(), 3);

        let archive_id = 1;
        let request = GetArchiveFilesRequest {
            project_directory: project_manager
                .project_directory
                .to_str()
                .unwrap()
                .to_string(),
            project_id: project_manager.project_id,
            archive_id,
        };

        let response = get_client().await.get_archive_files(request).await?;
        let response_value = response.into_inner();

        assert_eq!(response_value.files.len(), 1);
        Ok(())
    }
}
