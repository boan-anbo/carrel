use std::path::PathBuf;
use dotenv::dotenv;
fn main() {

    // create dev db file if it doesn't exists
    dotenv().ok();

    // get DATABASE_URL
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // create db file if it doesn't exists
    let mut db_file = std::path::PathBuf::from(&database_url);
    // it's in the format of "sqlite://./db.sqlite"

    // get the last part as db file name
    let db_file_name = db_file.file_name().unwrap().to_str().unwrap();

    let db_path = PathBuf::from(db_file_name);
    // create if it doesn't exists
    if !db_path.exists() {
        std::fs::File::create(db_path).unwrap();
    }


    // get temp folder
    let temp_test_folder = carrel_utils::test::test_folders::get_test_temp_path_buf();
    // remove if it exists
    if temp_test_folder.exists() {
        std::fs::remove_dir_all(temp_test_folder).unwrap();
    }




}
