
/// shared setup for tests
#[cfg(test)]
pub mod setup_tests {

    pub(crate) fn get_alltest_fixture_path() -> String {
        // get Cargo root path
        let cargo_root_path = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        let tests_fixtures_path = format!("{}/tests/fixtures", cargo_root_path);
        tests_fixtures_path
    }
}
