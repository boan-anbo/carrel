use entity::entities::textual_objects;
use once_cell::sync::Lazy;
use std::collections::HashMap;

pub static TO_MAP_TO_COLUMN_MAP: Lazy<HashMap<String, textual_objects::Column>> = Lazy::new(|| {
    HashMap::from([
        ("id", textual_objects::Column::Id),
        ("uuid", textual_objects::Column::Uuid),
        ("ticket_id", textual_objects::Column::TicketId),
        ("ticket_minimal", textual_objects::Column::TicketMinimal),
        ("source_id", textual_objects::Column::SourceId),
        ("source_name", textual_objects::Column::SourceName),
        ("source_id_type", textual_objects::Column::SourceIdType),
        ("source_path", textual_objects::Column::SourcePath),
        ("store_info", textual_objects::Column::StoreInfo),
        ("store_url", textual_objects::Column::StoreUrl),
        ("created", textual_objects::Column::Created),
        ("updated", textual_objects::Column::Updated),
        ("json", textual_objects::Column::Json),
        ("json_type", textual_objects::Column::JsonType),
        ("json_unique_id", textual_objects::Column::JsonUniqueId),
        ("card", textual_objects::Column::Card),
        ("card_map", textual_objects::Column::CardMap),
        ("context", textual_objects::Column::Context),
        (
            "ticket_index_in_context",
            textual_objects::Column::TicketIndexInContext,
        ),
    ])
    .into_iter()
    .map(|(k, v)| (k.to_string(), v))
    .collect()
});
