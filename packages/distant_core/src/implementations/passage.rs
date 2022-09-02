use uuid::Uuid;
use crate::passage::Passage;

// impl default trait for Passage
impl Passage {
    fn new() -> Self {
        Passage {
            uuid: Uuid::new_v4().to_string(),
            text: "".to_string(),
            description: "".to_string(),
            location: "".to_string(),
            document: None,
        }
    }
}

// impl from Hit for Passage
impl From<&distant_es_client::responses::search_result::Hit> for Passage {
    fn from(hit: &distant_es_client::responses::search_result::Hit) -> Passage {
        let source = &hit.source;
        Passage {
            text: hit.highlight.text.join("\n"),
            description: source.file_name.to_string(),
            location: hit.index.to_string(),
            document: None,
            ..Default::default()
        }
    }
}