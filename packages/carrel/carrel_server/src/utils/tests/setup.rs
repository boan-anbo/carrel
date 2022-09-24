/// shared setup for tests
///
/// To run integration tests, launch the server first, and then run the tests
#[cfg(test)]
pub mod setup_tests {

    fn get_all_test_fixture_path() -> String {
        // get Cargo root path
        let cargo_root_path = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        let tests_fixtures_path = format!("{}/tests/fixtures", cargo_root_path);
        tests_fixtures_path
    }

    // get unit test fixture path under tests/fixtures
    pub(crate) fn get_unit_test_fixture_path(module_name: &str) -> String {
        let tests_fixtures_path = get_all_test_fixture_path();
        let module_fixtures_path = format!("{}/{}", tests_fixtures_path, module_name);
        // create if not exists
        std::fs::create_dir_all(module_fixtures_path.clone()).unwrap();
        module_fixtures_path
    }
}
