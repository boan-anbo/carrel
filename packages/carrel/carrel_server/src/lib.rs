#![feature(is_some_and)]

use tonic::codegen::http::Method;
use tracing::Level;

pub(crate) mod consts;
pub mod errors;
pub mod launch;
pub(crate) mod services;
