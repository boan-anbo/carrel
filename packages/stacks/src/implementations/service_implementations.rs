use std::path::Path;
use carrel_commons::carrel::common::document::v1::Document;
use carrel_commons::carrel::common::file::v1::File;
use carrel_commons::carrel::stacks::services::v1::DocumentResult;
use carrel_commons::google::protobuf::FloatValue;

use uuid::Uuid;

pub fn get_document_from_tantivy_doc(input_doc: tantivy::Document, score: f32) -> DocumentResult {
    let all_fields = input_doc.field_values();
    let title_field = all_fields.get(0).unwrap();
    let content_field = all_fields.get(1).unwrap();
    let file_path_field = all_fields.get(2).unwrap();
    let title = title_field.value.as_text().unwrap();
    let content = content_field.value.as_text().unwrap();
    let file_path = file_path_field.value.as_text().unwrap();

    let file_path = Path::new(file_path);
    let file = File {
        uuid: Uuid::new_v4().to_string(),
        file_full_path: file_path.to_str().unwrap().to_string(),
        file_name: file_path.file_name().unwrap().to_str().unwrap().to_string(),
        file_extension: file_path.extension().unwrap_or_else(|| "".as_ref()).to_str().unwrap().to_string(),
        file_dir: file_path.parent().unwrap().to_str().unwrap().to_string(),
    };
    let document = Document {
        title: title.to_string(),
        content: content.to_string(),
        files: vec![file],
        uuid: Uuid::new_v4().to_string(),
        ..Document::default()
    };

    // get FloatValue from f32
    DocumentResult {
        document: Some(document),
        score: Some(FloatValue{
            value: score,
        }),
    }

}

