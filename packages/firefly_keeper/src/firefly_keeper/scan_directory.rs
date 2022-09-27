use std::io;
use std::borrow::Borrow;

use carrel_commons::carrel::firefly_keeper::v1::Fireflies;
use to_core::to_tag::to_tag_struct::ToTag;
use to_core::to_parser::parser::ToParser;
use to_core::to_parser::parser_option::ToParserOption;
use crate::firefly_keeper::collect_fireflies::collect_fireflies;
use crate::firefly_keeper::core::FireflyKeeper;
use crate::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;
use crate::firefly_keeper::internal_scan_results::InternalScanResults;



impl FireflyKeeper {


    pub fn scan_directory(directory: &str, opt: &FireflyKeeperOption) -> Result<Fireflies, io::Error> {

        // construct initial result
        let results = InternalScanResults::default();

        let all_tags = get_all_tags_under_directory_recursive(results, directory, opt);

        let result = collect_fireflies(all_tags, Some(directory.to_string()), opt);
        // test result
        Ok(result)
    }

    pub fn scan_files(files: &[&str], option: &FireflyKeeperOption) -> Result<Fireflies, io::Error> {
        // construct initial result
        let all_tags = get_all_tags_in_files(files);
        let result = collect_fireflies(all_tags, None,option);
        // test result
        Ok(result)
    }


}


fn get_all_tags_in_files(files: &[&str]) -> InternalScanResults {

    let mut all_tags = Vec::new();
    for file in files {
        let result  = ToParser::scan_file_for_tags(file, &ToParserOption::default()).unwrap();
        all_tags.extend(result.tos);

    }
    InternalScanResults{
        all_files_scaned: 0,
        text_files_scaned: 0,
        tags: all_tags,
    }
}


// scan all folders recursively and get all tags
fn get_all_tags_under_directory_recursive(internal_scan_results: InternalScanResults, directory: &str, opt: &FireflyKeeperOption) -> InternalScanResults {
    let mut all_tags: Vec<ToTag> = Vec::new();

    // file statistics
    let mut all_files_scaned = internal_scan_results.borrow().all_files_scaned;
    let mut text_files_scaned = internal_scan_results.borrow().text_files_scaned;

    // read all files under directory recursively to include subdirectories
    let directory = std::fs::read_dir(directory).unwrap_or_else(|_| panic!("directory not found: {}", directory));

    // loop over files and extract all tags from each file
    for entry in directory {
        // add 1 to all files scaned

        let entry = entry.expect("failed to read entry");
        let path = entry.path();


        let path_str = path.to_str().unwrap();


        let is_file = path.is_file();

        if is_file {
            all_files_scaned += 1;
        }
        // if path is 'txt' or 'md' file
        let is_supported_file = carrel_utils::fs::supported_text_check::has_extensions(&["txt", "md"], path_str);

        // if path is file
        if is_file && is_supported_file {
            // add 1 to text files scaned
            text_files_scaned += 1;
            // get file tags
            let scan_result = ToParser::scan_file_for_tags(path_str, &ToParserOption::default());

            if let Ok(result) = scan_result {
                all_tags.extend(result.tos);
            }
        }

        // if path is directory then recursively scan directory
        if path.is_dir() {
            let mut sub_directory_tags = get_all_tags_under_directory_recursive(InternalScanResults{
                                        all_files_scaned,
                                        text_files_scaned,
                                        tags: vec![],
                                    },
                                    path_str,
                                    opt);
            all_tags.append(&mut sub_directory_tags.tags);
            all_files_scaned = sub_directory_tags.all_files_scaned;
            text_files_scaned = sub_directory_tags.text_files_scaned;
        }
    };
    InternalScanResults{
        all_files_scaned,
        text_files_scaned,
        tags: all_tags,
    }
}

#[cfg(test)]
mod tests {
    use carrel_utils::fs::get_all_files_under_directory::{get_all_file_paths_under_directory};
    use crate::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;
    use super::*;

    #[test]
    fn test_scan_directory() {
        // get rust environment variable for root directory of project
        let root_dir = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        // use its test folder as directory to scan
        let test_directory = format!("{}/tests", root_dir);

        let result = FireflyKeeper::scan_directory(&test_directory, &FireflyKeeperOption{
            ..Default::default()
        }).unwrap();
        assert_eq!(result.all_tags_count, 4);
        assert_eq!(result.notes.len(), 2);
    }

    #[test]
    fn should_scan_files() {
        // get rust environment variable for root directory of project
        let root_dir = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        // use its test folder as directory to scan
        let test_directory = format!("{}/tests", root_dir);
        // recursively get all files under test directory
        let files = get_all_file_paths_under_directory(&test_directory, &["txt", "md"], None);

        let file_paths: Vec<&str> =  files.iter().map(|file| file.as_str()).collect();

        let result = FireflyKeeper::scan_files(&file_paths, &FireflyKeeperOption::default()).unwrap();
        assert_eq!(result.all_tags_count, 4);
        assert_eq!(result.notes.len(), 2);
    }

    #[test]
    fn test_real_directory() {
        // get rust environment variable for root directory of project
        // use its test folder as directory to scan
        let test_directory = "D:/Dropbox/NEra/[W] Writing Projects";

        let result = FireflyKeeper::scan_directory(
            &test_directory,
            &FireflyKeeperOption::default(),
        ).expect("error scanning directory");
        assert_eq!(result.all_tags_count, 1262);
    }

    #[test]
    fn should_have_all_text_scanned_and_all_files_scanned() {
        // get rust environment variable for root directory of project
        let root_dir = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        // use its test folder as directory to scan
        let test_directory = format!("{}/tests", root_dir);


        let firefly_keeper =get_all_tags_under_directory_recursive(InternalScanResults::default(), &test_directory, &FireflyKeeperOption::default());
        let all_files_scaned = firefly_keeper.all_files_scaned;
        let text_files_scaned = firefly_keeper.text_files_scaned;
        assert_eq!(all_files_scaned, 4);
        assert_eq!(text_files_scaned, 3);
    }



}