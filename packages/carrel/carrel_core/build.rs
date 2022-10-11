use carrel_utils::test::test_folders::get_test_temp_path_buf;
use std::fs;

pub fn main() {
    // remove all temp folders before tests started
    let temp_folders = get_test_temp_path_buf();
    fs::remove_dir_all(temp_folders).unwrap();
}
