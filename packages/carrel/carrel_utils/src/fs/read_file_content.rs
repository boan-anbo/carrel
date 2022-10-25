use std::fs::File;
use std::io::Read;
use crate::fs::error::CarrelUtilFsError;
use crate::fs::error::CarrelUtilFsError::FileDoesNotExist;

// Read file content, support UTF-8 and GBK
pub fn read_file_content(file_path: &str) -> Result<String, CarrelUtilFsError> {
    let mut file = File::open(file_path).map_err(FileDoesNotExist)?;
    let mut content = String::new();
    file.read_to_string(&mut content).unwrap();
    Ok(content)
}

#[cfg(test)]
mod tests {
    use crate::test::test_folders::get_test_fixture_module_folder_path_buf;
    use super::*;

    #[test]
    fn should_read_file_content() {
        let file_path = get_test_fixture_module_folder_path_buf(
            "read_file_content",
        ).join("chn.txt");
        let content = read_file_content(file_path.to_str().unwrap()).unwrap();
        println!("{}", content);
        assert_eq!(content.is_empty(), false);
    }
}
