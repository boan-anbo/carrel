pub use sea_orm_migration::prelude::*;

pub mod m20220929_111159_create_to;
mod seed_database;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220929_111159_create_to::Migration),
        ]
    }
}
