pub mod archive_op;
pub mod project;

pub use entity::entities;

use migration::{Migrator, MigratorTrait};

fn main() {

    // let connection = sea_orm::Database::connect(&database_url).await?;
    // Migrator::up(&connection, None).await?;
}
