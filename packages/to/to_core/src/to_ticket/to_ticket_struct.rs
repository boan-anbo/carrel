use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use chrono::{DateTime, FixedOffset, Local};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

use crate::to_ticket::to_ticket_marker::ToMarker;
use crate::to_ticket::to_ticket_position::ToTicketPositionInfo;
use crate::util_entities::to_context::ToContext;
use crate::utils::id_generator::generate_id;

#[derive(Serialize, Deserialize, Clone)]
pub struct ToTicket {
    // unique ID in the local storage
    pub id: String,
    // unique ticket Id in the local storage
    pub ticket_id: String,
    // values: indexMap of keys and values; uses indexMap rather than HashMap because IndexMap preserves the insertion orderj
    #[serde(with = "indexmap::serde_seq")]
    pub values: IndexMap<String, String>,
    /*
    Public meta-data: the fields below are reserved for meta-data.
    In output, they are written with a PREFIX;
     */
    // updated date field: Chrono::DateTime
    #[serde(default)]
    pub to_updated: String,
    // redable notes on storage location of the referenced TO
    #[serde(default)]
    pub to_store_url: Option<String>,
    // Optional unique ID of the storage field
    #[serde(default)]
    pub to_store_info: Option<String>,
    // // this is used for two purposes:
    // // 1. when extracted from a file, it is actual raw text of the ticket, even though the ticket is capable of being re-constructed from the other fields. This is also used to pass the ticket to tag, as the tag raw string.
    // // 2. When the ticket has no use in actual texts, this is a demo ticket.
    // #[serde(default)]
    // pub sample_string: Option<String>,
    /*
    Private meta-data, not be printed
     */
    #[serde(default)]
    pub to_marker: ToMarker,
    #[serde(default)]
    pub to_intext_option: Option<ToTicketPositionInfo>,
    #[serde(default)]
    pub to_context: Option<ToContext>,
}

// create default TextualObjectTicket
impl Default for ToTicket {
    fn default() -> Self {
        ToTicket {
            id: String::new(),
            ticket_id: generate_id(),
            values: IndexMap::new(),
            to_updated: get_now_iso_string(),
            to_store_url: None,
            to_store_info: None,
            to_marker: ToMarker::default(),
            to_intext_option: None,
            to_context: None,
        }
    }
}

// test create default TextualObjectTicket
#[cfg(test)]
mod tests {
    use chrono::{Datelike, Utc};

    use super::*;

    #[test]
    fn test_create_ticket() {
        let ticket = ToTicket::default();
        assert_eq!(ticket.ticket_id.len(), 5);
        assert_eq!(ticket.values.len(), 0);

        assert_eq!(ticket.to_store_url, None);
        assert_eq!(ticket.to_store_info, None);
        assert!(ticket.to_marker.left_marker.len() > 0);
    }
}
