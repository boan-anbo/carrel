use std::path::{Path, PathBuf};
use crate::fs::error::CarrelUtilFsError;

pub fn open_file_in_dir(file_path: &str) -> Result<(), CarrelUtilFsError> {
    let path = PathBuf::from(file_path);
    println!("path: {:?}", path);
    // check platform
    if cfg!(target_os = "windows") {
        // open file in windows
        let _ = std::process::Command::new("explorer")
            .arg(path.as_os_str())
            .spawn()
            .expect("failed to execute process");
    } else if cfg!(target_os = "macos") {
        // open file in macos
        let _ = std::process::Command::new("open")
            .arg(path.as_os_str())
            .spawn()
            .expect("failed to execute process");
    } else if cfg!(target_os = "linux") {
        // open file in linux
        let _ = std::process::Command::new("xdg-open")
            .arg(path.as_os_str())
            .spawn()
            .expect("failed to execute process");
    }
    Ok(())
}

#[cfg(test)]
mod test {
    use crate::test::test_folders::get_test_fixture_module_folder_path_buf;
    use super::*;

    #[test]
    fn test_open_file() {
        let test_open_file_sample = get_test_fixture_module_folder_path_buf("read_file_content").join("chn.txt");
        // assert existence
        assert!(test_open_file_sample.exists());
        let test_open_file_sample = test_open_file_sample.into_os_string().into_string().unwrap();
        open_file_in_dir(&test_open_file_sample).unwrap();
    }
}
