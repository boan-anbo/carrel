use entity::entities::{tag, textual_object};
use once_cell::sync::Lazy;
use std::collections::HashMap;

pub static TO_MAP_TO_COLUMN_MAP: Lazy<HashMap<String, textual_object::Column>> = Lazy::new(|| {
    HashMap::from([
        ("id", textual_object::Column::Id),
        ("uuid", textual_object::Column::Uuid),
        ("ticket_id", textual_object::Column::TicketId),
        ("ticket_minimal", textual_object::Column::TicketMinimal),
        ("source_id", textual_object::Column::SourceId),
        ("source_name", textual_object::Column::SourceName),
        ("source_id_type", textual_object::Column::SourceIdType),
        ("source_path", textual_object::Column::SourcePath),
        ("store_info", textual_object::Column::StoreInfo),
        ("store_url", textual_object::Column::StoreUrl),
        ("created", textual_object::Column::Created),
        ("updated", textual_object::Column::Updated),
        ("json", textual_object::Column::Json),
        ("json_type", textual_object::Column::JsonType),
        ("json_unique_id", textual_object::Column::JsonUniqueId),
        ("card", textual_object::Column::Card),
        ("card_map", textual_object::Column::CardMap),
        ("context", textual_object::Column::Context),
        (
            "ticket_index_in_context",
            textual_object::Column::TicketIndexInContext,
        ),
    ])
    .into_iter()
    .map(|(k, v)| (k.to_string(), v))
    .collect()
});

pub static TAG_MAP_TO_COLUMN_MAP: Lazy<HashMap<String, tag::Column>> = Lazy::new(|| {
    HashMap::from([
        ("id", tag::Column::Id),
        ("key", tag::Column::Key),
        ("value", tag::Column::Value),
        ("note", tag::Column::Note),
        ("raw_tag_string", tag::Column::RawTagString),
        ("uuid", tag::Column::Uuid),
        ("to_id", tag::Column::ToId),
        ("to_uuid", tag::Column::ToUuid),
    ])
    .into_iter()
    .map(|(k, v)| (k.to_string(), v))
    .collect()
});