use std::path::PathBuf;
use carrel_commons::carrel::common::document::v1::Document;
use carrel_commons::carrel::common::file::v1::File;
use carrel_commons::carrel::common::passage::v1::{DocumentPassages, Passage};
use uuid::Uuid;
use regex::Regex;
use pdfium_render::prelude::*;
use crate::pdfium::pdfium_binary;
use crate::utils::is_corrupted::is_pdf_corrupted;

// custom error
#[derive(Debug)]
pub enum PdfGongjuError {
    PdfCorruptError(String),
}

pub fn extract_file(file_path: &str) -> Result<DocumentPassages, PdfGongjuError> {
    if is_pdf_corrupted(file_path) {
        return Err(PdfGongjuError::PdfCorruptError(file_path.to_string()));
    }


    let mut passages = Vec::new();
    // For general comments about pdfium-render and binding to Pdfium, see export.rs.

    let document_path = PathBuf::from(file_path);

    let file_name = document_path.file_name().unwrap().to_str().unwrap();
    // use regex to extract [[(capture_group)]] from file name
    let captured = Regex::new(r"\[\[(.+)]]").unwrap().captures(file_name);
    let unique_id = match captured {
        Some(c) => c.get(1).unwrap().as_str(),
        None => ""
    };
    let pdfium = pdfium_binary::get_pdfium();

    let doc = pdfium.load_pdf_from_file(file_path, None).expect("load_pdf_from_file");

    let doc_meta = doc.metadata();
    // get milli seconds
    let doc_modified_tag = doc_meta.get(PdfDocumentMetadataTagType::ModificationDate);
    let doc_modified_value = match doc_modified_tag {
        Some(tag) => tag.value().to_string(),
        None => "".to_string()
    };
    let doc_created_tag = doc_meta.get(PdfDocumentMetadataTagType::CreationDate);

    let doc_created_value = match doc_created_tag {
        Some(tag) => tag.value().to_string(),
        None => "".to_string()
    };


    let pages = &doc.pages();

    let num_pages = &pages.len().to_string();

    let document = Document {
        uuid: Uuid::new_v4().to_string(),
        title: document_path.file_name().unwrap().to_str().unwrap().to_string(),
        description: "".to_string(),
        citation: "".to_string(),
        publication_date: "".to_string(),
        creators: vec![],
        source_id: unique_id.to_string(),
        source_id_type: "citekey".to_string(),
        source_url: "".to_string(),
        archive_location: "".to_string(),
        files: vec![
            File::from(file_path)
        ],
        pages: num_pages.to_string(),
        modified: doc_modified_value.to_string(),
        created: doc_created_value.to_string(),
        content: "".to_string(),

        importance: 0,
        tasks: vec![]
    };

    pages.iter()
        .enumerate()
        .for_each(|(index, page)| {
            let text = page.text().unwrap().all();
            let passage = Passage {
                uuid: Uuid::new_v4().to_string(),
                text,
                description: "".to_string(),
                location: index.to_string(),
                document: Some(document.clone()),
                location_type: "".to_string(),
            };

            passages.push(passage);
        });

    let document_passages = DocumentPassages {
        passages,
        document: Some(document),
    };
    Ok(document_passages)
}

// extract files
pub fn extract_files(file_paths: Vec<String>) -> Vec<DocumentPassages> {
    let mut document_passages = Vec::new();
    for file_path in file_paths {
        if is_pdf_corrupted(file_path.as_str()) {
            continue;
        }
        match extract_file(&file_path) {
            Ok(doc_passages) => {
                document_passages.push(doc_passages);
            }
            Err(err_) => {
                println!("Error: {:?}", err_);
            }
        }
    }
    document_passages
}

// extract all pdf files in a directory
pub fn extract_files_in_dir(dir_path: &str) -> Vec<DocumentPassages> {
    let dir_entries = std::fs::read_dir(dir_path).unwrap();
    // get all file paths
    let mut file_paths = Vec::new();
    for entry in dir_entries {
        let entry = entry.unwrap();
        let path = entry.path();
        let path_str = path.clone().into_os_string().into_string().unwrap();
        file_paths.push(path_str);
    }
    // extract all files
    let result = extract_files(file_paths);
    result
}

#[cfg(test)]
mod tests {
    use std::borrow::Borrow;
    use super::*;

    fn get_chinese_sample_pdf() -> String {
        // get cargo root folder
        let cargo_root = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        // get tests under cargo root folder
        let chinese_pdf = PathBuf::from(cargo_root).join("tests").join("chn.pdf");
        // get sample pdf under tests folder
        chinese_pdf.into_os_string().into_string().unwrap()
    }

    #[test]
    pub fn test_extract_all_full_text() {
        let extract_result = extract_file(&get_chinese_sample_pdf()).unwrap();
        assert_eq!(extract_result.passages.len(), 8);
        // write json to file
        let json = serde_json::to_string_pretty(&extract_result).unwrap();
        // std::fs::write("chn.json", json).expect("write json");
    }

    #[test]
    pub fn test_extract_chn_ocred() {
        let working_folder = carrel_utils::test::test_folders::get_test_fixture_module_folder_path_buf("test_extract_chn_ocred");
        let extract_result = extract_file("tests/chn_ocred.pdf").unwrap();
        // write json to file
        let json = serde_json::to_string_pretty(&extract_result).unwrap();
         // output joined
        // let output_path = PathBuf::from(working_folder).join("chn.json");
        // std::fs::write(output_path, json).expect("write json");

    }

    #[test]
    pub fn test_corrupted_pdf_file() {
        match extract_file("tests/corrupted.pdf") {
            Ok(result) => {
                assert_eq!(result.passages.len(), 0);
            }
            Err(err) => {
            }
        }
    }

    #[test]
    pub fn test_extract_all_files_under_dir() {
        let extract_result = extract_files_in_dir("tests");
        // assert_eq!(extract_result.len(), 1);
    }

}
