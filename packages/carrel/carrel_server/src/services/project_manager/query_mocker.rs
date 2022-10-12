use carrel_commons::carrel::server::project_manager::v1::{QueryFirefliesRequest, QueryFirefliesResponse};
use tonic::{Response, Status};

pub async fn mock_query_fireflies(req: QueryFirefliesRequest) -> Result<Response<QueryFirefliesResponse>, Status> {
    
    let query = req.query.unwrap();
    
}
