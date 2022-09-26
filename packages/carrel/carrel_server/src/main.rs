use tonic::codegen::http::Method;
use tracing::Level;

use crate::launch::launch_server;

pub(crate) mod services;
pub mod errors;
pub(crate) mod consts;
mod launch;

// main
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    launch_server::launch_server().await;
    Ok(())
}
