use tantivy::schema::*;

pub type FieldName = String;
pub type SchemaMapping = Vec<(FieldName, TextOptions)>;

pub trait SearchDocument {
    fn as_schema_mapping() -> SchemaMapping;

    fn as_schema() -> Schema {
        mapping_to_schema(&Self::as_schema_mapping())
    }

    fn get_all_fields_vec() -> Vec<Field>;

    fn as_fields() -> Self;
}

pub fn mapping_to_schema(mapping: &SchemaMapping) -> Schema {
    let mut schema_builder = Schema::builder();
    for (name, opts) in mapping {
        schema_builder.add_text_field(name, opts.clone());
    }
    schema_builder.build()
}

#[derive(Clone)]
pub struct DocFields {
    pub uuid: Field,
    pub title: Field,
    pub description: Field,
    pub citation: Field,
    pub publication_date: Field,
    pub creator: Field,
    pub source_id: Field,
    pub source_id_type: Field,
    pub source_url: Field,
    pub archive_location: Field,
    pub file_fullpath: Field,
    pub file_name: Field,
    pub file_extension: Field,
    pub file_dir: Field,
    pub pages: Field,
    pub modified: Field,
    pub created: Field,
    pub content: Field,

}

impl SearchDocument for DocFields {
    fn get_all_fields_vec() -> Vec<Field> {
        let all_fields = DocFields::as_fields();
        vec![
            all_fields.uuid,
            all_fields.title,
            all_fields.description,
            all_fields.citation,
            all_fields.publication_date,
            all_fields.creator,
            all_fields.source_id,
            all_fields.source_id_type,
            all_fields.source_url,
            all_fields.archive_location,
            all_fields.file_fullpath,
            all_fields.file_name,
            all_fields.file_extension,
            all_fields.file_dir,
            all_fields.pages,
            all_fields.modified,
            all_fields.created,
            all_fields.content,
        ]
    }
    fn as_schema_mapping() -> SchemaMapping {
        // FAST:    Fast fields can be random-accessed rapidly. Use this for fields useful
        //          for scoring, filtering, or collection.
        // TEXT:    Means the field should be tokenized and indexed, along with its term
        //          frequency and term positions.
        // STRING:  Means the field will be untokenized and indexed unlike above
        //
        // STORED:  Means that the field will also be saved in a compressed, row oriented
        //          key-value store. This store is useful to reconstruct the documents that
        //          were selected during the search phase.
        vec![
            // Used to reference this document
            ("uuid".into(), STRING | STORED | FAST),
            // Document contents
            ("title".into(), TEXT | STORED | FAST),
            ("content".into(), TEXT | STORED),
            ("description".into(), TEXT | STORED | FAST),
            ("citation".into(), TEXT | STORED | FAST),
            ("publication_date".into(), TEXT | STORED | FAST),
            ("creator".into(), TEXT | STORED | FAST),
            ("source_id".into(), TEXT | STORED | FAST),
            ("source_id_type".into(), TEXT | STORED | FAST),
            ("source_url".into(), TEXT | STORED | FAST),
            ("archive_location".into(), TEXT | STORED | FAST),
            ("file_fullpath".into(), STRING | STORED),
            ("file_name".into(), STRING | STORED | FAST),
            ("file_extension".into(), STRING | STORED | FAST),
            ("file_dir".into(), STRING | STORED | FAST),
            ("pages".into(), STRING | STORED | FAST),
            ("modified".into(), STRING | STORED | FAST),
            ("created".into(), STRING | STORED | FAST),
            // Document contents
            // ("domain".into(), STRING | STORED | FAST),
            // ("title".into(), TEXT | STORED | FAST),
            // // Used for display purposes
            // ("description".into(), TEXT | STORED),
            // ("url".into(), STRING | STORED | FAST),
            // // Indexed
            // ("content".into(), TEXT | STORED),
        ]
    }

    fn as_fields() -> Self {
        let schema = Self::as_schema();
        Self {
            uuid: schema.get_field("uuid").expect("No uuid in schema"),
            title: schema.get_field("title").expect("No title in schema"),
            description: schema.get_field("description").expect("No description in schema"),
            citation: schema.get_field("citation").expect("No citation in schema"),
            publication_date: schema.get_field("publication_date").expect("No publication_date in schema"),
            creator: schema.get_field("creator").expect("No creator in schema"),
            source_id: schema.get_field("source_id").expect("No source_id in schema"),
            source_id_type: schema.get_field("source_id_type").expect("No source_id_type in schema"),
            source_url: schema.get_field("source_url").expect("No source_url in schema"),
            archive_location: schema.get_field("archive_location").expect("No archive_location in schema"),
            file_fullpath: schema.get_field("file_fullpath").expect("No file_path in schema"),
            file_name: schema.get_field("file_name").expect("No file_name in schema"),
            file_extension: schema.get_field("file_extension").expect("No file_extension in schema"),
            file_dir: schema.get_field("file_dir").expect("No file_dir in schema"),
            pages: schema.get_field("pages").expect("No pages in schema"),
            modified: schema.get_field("modified").expect("No modified in schema"),
            created: schema.get_field("created").expect("No created in schema"),
            content: schema.get_field("content").expect("No content in schema"),
        }
    }
}
