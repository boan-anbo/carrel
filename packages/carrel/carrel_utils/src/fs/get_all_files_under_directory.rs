use std::fs;
use std::path::PathBuf;
use regex::Regex;
use crate::fs::supported_text_check::has_extensions;

/// List all files with the given extension under the given directory.
/// if extensions are not given, all files are returned.
/// If regex is given, only files that match the regex are returned.
///
///
/// # Arguments
///
/// * `directory`:
/// * `extensions`:
///
/// returns: Vec<String, Global>
///
/// # Examples
///
/// ```
/// use regex::Regex;
/// use carrel_utils::fs::get_all_files_under_directory::get_all_files_under_directory;
///
/// let directory = "directory_to_scan";
///
/// let extensions = vec!["txt", "md"];
/// let regex = Regex::new(r"file\d").unwrap();
///
/// let files = get_all_files_under_directory(directory, &extensions, Some(&regex));
/// ```
pub fn get_all_file_pathbufs_under_directory(directory: &str, extensions: &[&str], regex: Option<&Regex>) -> Vec<PathBuf> {
    let mut all_files: Vec<PathBuf> = Vec::new();

    // read all files under directory recursively to include subdirectories
    let directory = fs::read_dir(directory).unwrap_or_else(|_| panic!("directory not found: {}", directory));

    // loop over files
    for entry in directory {
        let entry = entry.expect("failed to read entry");
        let path = entry.path();

        let path_str = path.to_str().unwrap();

        let is_file = path.is_file();


        // if path is file
        if is_file {
            let mut should_push = true;


            let passed_extension_check = if !extensions.is_empty() {
                has_extensions(extensions, path_str)
            } else {
                true
            };

            // check if file matches regex if regex is given
            let passed_regex_check = if let Some(regex) = regex {
                regex.is_match(path_str)
            } else {
                true
            };

            if !passed_extension_check || !passed_regex_check {
                should_push = false;
            }

            if should_push {
                all_files.push(path.clone());
            }

        }

        // if path is directory then recursively scan directory
        if path.is_dir() {
            let mut sub_directory_files = get_all_file_pathbufs_under_directory(path_str, extensions, regex);
            all_files.append(&mut sub_directory_files);
        }
    };
    all_files

}

/// Get all files under the given directory, but as strings
pub fn get_all_file_paths_under_directory(directory: &str, extensions: &[&str], regex: Option<&Regex>) -> Vec<String> {
    let results = get_all_file_pathbufs_under_directory(directory, extensions, regex);
    let mut results_as_strings: Vec<String> = Vec::new();
    for result in results {
        results_as_strings.push(result.to_str().unwrap().to_string());
    }
    results_as_strings
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_all_files_under_directory() {
        let files_txt = get_all_file_pathbufs_under_directory("tests", &["txt"], None);
        assert_eq!(files_txt.len(), 2);
        let files_all = get_all_file_pathbufs_under_directory("tests", &[], None);
        assert_eq!(files_all.len(), 3);

        let files_starts_with_file_1 = get_all_file_pathbufs_under_directory("tests", &[], Some(&Regex::new(r"file1").unwrap()));

        assert_eq!(files_starts_with_file_1.len(), 1);

        let files_starts_with_file_3_and_md = get_all_file_pathbufs_under_directory("tests", &["md"], Some(&Regex::new(r"file3").unwrap()));

        assert_eq!(files_starts_with_file_3_and_md.len(), 1);

        // fail cases
        let file_starts_with_file_3_and_txt
= get_all_file_pathbufs_under_directory("tests", &["txt"], Some(&Regex::new(r"file3").unwrap()));

        assert_eq!(file_starts_with_file_3_and_txt.len(), 0);

    }
}
