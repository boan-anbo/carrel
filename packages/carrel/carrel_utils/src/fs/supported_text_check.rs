// check file extensions

use std::ffi::OsStr;
use std::path::PathBuf;

pub fn is_supported_text_files(supported_files_extensions: &[&str], file_path: &str) -> bool {
    let path_buf = PathBuf::from(file_path);
    // return false if is not a file
    if !path_buf.is_file() {
        return false;
    }

    // make file extension lowercase
    let lowered_supported_file_extensions: Vec<String> = supported_files_extensions
        .iter()
        .map(|&x| x.to_lowercase())
        .collect();
    let extension_parse_result = path_buf
        .extension();

    // if ther path has no extension then return false else return the value
    if extension_parse_result.is_none() {
        return false;
    }

    let extension = extension_parse_result
        .unwrap()
        .to_str()
        .unwrap();


    lowered_supported_file_extensions.contains(&extension.to_lowercase())
}

pub fn filter_out_supported_files_by_extensions(supported_files_extensions: &[&str], files: Vec<String>) -> Vec<String> {
    let mut filtered_files: Vec<String> = Vec::new();
    for file in files {
        if is_supported_text_files(supported_files_extensions, &file) {
            filtered_files.push(file);
        }
    }
    filtered_files
}

#[cfg(test)]
mod tests {
    use crate::test::test_folders::get_unit_test_module_folder;
    use super::*;

    #[test]
    fn test_is_supported_text_files() {
        let supported_files_extensions = ["txt", "md"];
        let file_path = "C:\\Users\\user\\Desktop\\test.txt";
        let result = is_supported_text_files(&supported_files_extensions, file_path);
        let result_md = is_supported_text_files(&supported_files_extensions, "C:\\Users\\user\\Desktop\\test.md");
        assert_eq!(result, true);
        assert_eq!(result_md, true);
        // fail test
        let file_path = "C:\\Users\\user\\Desktop\\test.txtt";
        let result = is_supported_text_files(&supported_files_extensions, file_path);
        assert_eq!(result, false);
    }

    #[test]
    fn test_filter_out_supported_files_by_extensions() {
        let supported_files_extensions = ["txt", "md"];
        let files = vec![
            "C:\\Users\\user\\Desktop\\test.txt".to_string(),
            "C:\\Users\\user\\Desktop\\test.md".to_string(),
            "C:\\Users\\user\\Desktop\\test.txtt".to_string(),
        ];
        let result = filter_out_supported_files_by_extensions(&supported_files_extensions, files);
        assert_eq!(result.len(), 2);
    }

    #[test]
    fn should_return_false_instead_of_panic_when_is_directory() {
        let supported_files_extensions = ["txt", "md"];
        let file_path = get_unit_test_module_folder("test_folder");
        let result = is_supported_text_files(&supported_files_extensions, &file_path);
        assert_eq!(result, false);
        // clear
        std::fs::remove_dir_all(file_path).unwrap();
    }

    #[test]
    fn should_return_false_instead_of_panic_when_no_extension() {
        let supported_files_extensions = ["txt", "md"];
        let test_folder_path = get_unit_test_module_folder("test");
        let file_path = format!("{}\\test", test_folder_path);
        // create file
        std::fs::write(&file_path, "test").unwrap();
        let result = is_supported_text_files(&supported_files_extensions, &file_path);
        assert_eq!(result, false);
        // clear
        std::fs::remove_file(file_path).unwrap();
    }
}
