use crate::ScaffoldNewProjectServiceServer;

pub async fn load_health_reporter() {
    let (mut health_reporter, _) = tonic_health::server::health_reporter();
    health_reporter
        .set_serving::<ScaffoldNewProjectServiceServer<crate::scaffold::service::ScaffoldService>>()
        .await;
}
