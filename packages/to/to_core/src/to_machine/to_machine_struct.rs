use crate::to_db::migrate::init_db;
use std::path::PathBuf;

use crate::enums::store_type::StoreType;
use crate::to_db::to_orm::{ToOrm, ToOrmError};
use crate::to_dtos::to_add_request::ToAddManyRequest;
use crate::to_dtos::to_find_dto::ToFindRequestDto;
use crate::to_machine::to_machine_option::ToMachineOption;
use crate::utils::id_generator::generate_id;
use crate::utils::join_path::join_dir_and_file_name;
use crate::utils::split_store_path::split_store_path;

///
/// The main entry point of TO application. This needs to be written in as many languages as there is a need for.
/// This is the Rust version.
///
/// # Examples
///
/// ```
///
/// ```
#[derive(Debug, Clone)]
pub struct ToMachine {
    // store type
    pub(crate) store_type: StoreType,
    // store path, that implements Copy
    pub(crate) store_url: String,
    // store info that describe what this store does
    pub(crate) store_info: String,
    // number of tos in the store, read only for the outside world
    pub(crate) to_count: u64,

    pub to_orm: ToOrm,
}

// default constructor for ToMachine
impl ToMachine {
    /// default constructor for ToMachine
    pub async fn new(
        store_directory: &str,
        store_type: StoreType,
        input_opt: Option<ToMachineOption>,
    ) -> Self {
        // check if store_directory is a path to a directory, not a path to a file
        let path = PathBuf::from(store_directory);

        // check if path exists
        if !path.exists() {
            // create directory
            std::fs::create_dir_all(&path).unwrap();
        }

        if !path.is_dir() {
            panic!(
                "{} is a path to a file, not a path to a directory",
                store_directory
            );
        }

        let to_count = 0;

        // check if the opt.store_file_name is specified, defaults to _to_store.db
        let mut store_file_name = "_to_store.db".to_string();

        if let Some(opt) = &input_opt {
            if opt.use_random_file_name {
                store_file_name = generate_id();
            } else {
                if let Some(store_file_name_opt) = &opt.store_file_name {
                    store_file_name = store_file_name_opt.to_string();
                }
            }
        }

        // instantiate an temporary object
        let mut tom = ToMachine {
            store_type,
            store_url: String::new(),
            to_orm: ToOrm::temporary(),
            store_info: input_opt
                .unwrap_or(ToMachineOption::default())
                .store_info
                .clone()
                .unwrap_or("".to_string()),
            to_count,
        };

        // initialize db and complete temporary object information
        match store_type {
            StoreType::JSON => {
                // create a new TextualObjectMachineRs with JSON store
                // check if json file exists, if not, throw an error
                // if !Path::new(&store_path_str).exists() {
                //     panic!("JSON file does not exist");
                // }
            }
            StoreType::SQLITE => {
                let db_path = join_dir_and_file_name(store_directory, &store_file_name);
                // create a new TextualObjectMachineRs with SQLITE store
                // check if sqlite file exists, if not, throw an error
                let db_path = init_db(db_path.as_str()).await;
                match db_path {
                    Ok(valid_db_path) => {
                        tom.store_url = valid_db_path;
                    }
                    Err(e) => match e {
                        ToOrmError::DatabaseFileAlreadyExistError(valid_db_path) => {
                            tom.store_url = valid_db_path;
                        }
                        _ => {
                            panic!(
                                "Check file conflict: cannot initialize database at {}",
                                join_dir_and_file_name(store_directory, &store_file_name)
                            );
                        }
                    },
                }
            }
        }

        // instantiate to_query
        tom.to_orm = ToOrm::new(tom.store_url.as_str());

        // update item count
        tom.update_to_count().await;
        tom
    }

    // instantiate ToM from TextualObjectAddManyDto
    pub async fn new_with_add_request(dto: &ToAddManyRequest) -> Self {
        ToMachine::new(
            &dto.store_dir,
            StoreType::SQLITE,
            Some(ToMachineOption {
                store_info: dto.store_info.clone(),
                use_random_file_name: false,
                store_file_name: dto.store_filename.clone(),
                ..Default::default()
            }),
        )
        .await
    }

    // instantiate ToM from TextualObjectFindRequestDto
    pub async fn new_with_find_request(dto: &ToFindRequestDto) -> Self {
        // check if store_full_path is provided, if not, use dir and filename

        let (dir, filename) = split_store_path(&dto.store_url);

        ToMachine::new(
            &dir,
            StoreType::SQLITE,
            Some(ToMachineOption {
                use_random_file_name: false,
                store_file_name: Some(filename),
                ..Default::default()
            }),
        )
        .await
    }
}

// implementing getters and setters for TextualObjectMachineRs
impl ToMachine {
    pub fn get_store_type(&self) -> StoreType {
        self.store_type
    }
    pub fn get_store_path(&self) -> String {
        self.store_url.clone()
    }
    pub fn get_to_count(&self) -> u64 {
        self.to_count
    }
    pub fn set_to_count(&mut self, to_count: u64) {
        self.to_count = to_count;
    }
}

// tests for TextualObjectMachineRs
#[cfg(test)]
mod tests {
    use std::path::PathBuf;

    use crate::enums::store_type::StoreType;
    use crate::to_machine::to_machine_option::ToMachineOption;
    use crate::to_machine::to_machine_struct::ToMachine;
    use crate::utils::id_generator::generate_id;

    // initiate for tests

    pub fn get_test_asset_path(file_name: Option<&str>) -> String {
        let mut cargo_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
        cargo_dir.push("resources/test/db");
        if let Some(file_name) = file_name {
            cargo_dir.push(file_name);
        } else {
        }
        cargo_dir.into_os_string().into_string().unwrap()
    }

    // test new() db with existent sqlite
    #[tokio::test]
    async fn test_initialize_tom_with_random_store_name() {
        let test_db_file_name = generate_id();
        let existent_sqlite_file = get_test_asset_path(None);
        // create a new TextualObjectMachineRs with SQLITE store
        let machine = ToMachine::new(
            existent_sqlite_file.as_str(),
            StoreType::SQLITE,
            Some(ToMachineOption::new().set_store_file_name(Some(test_db_file_name.as_str()))),
        )
        .await;
        // check if the machine is created
        assert_eq!(machine.store_type, StoreType::SQLITE);
        assert_eq!(machine.to_count, 3);
    }
}
