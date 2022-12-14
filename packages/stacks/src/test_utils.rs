#[cfg(test)]
pub mod util_func {
    use carrel_commons::carrel::common::document::v1::Document;
    use carrel_commons::carrel::common::file::v1::File;
    use carrel_commons::carrel::common::person::v1::Person;
    use uuid::Uuid;
    use super::*;

    // get sample documents
    pub fn get_sample_documents(num_of_docs: usize) -> Vec<Document> {
        let mut docs = Vec::new();
        for i in 0..num_of_docs {
            let doc = Document {
                uuid: Uuid::new_v4().to_string(),
                title: format!("title {}", i),
                content: format!("content {}", i),
                description: format!("description {}", i),
                citation: format!("citation {}", i),
                publication_date: format!("publication_date {}", i),
                creators: vec![Person {
                    uuid: Uuid::new_v4().to_string(),
                    first_name: "person 1 first_name".to_string(),
                    last_name: "person 1 last_name".to_string(),
                    description: "person 1 description".to_string(),
                }],
                source_id: format!("source_id {}", i),
                source_id_type: format!("source_id_type {}", i),
                source_url: format!("source_url {}", i),
                archive_location: format!("archive_location {}", i),
                files: vec![File {
                    uuid: Uuid::new_v4().to_string(),
                    file_name: format!("file{}", i),
                    file_full_path: format!("file{}", i),
                    file_extension: "txt".to_string(),
                    file_dir: format!("dir{}", i),
                }],
                pages: format!("pages {}", i),
                modified: 0,
                created: 0,
            };
            docs.push(doc);
        }
        docs
    }

    // get sample Chinese documents
    pub fn get_sample_chinese_documents(num_of_docs: usize) -> Vec<Document> {
        let mut docs = Vec::new();
        for i in 0..num_of_docs {
            let doc = Document {
                uuid: Uuid::new_v4().to_string(),
                title: format!("?????? {}", i),
                content: format!("?????? {}", i),
                description: format!("?????? {}", i),
                citation: format!("?????? {}", i),
                publication_date: format!("???????????? {}", i),
                creators: vec![Person {
                    uuid: Uuid::new_v4().to_string(),
                    first_name: "??? 1 ???".to_string(),
                    last_name: "??? 1 ???".to_string(),
                    description: "??? 1 ??????".to_string(),
                }],
                source_id: format!("?????? ID {}", i),
                source_id_type: format!("?????? ID ?????? {}", i),
                source_url: format!("?????? URL {}", i),
                archive_location: format!("???????????? {}", i),
                files: vec![File {
                    uuid: Uuid::new_v4().to_string(),
                    file_name: format!("??????{}", i),
                    file_full_path: format!("??????{}", i),
                    file_extension: "txt".to_string(),
                    file_dir: format!("??????{}", i),
                }],
                pages: format!("?????? {}", i),
                modified: 0,
                created: 0,
            };
            docs.push(doc);
        }
        docs
    }
}
