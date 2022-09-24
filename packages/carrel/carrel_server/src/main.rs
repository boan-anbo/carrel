use tonic::codegen::http::Method;
use tracing::Level;


// service modules
mod scaffold;
mod firefly_keeper;
mod launch_server;
mod load_cors;
mod load_health_reporter;
mod attach_tracing_subscriber;





// main
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    launch_server::launch_server().await;
    Ok(())
}
