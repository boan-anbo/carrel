use carrel_commons::carrel::core::project_manager::v1::CarrelDbType;

pub const CONFIG_DEFAULT_FILE_NAME: &str = "carrel_config.yaml";

pub const CONFIG_DEFAULT_CARREL_DB_NAME: &str = "carrel.db";

pub const CONFIG_DEFAULT_CARREL_TO_NAME: &str = "to.db";

pub const CONFIG_DEFAULT_CARREL_DB_TYPE: CarrelDbType = CarrelDbType::Sqlite;

// the default size of batches to insert into sqlite. Too big and it will fail, too small and it will be slow
pub const CONFIG_DEFAULT_BATCH_INSERT_SIZE: usize = 500;
