// implement data operation methods for TextualObjectMachine

use std::borrow::BorrowMut;

use entity::entities::textual_objects::Model;
use uuid::Uuid;

use crate::to::to_struct::TextualObject;
use crate::to_db::to_orm::ToOrmTrait;
use crate::to_db::util_trait::{ToOrmMapper, ToOrmMapperTrait};
use crate::to_machine::to_machine_struct::ToMachine;
use crate::to_tag::to_tag_struct::ToTag;
use crate::utils::id_generator::generate_id;

impl ToMachine {
    pub async fn update_to_count(&mut self) -> u64 {
        let count = self.to_orm.count_tos().await.unwrap_or(0);
        self.set_to_count(count);
        self.to_count
    }

    // add from

    pub async fn add_textual_object(&mut self, textual_object: TextualObject, tags: Vec<ToTag>) -> TextualObject {
        let added_to = self.to_orm.insert_to(textual_object, tags).await.unwrap();
        // update to_count
        self.update_to_count().await;

        let inserted_to = self.to_orm.find_by_id(added_to).await.unwrap().expect("to cannot be created");

        inserted_to
    }

    // find by ticket id
    pub async fn find_by_ticket_id(&mut self, ticket_id: &str) -> Option<TextualObject> {
        let to = self.to_orm.find_by_ticket_id(ticket_id).await.unwrap();
        if to.is_none() {
            return None
        }
        let to = to.unwrap();
        let tags = self.to_orm.get_tags_by_to(to.clone()).await;
        let to_with_tags = ToOrmMapper::to_and_tag_model_to_to_and_tag(to, tags);
        Some(to_with_tags)

    }

    // find all by ticket ids
    pub async fn find_all(&mut self, ticket_ids: &Vec<&str>) -> Vec<TextualObject> {
        // use find method to get all tos
        let mut found_tos = Vec::new();
        for ticket_id in ticket_ids {
            let found_to = self.find_by_ticket_id(ticket_id).await;
            match found_to {
                Some(found_to) => {
                    found_tos.push(found_to);
                }
                None => {
                    // do nothing
                }
            }
        }
        found_tos
    }

    // delete by ticket id, return true if successful
    pub async fn delete_by_ticket_id(&mut self, ticket_id: &str) -> () {
        // let result = delete_to_by_ticket_id(pool.borrow_mut(), ticket_id).await;
        self.to_orm.delete_by_ticket_id(ticket_id).await.unwrap();
        // update to_count
        self.update_to_count().await;
    }

    pub async fn get_unique_ticket_id(&mut self) -> String {
        let mut unique_ticket_id_to_try = generate_id();
        while self
            .to_orm
            .check_if_ticket_id_exists(unique_ticket_id_to_try.as_str())
            .await
            .unwrap()
        {
            unique_ticket_id_to_try = generate_id();
        }
        unique_ticket_id_to_try
    }
}

// tests for TextualObjectMachine operation methods
#[cfg(test)]
mod test {

    // initiate for tests

    use carrel_utils::test::test_folders::get_random_test_temp_folder_path_buf;
    use carrel_utils::uuid::new_v4;
    use std::path::PathBuf;
    use uuid::Uuid;

    use crate::enums::store_type::StoreType;
    use crate::to::to_struct::TextualObject;
    use crate::to_db::to_orm::ToOrmTrait;
    use crate::to_machine::to_machine_option::ToMachineOption;
    use crate::to_machine::to_machine_struct::ToMachine;
    use crate::to_tag::to_tag_struct::ToTag;
    use crate::utils::get_random_test_database_dir::get_random_test_database_dir;
    use crate::utils::id_generator::generate_id;

    pub fn get_test_asset_path(file_name: &str) -> String {
        let mut cargo_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
        cargo_dir.push("resources/test/");
        cargo_dir.push(file_name);
        // convert the PathBuf to path string
        cargo_dir.into_os_string().into_string().unwrap()
    }

    pub fn get_test_asset_path_without_file() -> String {
        let mut cargo_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
        cargo_dir.push("resources/test/db/");
        // convert the PathBuf to path string
        cargo_dir.into_os_string().into_string().unwrap()
    }

    pub fn get_test_asset_path_with_default_name() -> String {
        let mut cargo_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
        cargo_dir.push("resources/test/");
        cargo_dir.push("_to_store.db");
        // convert the PathBuf to path string
        cargo_dir.into_os_string().into_string().unwrap()
    }

    // test add to to existent sqlite
    #[tokio::test]
    async fn test_new_existent_sqlite_add() {
        let existent_sqlite_file = get_test_asset_path_without_file();
        // create a new TextualObjectMachineRs with SQLITE store
        let mut tom = ToMachine::new(
            &existent_sqlite_file,
            StoreType::SQLITE,
            Some(ToMachineOption {
                use_random_file_name: true,
                ..Default::default()
            }),
        )
        .await;
        let current_to_count = tom.to_count;
        // check if the machine is created
        assert_eq!(tom.store_type, StoreType::SQLITE);
        // create a new textual object
        let sample_to = TextualObject::get_sample();
        let sample_tags = ToTag::get_random_totags(sample_to.uuid,  3);
        // add the textual object to the machine
        let _id = tom.add_textual_object(sample_to, sample_tags).await;
        // check if the textual object is added
        assert_eq!(tom.to_count, current_to_count + 1);
    }

    // test find by ticket id
    #[tokio::test]
    async fn test_find_by_ticket_id() {
        let existent_sqlite_file = get_test_asset_path_without_file();
        // create a new TextualObjectMachineRs with SQLITE store
        let mut tom = ToMachine::new(
            &existent_sqlite_file,
            StoreType::SQLITE,
            Some(ToMachineOption {
                store_file_name: Some(generate_id()),
                ..Default::default()
            }),
        )
        .await;
        let current_to_count = tom.to_count;
        // check if the machine is created
        assert_eq!(tom.store_type, StoreType::SQLITE);
        // create a new textual object
        let sample_to = TextualObject::get_sample();
        let sample_tags = ToTag::get_random_totags(sample_to.uuid,  3);
        // add the textual object to the machine
        let _id = tom.add_textual_object(sample_to.clone(), sample_tags).await;
        // check if the textual object is added
        assert_eq!(tom.to_count, current_to_count + 1);
        // find the textual object by ticket id
        let found_to = tom.find_by_ticket_id(&sample_to.ticket_id).await;
        // check if the textual object is found
        assert_eq!(found_to.unwrap().ticket_id, sample_to.ticket_id);
    }

    // test delete by ticket id
    #[tokio::test]
    async fn test_delete_by_ticket_id() {
        let random_dir = get_random_test_temp_folder_path_buf();

        // create a new TextualObjectMachineRs with SQLITE store
        let mut tom = ToMachine::new(
            &random_dir.to_str().unwrap(),
            StoreType::SQLITE,
            Some(ToMachineOption {
                use_random_file_name: true,
                ..Default::default()
            }),
        )
        .await;
        let current_to_count = tom.to_count;
        assert_eq!(current_to_count, 3);

        // get first ticket_id
        let first_ticket_id = tom
            .to_orm
            .find_all()
            .await
            .unwrap()
            .first()
            .unwrap()
            .ticket_id
            .clone();
        // delete by ticket_id
        tom.delete_by_ticket_id(&first_ticket_id).await;
        // check if the count is decreased
        assert_eq!(tom.to_count, current_to_count - 1);
        // check if the deleted ticket_id is not found
        let found_to = tom.find_by_ticket_id(&first_ticket_id).await;
        assert_eq!(found_to.is_some(), false);
    }

    // test find non existent by ticket id should return None
    #[tokio::test]
    async fn test_find_non_existent_by_ticket_id() {
        let random_dir = get_random_test_temp_folder_path_buf();

        // create a new TextualObjectMachineRs with SQLITE store
        let mut tom = ToMachine::new(
            &random_dir.to_str().unwrap(),
            StoreType::SQLITE,
            Some(ToMachineOption {
                use_random_file_name: true,
                ..Default::default()
            }),
        )
        .await;

        // find the textual object by ticket id
        let found_to = tom.find_by_ticket_id(new_v4().to_string().as_str()).await;
        // check if the textual object is found
        assert_eq!(found_to.is_some(), false);
    }

    // test find all by ticket ids
    #[tokio::test]
    async fn test_find_all_by_ticket_ids() {
        let random_dir = get_random_test_temp_folder_path_buf();
        // create a new TextualObjectMachineRs with SQLITE store
        let mut tom = ToMachine::new(
            &random_dir.to_str().unwrap(),
            StoreType::SQLITE,
            Some(ToMachineOption {
                use_random_file_name: true,
                ..Default::default()
            }),
        )
        .await;

        let _current_to_count = tom.to_count;
        // create three new textual objects
        let sample_to1 = TextualObject::get_sample();
        let sample_to2 = TextualObject::get_sample();
        let sample_to3 = TextualObject::get_sample();
        // add the textual objects to the machine
        let _id1 = tom.add_textual_object(sample_to1.clone(), vec![]).await;
        let _id2 = tom.add_textual_object(sample_to2.clone(), vec![]).await;
        let _id3 = tom.add_textual_object(sample_to3.clone(), vec![]).await;
        // find all the textual objects by ticket ids
        let found_tos = tom
            .find_all(&vec![
                &sample_to1.ticket_id,
                &sample_to2.ticket_id,
                &sample_to3.ticket_id,
            ])
            .await;
        // check if the textual objects are found
        assert_eq!(found_tos.len(), 3);
        // check if the textual objects are found
        assert_eq!(&found_tos[0].ticket_id, &sample_to1.ticket_id);
    }

    // test get unique ticket id
    #[tokio::test]
    async fn test_get_unique_ticket_id() {
        let random_database_dir = get_random_test_database_dir();
        // create a new TextualObjectMachineRs with SQLITE store
        let mut tom = ToMachine::new(
            &random_database_dir,
            StoreType::SQLITE,
            Some(ToMachineOption {
                use_random_file_name: true,
                ..Default::default()
            }),
        )
        .await;
        // check if the machine is created
        let unique_ticket_id = tom.get_unique_ticket_id().await;
        // check if the ticket id is unique
        assert_eq!(unique_ticket_id.len(), 5);
    }
}
