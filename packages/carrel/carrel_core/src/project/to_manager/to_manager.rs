use crate::project::project_manager::ToManagerOption;
use crate::project::to_manager::error::ToManagerError;
use crate::project::to_manager::firefly_const::TO_JSON_TYPE_FOR_FIREFLY_V2;
use crate::project::to_manager::util_trait::{ToFirefliesUtils, ToFireflyUtils};
use async_trait::async_trait;
use carrel_commons::carrel::common::firefly::v2::Firefly;
use carrel_commons::generic::api::query::v1::StandardQuery;
use pebble_query::pebble_query_result::{
    PebbleQueryResult, PebbleQueryResultGeneric, PebbleQueryResultUtilTrait,
};
use serde_json::json;
use std::path::PathBuf;
use to_core::entities::prelude::TextualObjects;
use to_core::entities::textual_objects;
use to_core::enums::store_type::StoreType;
use to_core::implementation::util_func::ToUtilFunc;
use to_core::to::to_struct::TextualObject;
use to_core::to_db::to_orm::{QueryTo, ToOrm};
use to_core::to_dtos::to_add_request::ToAddManyRequest;
use to_core::to_dtos::to_add_request::ToAddRequest;
use to_core::to_dtos::to_add_request::ToStoredReceipt;
use to_core::to_machine::to_machine_option::ToMachineOption;
use to_core::to_machine::to_machine_pub_op::ToMPubMethods;
use to_core::to_machine::to_machine_struct::ToMachine;

pub struct FireflyKepper {
    pub to_db_name: String,
    pub to_db_directory: String,
}

#[async_trait]
pub trait KeepFireflies {
    fn new(to_db_directory: &str, to_db_name: &str, opt: ToManagerOption) -> Self;
    // get a tm for the current db.
    async fn get_tm(&self) -> Result<ToMachine, ToManagerError>;
    async fn init_to_db(&self);
    async fn save_firefly_to_to_db(
        &self,
        firefly: Vec<Firefly>,
    ) -> Result<ToStoredReceipt, ToManagerError>;
    fn get_tm_option(&self) -> ToMachineOption;
    fn get_empty_add_to_request(&self) -> ToAddManyRequest;

    async fn get_add_firefly_many_request(&self, fireflies: Vec<Firefly>) -> ToAddManyRequest;
    fn get_add_firefly_request(&self, firefly: Firefly) -> ToAddRequest;
    async fn find_any_with_modified_at(&self, modified_at: &str) -> bool;
    async fn get_to_orm(&self) -> ToOrm;
    async fn check_if_firefly_is_duplicated(&self, firefly: &Firefly) -> bool;
    async fn list_all_fireflies(&self) -> Vec<Firefly>;

    /// Main entry for querying fireflies.
    async fn query_fireflies(
        &self,
        query: StandardQuery,
    ) -> Result<PebbleQueryResultGeneric<Firefly>, ToManagerError>;
}

#[async_trait]
impl KeepFireflies for FireflyKepper {
    fn new(to_db_directory: &str, to_db_name: &str, _opt: ToManagerOption) -> Self {
        let path: PathBuf = PathBuf::from(to_db_directory);
        if !path.is_dir() {
            panic!("Cannot init ToDB because directory is invalid.")
        }
        let to_manager = FireflyKepper {
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
        )
            .await;
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
        )
            .await;
    }

    async fn save_firefly_to_to_db(
        &self,
        firefly: Vec<Firefly>,
    ) -> Result<ToStoredReceipt, ToManagerError> {
        let request = self.get_add_firefly_many_request(firefly).await;
        let mut tom = ToMachine::new_with_add_request(&request).await;
        let receipt = tom
            .add_tos(request)
            .await
            .map_err(ToManagerError::ToCoreError)
            .unwrap();
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

    async fn get_add_firefly_many_request(&self, fireflies: Vec<Firefly>) -> ToAddManyRequest {
        let mut wrapper = self.get_empty_add_to_request();
        for firefly in fireflies {
            // check for duplicate firefly in db by comparing the modified_at field of the firefly, if there is a duplicate then do not add it to the db.
            let is_duplicate = self.check_if_firefly_is_duplicated(&firefly).await;
            if !is_duplicate {
                let to_add_request = self.get_add_firefly_request(firefly);
                wrapper.tos.push(to_add_request);
            }
        }
        wrapper
    }

    fn get_add_firefly_request(&self, firefly: Firefly) -> ToAddRequest {
        ToAddRequest {
            /// see the definition on firefly_v2
            source_id: Some(firefly.unique_id.to_string()),
            source_id_type: Some("fire_fly_unique_id".to_string()),
            source_path: Some(firefly.file_full_path.clone()),
            source_name: firefly.file_full_name.clone(),
            json_type: Some(TO_JSON_TYPE_FOR_FIREFLY_V2.to_string()),
            json_unique_id: Some(firefly.modified_at.clone()),
            json: json!(firefly).to_string(),
        }
    }

    async fn find_any_with_modified_at(&self, modified_at: &str) -> bool {
        self.get_to_orm()
            .await
            .find_any_by_json_value("modified_at", modified_at)
            .await
            .unwrap()
    }

    async fn get_to_orm(&self) -> ToOrm {
        self.get_tm().await.unwrap().to_orm
    }

    async fn check_if_firefly_is_duplicated(&self, firefly: &Firefly) -> bool {
        self.find_any_with_modified_at(&firefly.modified_at).await
    }

    async fn list_all_fireflies(&self) -> Vec<Firefly> {
        let all_fireflies = self
            .get_to_orm()
            .await
            .find_all()
            .await
            .map_err(ToManagerError::ToOrmError)
            .unwrap();
        all_fireflies.into_fireflies()
    }

    async fn query_fireflies(
        &self,
        query: StandardQuery,
    ) -> Result<PebbleQueryResultGeneric<Firefly>, ToManagerError> {
        let to = self.get_to_orm().await;

        let to_results = to
            .query_tos(query)
            .await
            .map_err(ToManagerError::ToOrmError)
            .unwrap();

        let fireflies_result = to_results.map_into_generic(
            |to| to.into_common_firefly_v2(),
            Some("whether the textual object is a firefly".to_string()),
        );

        Ok(fireflies_result)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::project::to_manager::util_trait::ToFireflyUtils;
    use crate::test_utils::carrel_tester::CarrelTester;
    use crate::test_utils::project_tester::ProjectTester;
    use carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf;
    use carrel_utils::uuid::new_v4;
    use pdf_gongju::extract::extractor::{PdfExtractor, PdfGongju};
    use pdf_gongju::extract::extractor_options::ExtractorOption;
    use sea_orm::ActiveValue::Set;
    use sea_orm::{ActiveModelTrait, IntoActiveModel};

    // test extract firefly from to pdf and store it in to db
    #[tokio::test]
    async fn test_store_fireflies_to_pdf() {
        // extract firefly from pdf
        let chn_pdf = get_fixture_pdf_chn();
        assert!(chn_pdf.exists());

        let fireflies =
            PdfGongju::extract_fireflies(chn_pdf.to_str().unwrap(), &ExtractorOption::default())
                .unwrap();
        assert_eq!(fireflies.len(), 3);
        let pm = CarrelTester::get_project_manager_with_seeded_db().await;
        let receipt = pm.to.save_firefly_to_to_db(fireflies).await.unwrap();
        assert_eq!(receipt.total_tos_stored, 3);
        println!("to_manager: {:?}", json!(receipt));
    }

    // test extract firefly from to pdf and store it in to db
    #[tokio::test]
    async fn test_to_query_crud() {
        // extract firefly from pdf
        let chn_pdf = get_fixture_pdf_chn();
        assert!(chn_pdf.exists());

        let fireflies =
            PdfGongju::extract_fireflies(chn_pdf.to_str().unwrap(), &ExtractorOption::default())
                .unwrap();
        assert_eq!(fireflies.len(), 3);

        let pm = CarrelTester::get_project_manager_with_seeded_db().await;

        let initial_tos_count = pm.to.get_to_orm().await.count_tos().await.unwrap();

        assert_eq!(initial_tos_count, 3);

        let receipt = pm.to.save_firefly_to_to_db(fireflies).await.unwrap();
        assert_eq!(receipt.total_tos_stored, 3);

        let first_stored_to = receipt.tos_stored[0].clone();

        let to_query = pm.to.get_to_orm().await;
        let tos_count = to_query.count_tos().await.unwrap();
        assert_eq!(tos_count, initial_tos_count + 3);

        let result = to_query
            .find_by_ticket_id(first_stored_to.ticket_id.clone().as_str())
            .await
            .unwrap();

        assert_eq!(result.is_some(), true);
    }

    #[tokio::test]
    async fn test_get_firefly_from_to_db() {
        let pm = CarrelTester::get_project_manager_with_seeded_db().await;
        let to_query = pm.to.get_to_orm().await;
        let tos_count = to_query.count_tos().await.unwrap();
        assert_eq!(tos_count, 3);

        let tos = pm.to.get_to_orm().await.find_all().await.unwrap();
        let first_firefly_model = tos.into_iter().next().unwrap();

        let firefire = first_firefly_model.into_common_firefly_v2().unwrap();
        assert_eq!(firefire.file_full_name, "chn.pdf");
    }

    #[tokio::test]
    async fn test_find_any_with_modified_at() {
        let pm = CarrelTester::get_project_manager_with_seeded_db().await;
        let negative_result = pm
            .to
            .find_any_with_modified_at(new_v4().to_string().as_str())
            .await;
        assert_eq!(negative_result, false);

        let to_orm = pm.to.get_to_orm().await;

        let mut to = to_orm
            .find_all()
            .await
            .unwrap()
            .into_iter()
            .next()
            .unwrap()
            .into_active_model();
        let now_iso_string = carrel_utils::datetime::get_iso_string::get_now_iso_string();

        let mut to_firefly = to.clone().into_common_firefly_v2().unwrap();
        to_firefly.modified_at = now_iso_string.clone();

        to.json = Set(json!(to_firefly).to_string());

        let db = to_orm.get_connection().await.unwrap();

        to.save(&db).await.unwrap();

        let positive_result = pm
            .to
            .find_any_with_modified_at(now_iso_string.as_str())
            .await;
        assert_eq!(positive_result, true);
    }

    #[tokio::test]
    async fn test_no_duplication_save_fireflies_to_db() {
        let pm = CarrelTester::get_project_manager_with_seeded_db().await;
        let to_orm = pm.to.get_to_orm().await;
        let tos_count = to_orm.count_tos().await.unwrap();
        assert_eq!(tos_count, 3);

        let chn_pdf_path = get_fixture_pdf_chn();

        let fireflies = PdfGongju::extract_fireflies(
            chn_pdf_path.to_str().unwrap(),
            &ExtractorOption::default(),
        )
            .unwrap();

        assert_eq!(fireflies.len(), 3);

        // save first two fireflies
        let first_two_fireflies = fireflies[0..2].to_vec();

        assert_eq!(first_two_fireflies.len(), 2);
        // assert the first and the second firelies have different modified at time
        assert_ne!(
            first_two_fireflies[0].modified_at,
            first_two_fireflies[1].modified_at
        );

        let valid_requests = pm
            .to
            .get_add_firefly_many_request(first_two_fireflies.clone())
            .await;

        assert_eq!(valid_requests.tos.len(), 2);

        let receipt = pm
            .to
            .save_firefly_to_to_db(first_two_fireflies.clone())
            .await
            .unwrap();

        assert_eq!(receipt.total_tos_stored, 2);
        let tos_count_after_adding_two = to_orm.count_tos().await.unwrap();
        assert_eq!(tos_count_after_adding_two, 5);

        // save first two fireflies again
        let receipt = pm
            .to
            .save_firefly_to_to_db(first_two_fireflies)
            .await
            .unwrap();
        assert_eq!(receipt.total_tos_stored, 0);
        let tos_count_after_adding_two_again = to_orm.count_tos().await.unwrap();
        assert_eq!(tos_count_after_adding_two_again, 5);

        let third_firefly = fireflies[2].clone();
        let receipt = pm
            .to
            .save_firefly_to_to_db(vec![third_firefly.clone()])
            .await
            .unwrap();
        assert_eq!(receipt.total_tos_stored, 1);
        let tos_count_after_adding_third = to_orm.count_tos().await.unwrap();
        assert_eq!(tos_count_after_adding_third, 6);

        // add third firefly again
        let receipt = pm
            .to
            .save_firefly_to_to_db(vec![third_firefly])
            .await
            .unwrap();
        assert_eq!(receipt.total_tos_stored, 0);
        let tos_count_after_adding_third_again = to_orm.count_tos().await.unwrap();
        assert_eq!(tos_count_after_adding_third_again, 6);
    }

    fn get_fixture_pdf_chn() -> PathBuf {
        let fixture_chn_pdf = get_test_fixture_module_folder_path_buf("pdfs").join("chn.pdf");
        fixture_chn_pdf
    }

    // test list all fireflies
    #[tokio::test]
    async fn test_list_all_fireflies() {
        let pm = CarrelTester::get_project_manager_with_seeded_db().await;
        let fireflies = pm.to.list_all_fireflies().await;
        assert_eq!(fireflies.len(), 1); // only one seeded entry has json, hence only one firefly
    }
}
