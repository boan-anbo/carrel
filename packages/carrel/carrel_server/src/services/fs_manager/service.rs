use carrel_commons::carrel::server::fs_manager::v1::{GetDirectoryTreeRequest, GetDirectoryTreeResponse, ReadFileRequest, ReadFileResponse, WriteFileRequest, WriteFileResponse};
use carrel_commons::carrel::server::fs_manager::v1::fs_manager_service_server::FsManagerService;
use carrel_core::fs::fs_manager::{FSManager, FSManagerTrait};
use carrel_utils::fs::read_file_content::read_file_content;
use tonic::{Request, Response, Status};

#[derive(Debug, Default)]
pub struct FsManager {}

#[tonic::async_trait]
impl FsManagerService for FsManager {
    async fn get_directory_tree(&self, request: Request<GetDirectoryTreeRequest>) -> Result<Response<GetDirectoryTreeResponse>, Status> {
        let req = request.into_inner();
        let dir_tree = FSManager::generate_dir_tree(req.directory.as_str()).unwrap();
        let res = Response::new(GetDirectoryTreeResponse {
            directory_tree: Some(dir_tree),
        });

        Ok(res)
    }

    async fn read_file(&self, request: Request<ReadFileRequest>) -> Result<Response<ReadFileResponse>, Status> {
        let req = request.into_inner();
        let file_content = read_file_content(req.file_path.as_str()).unwrap();
        let res = Response::new(ReadFileResponse {
            file_content,
            file_path: req.file_path,
        });

        Ok(res)
    }

    async fn write_file(&self, request: Request<WriteFileRequest>) -> Result<Response<WriteFileResponse>, Status> {
        let req = request.into_inner();
        let file_path = req.file_path;
        let file_content = req.file_content;
        let res = Response::new(WriteFileResponse {
            file_path,
            file_content,
        });

        Ok(res)
    }
}
