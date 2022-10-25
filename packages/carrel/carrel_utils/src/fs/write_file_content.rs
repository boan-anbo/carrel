use std::fs::File;
use std::io::Read;
use crate::fs::error::CarrelUtilFsError;
use crate::fs::error::CarrelUtilFsError::FileDoesNotExist;

// Write file content, support UTF-8 and GBK
pub fn write_file_content(file_path: &str, content: &str) -> Result<String, CarrelUtilFsError> {
    let mut file = File::create(file_path).map_err(FileDoesNotExist)?;
    file.write_all(content.as_bytes()).unwrap();
    Ok(content.to_string())
}

