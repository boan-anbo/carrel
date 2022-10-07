use std::path::PathBuf;
use async_trait::async_trait;
use carrel_commons::carrel::common::firefly::v2::Firefly;
use serde_json::json;
use to_core::enums::store_type::StoreType;
use to_core::to_dtos::to_add_dto::ToAddManyRequest;
use to_core::to_dtos::to_add_dto::ToAddRequest;
use to_core::to_dtos::to_add_dto::ToStoredReceipt;
use to_core::to_machine::to_machine_option::ToMachineOption;
use to_core::to_machine::to_machine_pub_op::ToMPubMethods;
use to_core::to_machine::to_machine_struct::ToMachine;
use crate::project::project_manager::ToManagerOption;
use crate::project::to_manager::error::ToManagerError;

pub struct ToManager {
    pub to_db_name: String,
    pub to_db_directory: String,
}

#[async_trait]
pub trait ManageTo {
    async fn new(to_db_directory: &str, to_db_name: &str, opt: ToManagerOption) -> Self;
    // get a tm for the current db.
    async fn get_tm(&self) -> Result<ToMachine, ToManagerError>;
    async fn init_to_db(&self);
    async fn save_firefly_to_to_db(&self, firefly: Vec<Firefly>) -> Result<ToStoredReceipt, ToManagerError>;
    fn get_tm_option(&self) -> ToMachineOption;
    fn get_empty_add_to_request(&self) -> ToAddManyRequest;

    fn get_add_firefly_many_request(&self, fireflies: Vec<Firefly>) -> ToAddManyRequest;
    fn get_add_firefly_request(&self, firefly: Firefly) -> ToAddRequest;
}


#[async_trait]
impl ManageTo for ToManager {
    async fn new(to_db_directory: &str, to_db_name: &str, _opt: ToManagerOption) -> Self {
        let path: PathBuf = PathBuf::from(to_db_directory);
        if !path.is_dir() {
            panic!("Cannot init ToDB because directory is invalid.")
        }
        let to_manager = ToManager {
            to_db_name: to_db_name.to_string(),
            to_db_directory: to_db_directory.to_string(),
        };
        to_manager
    }

    async fn get_tm(&self) -> Result<ToMachine, ToManagerError> {
        let tom_option = self.get_tm_option();
        let to_machine = ToMachine::new(
            self.to_db_directory.as_str(),
            StoreType::SQLITE,
            Some(tom_option),
        ).await;
        Ok(to_machine)
    }

    async fn init_to_db(&self) {
        // init the to db by initializing a db with ToMachine
        ToMachine::new(
            self.to_db_directory.as_str(),
            StoreType::SQLITE,
            Some(ToMachineOption {
                use_random_file_name: false,
                store_file_name: Some(self.to_db_name.clone()),
                store_info: Some("carrel to db".to_string()),
                store_type: StoreType::JSON,
            }),
        ).await;
    }

    async fn save_firefly_to_to_db(&self, firefly: Vec<Firefly>) -> Result<ToStoredReceipt, ToManagerError> {
        let request = self.get_add_firefly_many_request(firefly);
        let mut tom = ToMachine::new_with_add_request(
            &request,
        ).await;
        let receipt = tom.add_tos(request).await.map_err(ToManagerError::ToCoreError).unwrap();
        Ok(receipt)
    }

    fn get_tm_option(&self) -> ToMachineOption {
        ToMachineOption {
            use_random_file_name: false,
            store_file_name: Some(self.to_db_name.clone()),
            store_info: Some("carrel to db".to_string()),
            store_type: StoreType::SQLITE,
        }
    }

    fn get_empty_add_to_request(&self) -> ToAddManyRequest {
        ToAddManyRequest {
            tos: vec![],
            overwrite: false,
            store_info: Some("carrel to db".to_string()),
            store_dir: self.to_db_directory.clone(),
            store_filename: Some(self.to_db_name.clone()),
            card_map_rules: vec![],
        }
    }

    fn get_add_firefly_request(&self, firefly: Firefly) -> ToAddRequest {
        ToAddRequest {
            /// see the definition on firefly_v2
            source_id: Some(firefly.unique_id.to_string()),
            source_id_type: Some("fire_fly_unique_id".to_string()),
            source_path: Some(firefly.file_full_path.clone()),
            source_name: firefly.file_full_name.clone(),
            json: json!(firefly),
        }
    }

    fn get_add_firefly_many_request(&self, fireflies: Vec<Firefly>) -> ToAddManyRequest {
        let mut wrapper = self.get_empty_add_to_request();
        for firefly in fireflies {
            let add_request = self.get_add_firefly_request(firefly);
            wrapper.tos.push(add_request);
        }
        wrapper
    }
}




#[cfg(test)]
mod tests {
    use carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf;
    use pdf_gongju::extract::extractor::{PdfExtractor, PdfGongju};
    use pdf_gongju::extract::extractor_options::ExtractorOption;
    use super::*;


    // test extract firefly from to pdf and store it in to db
    #[tokio::test]
    async fn test_store_fireflies_to_pdf() {
        // extract firefly from pdf
        let fixture_dir = get_test_fixture_module_folder_path_buf("pdfs");
        let chn_pdf = fixture_dir.join("chn.pdf");
        assert!(chn_pdf.exists());

        let fireflies = PdfGongju::extract_fireflies(chn_pdf.to_str().unwrap(),
            &ExtractorOption::default()
        ).unwrap();
        assert_eq!(fireflies.len(), 1);
    }
}


