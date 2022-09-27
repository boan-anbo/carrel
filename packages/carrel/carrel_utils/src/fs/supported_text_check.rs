// check file extensions


use std::iter::Map;
use std::path::PathBuf;

pub fn has_extensions(supported_files_extensions: &[&str], file_path: &str) -> bool {
    let path_buf = PathBuf::from(file_path);
    // return false if is not a file
    if !path_buf.is_file() {
        return false;
    }

    // make file extension lowercase
    let lowered_supported_file_extensions: Vec<String> = Map::collect(supported_files_extensions
        .iter()
        .map(|&x| x.to_lowercase()));
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
        if has_extensions(supported_files_extensions, &file) {
            filtered_files.push(file);
        }
    }
    filtered_files
}

#[cfg(test)]
mod tests {
    use crate::test::test_folders::{get_test_fixture_path, get_unit_test_module_folder};
    use super::*;

    #[test]
    fn test_is_supported_text_files() {
        let test_folder = get_test_fixture_path();
        let supported_files_extensions = ["txt", "md"];
        let file1_txt = format!("{}/file1.txt", test_folder);
        let file2_txt_under_dir1 = format!("{}/dir1/file2.txt", test_folder);

        let file3_md_under_dir2 = format!("{}/dir1/dir2/file3.md", test_folder);

        assert_eq!(has_extensions(&supported_files_extensions, &file1_txt), true);
        assert_eq!(has_extensions(&supported_files_extensions, &file2_txt_under_dir1), true);
        assert_eq!(has_extensions(&supported_files_extensions, &file3_md_under_dir2), true);
        // false cases
        assert_eq!(has_extensions(&[], &file1_txt), false);
        assert_eq!(has_extensions(&["md"], &file1_txt), false);



    }


    #[test]
    fn should_return_false_instead_of_panic_when_is_directory() {
        let supported_files_extensions = ["txt", "md"];
        let file_path = get_unit_test_module_folder("test_folder");
        let result = has_extensions(&supported_files_extensions, &file_path);
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
        let result = has_extensions(&supported_files_extensions, &file_path);
        assert_eq!(result, false);
        // clear
        std::fs::remove_file(file_path).unwrap();
    }
}
