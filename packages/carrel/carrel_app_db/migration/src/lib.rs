pub use sea_orm_migration::prelude::*;

pub mod m20221010_121051_init_db;
mod seed_database;


pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20221010_121051_init_db::Migration),
        ]
    }
}
