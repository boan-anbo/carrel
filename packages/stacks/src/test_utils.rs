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
                title: format!("标题 {}", i),
                content: format!("内容 {}", i),
                description: format!("描述 {}", i),
                citation: format!("引用 {}", i),
                publication_date: format!("出版日期 {}", i),
                creators: vec![Person {
                    uuid: Uuid::new_v4().to_string(),
                    first_name: "人 1 名".to_string(),
                    last_name: "人 1 姓".to_string(),
                    description: "人 1 描述".to_string(),
                }],
                source_id: format!("来源 ID {}", i),
                source_id_type: format!("来源 ID 类型 {}", i),
                source_url: format!("来源 URL {}", i),
                archive_location: format!("存档位置 {}", i),
                files: vec![File {
                    uuid: Uuid::new_v4().to_string(),
                    file_name: format!("文件{}", i),
                    file_full_path: format!("文件{}", i),
                    file_extension: "txt".to_string(),
                    file_dir: format!("目录{}", i),
                }],
                pages: format!("页数 {}", i),
                modified: 0,
                created: 0,
            };
            docs.push(doc);
        }
        docs
    }
}
