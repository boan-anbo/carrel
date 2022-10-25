use std::fs::metadata;
use std::time::SystemTime;
use crate::datetime::get_iso_string::get_now_from_system_time;

// get file modified date time in system time
pub fn get_file_modified_time(file_path: &str) -> SystemTime {
    let metadata = metadata(file_path).unwrap();
    let modified = metadata.modified().unwrap();
    modified
}

// get file modified date time in iso string
pub fn get_file_modified_time_iso_string(file_path: &str) -> String {
    let modified = get_file_modified_time(file_path);
    get_now_from_system_time(modified)
}

// get file create date time in system time
pub fn get_file_create_time(file_path: &str) -> SystemTime {
    let metadata = metadata(file_path).unwrap();
    let created = metadata.created().unwrap();
    created
}

// get file create date time in iso string
pub fn get_file_create_time_iso_string(file_path: &str) -> String {
    let created = get_file_create_time(file_path);
    get_now_from_system_time(created)
}