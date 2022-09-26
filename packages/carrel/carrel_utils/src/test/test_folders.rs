use std::path::PathBuf;


/// Get the path to the test folder under Cargo root folder
pub fn get_cargo_root_test_folder() -> PathBuf {
    let cargo_root_path = std::env::var("CARGO_MANIFEST_DIR").unwrap();
    let tests_path = format!("{}/tests", cargo_root_path);
    PathBuf::from(tests_path)
}

/// Get a dedicated unit test fixture folder under `tests/fixtures/{MODULE_NAME}`
///
/// This test folder is dedicated to the unit test module.
/// It should be deleted after the test.
pub fn get_unit_test_module_folder(module_name: &str) -> String {

    let tests_fixtures_path = get_cargo_root_test_folder().join(module_name);
    // create if not exists
    std::fs::create_dir_all(&tests_fixtures_path).unwrap();
    tests_fixtures_path.to_str().unwrap().to_string()
}

/// Get the fixture path under `tests/fixtures`
pub fn get_test_fixture_path() -> String {
    let tests_fixtures_path = get_cargo_root_test_folder().join("fixtures");
    tests_fixtures_path.to_str().unwrap().to_string()
}

/// Get the fixture path buf under `tests/fixtures`
pub fn get_test_fixture_path_buf() -> PathBuf {
    get_cargo_root_test_folder().join("fixtures")
}
