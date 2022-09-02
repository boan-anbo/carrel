
use std::net::SocketAddr;

use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod generated;
pub mod controller;
mod app;

/// Custom implementation of generated proto definitions.
pub mod implementations;

// Include the `items` module, which is generated from items.proto.
pub mod distant_api {
    include!("generated/distant_api_dtos.rs");
}
pub mod document {
    include!("generated/document.rs");
}
pub mod file {
    include!("generated/file.rs");
}
pub mod passage {
    include!("generated/passage.rs");
}
pub mod person {
    include!("generated/person.rs");
}

pub mod api_error {
    include!("generated/api_error.rs");
}



#[tokio::main]
async fn main() {

    // initialize .env
    dotenv::dotenv().ok();
    // initialize tracing
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info".to_string()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let app = app::get_app();
    // build the grpc service
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::info!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(
            app.into_make_service()
        )
        .await
        .unwrap();
}
