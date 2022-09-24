use carrel_commons::carrel::server::firefly_keeper::v1::fireflies_service_server::FirefliesService;
use carrel_commons::carrel::server::firefly_keeper::v1::FireFliesResponse;
use carrel_core::errors::carrel_core_error::CarrelCoreError;
use tonic::{Request, Response, Status};
use crate::carrel::server::firefly_keeper::v1::fireflies_service_server::FirefliesService;
use crate::carrel::server::firefly_keeper::v1::FireFliesResponse;
use crate::generic::api::request_directory::v1::DirectoryRequest;


#[derive(Debug, Default)]
pub struct FireflyService {}

#[tonic::async_trait]
impl FirefliesService for FireflyService {
    async fn scan_folder_for_fireflies(&self, request: Request<DirectoryRequest>) -> Result<Response<FireFliesResponse>, Status> {
        let req = request.into_inner();
        let result = carrel_core::fireflies::procedures::scan_folder_for_fireflies(
            req.directory_path.as_str()
        );
        match result {
            Ok(r) => {
                let res = Response::new(
                    FireFliesResponse {
                        fireflies: Some(r)
                    });
                Ok(res)
            }
            Err(e) => {
                Err(Status::internal("Error"))
            }
        }
    }
}

// test
#[cfg(test)]
mod test
{
    use crate::proto_scaffold::scaffold_new_project_service_client::ScaffoldNewProjectServiceClient;
    use crate::proto_scaffold::ScaffoldNewProjectRequest;
    use super::*;

    # [tokio::test]
}
