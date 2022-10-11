use crate::to::to_struct::TextualObject;
use entity::entities::textual_objects;
use entity::entities::textual_objects::{ActiveModel, Model};
use migration::Mode;
use sea_orm::ActiveValue::Set;

impl OrmEntityConverter for TextualObject {
    fn into_db_entity(self) -> ActiveModel {
        ActiveModel {
            id: Default::default(),
            uuid: Set(self.uuid),
            ticket_id: Set(self.ticket_id),

            ticket_minimal: Set(self.ticket_minimal),
            source_id: Set(self.source_id),
            source_name: Set(self.source_name),
            source_id_type: Set(self.source_id_type),
            source_path: Set(self.source_path),
            store_info: Set(self.store_info),
            store_url: Set(self.store_url),
            created: Set(self.created),
            updated: Set(self.updated),
            json: Set(self.json),
            json_type: Set(self.json_type),
            json_unique_id: Set(self.json_unique_id),
            card: Set(self.card),
            card_map: Set(self.card_map),
            context: Set(self.context),
            ticket_index_in_context: Set(self.ticket_index_in_context),
        }
    }
}

impl From<textual_objects::Model> for TextualObject {
    fn from(textual_object: textual_objects::Model) -> Self {
        TextualObject {
            id: textual_object.id,
            uuid: textual_object.uuid,
            ticket_id: textual_object.ticket_id,
            ticket_minimal: textual_object.ticket_minimal,
            source_id: textual_object.source_id,
            source_id_type: textual_object.source_id_type,
            source_path: textual_object.source_path,
            store_info: textual_object.store_info,
            store_url: textual_object.store_url,
            source_name: textual_object.source_name,
            created: textual_object.created,
            updated: textual_object.updated,
            json: textual_object.json,
            json_type: textual_object.json_type,
            json_unique_id: textual_object.json_unique_id,
            card: textual_object.card,
            card_map: textual_object.card_map,
            context: textual_object.context,
            ticket_index_in_context: textual_object.ticket_index_in_context,
        }
    }
}

impl From<Option<textual_objects::Model>> for TextualObject {
    fn from(textual_object: Option<textual_objects::Model>) -> Self {
        match textual_object {
            Some(textual_object) => TextualObject::from(textual_object),
            None => TextualObject::default(),
        }
    }
}

pub trait OrmEntityConverter {
    fn into_db_entity(self) -> ActiveModel;
}

pub trait IntoTextualObjectOption {
    fn into_textual_object(self) -> Option<TextualObject>;
}

impl IntoTextualObjectOption for Option<Model> {
    fn into_textual_object(self) -> Option<TextualObject> {
        match self {
            None => None,
            Some(m) => Some(TextualObject::from(m)),
        }
    }
}

pub trait IntoTextualObject {
    fn into_textual_object(self) -> TextualObject;
}

impl IntoTextualObject for Model {
    fn into_textual_object(self) -> TextualObject {
        TextualObject::from(self)
    }
}
