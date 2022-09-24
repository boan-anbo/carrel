use carrel_commons::carrel::server::scaffold::v1::scaffold_new_project_service_server::ScaffoldNewProjectServiceServer;
use crate::services::scaffold::service::ScaffoldService;

pub async fn load_health_reporter() {
    let (mut health_reporter, _) = tonic_health::server::health_reporter();
    health_reporter
        .set_serving::<ScaffoldNewProjectServiceServer<ScaffoldService>>()
        .await;
}
