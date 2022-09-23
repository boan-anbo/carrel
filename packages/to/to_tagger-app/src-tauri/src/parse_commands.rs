use to_core::to_parser::parser::ToParser;
use to_core::to_parser::parser_option::ToParserOption;
use to_core::to_parser::to_parser_result::ToParserResult;
use to_core::to_tag::to_tag_struct::ToTag;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone)]
pub struct ScanResult {
    pub file_path: String,
    pub file_name: String,
    pub results: ToParserResult<ToTag>,
}

// // Tauri command to parse texts
//
#[tauri::command]
pub async fn parse_file(file_path: String) -> ScanResult {
    // loop
    // get file name with Rust path module
    let file_name = std::path::Path::new(&file_path).file_name().unwrap().to_str().unwrap().to_string();
    let file_contents = to_core::file_utils::read_file::read_file(&file_path).unwrap();
    let result = ToParser::scan_text_for_tags(&file_contents, &ToParserOption::default());
    ScanResult {
        file_path: file_path.to_string(),
        file_name: file_name.to_string(),
        results: result,
    }
}

