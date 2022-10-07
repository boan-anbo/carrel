use async_trait::async_trait;
use crate::project::project_manager::ProjectManager;

#[async_trait]
pub trait KeepFireflies {

    /// Scan all project archive files and extract fireflies (i.e. cards) from them and store to to db.
    async fn sync_fireflies() -> ();

    async fn sync_pdf(&self, file_uuid: String ) -> ();
}

#[async_trait]
impl KeepFireflies for ProjectManager {
    async fn sync_fireflies() -> () {
        todo!()
    }

    async fn sync_pdf(&self, file_uuid: String) -> () {
        todo!()
    }
}