use std::error::Error;
use to_core::error::ToErrors;

pub struct To {}

#[async_trait::async_trait]
pub trait ToTrait {
    async fn initialize_db(&self) -> Result<String, ToErrors>;
}

#[async_trait::async_trait]
impl ToTrait for To {
    async fn initialize_db(&self) -> Result<String, ToErrors> {
        todo!()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::project::db_manager::carrel_db_manager::CarrelDbManager;
    use carrel_db::db::connect::get_connection;
    use carrel_db::entities::prelude::Project;
    use carrel_db::entities::project;
    use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;
    use sea_orm::{ActiveModelTrait, EntityTrait, ModelTrait};
    use to_core::enums::store_type::StoreType;
    use to_core::to_machine::to_machine_option::ToMachineOption;
    use to_core::to_machine::to_machine_struct::ToMachine;

    #[tokio::test]
    async fn test_init_db() -> Result<(), Box<dyn Error>> {
        let random_folder = get_random_test_temp_folder_path_buf();
        ToMachine::new(
            random_folder.to_str().unwrap(),
            StoreType::SQLITE,
            Some(ToMachineOption {
                use_random_file_name: false,
                store_file_name: Some("test.db".to_string()),
                store_info: None,
                store_type: StoreType::SQLITE,
            }),
        )
        .await;

        Ok(())
    }
}
