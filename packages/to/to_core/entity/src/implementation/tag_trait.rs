use carrel_commons::carrel::common::tag::v2::Tag as CommonTagV2;
use sea_orm::ActiveValue::Set;

use crate::entities::tag::{ActiveModel, Model};

impl ActiveModel {
    pub fn from_common_v2_and_to(ct2: CommonTagV2, to_id: i32) -> ActiveModel {
        ActiveModel {
            id: Set(ct2.id.unwrap_or(0)),
            key: Set(ct2.key),
            value: Set(ct2.value),
            note: Set(ct2.note),
            raw_tag_string: Set(ct2.raw_tag_string),
            uuid: Set(ct2.uuid),
            to_id: Set(to_id),
            to_uuid: Set(ct2.parent_uuid.expect("Input common tag v2 is missing ToTag's parent To's UUID").to_string()),
        }
    }
}

impl Model {
    pub fn from_common_v2_tag(ct2: CommonTagV2) -> Model {
        Model {
            id: ct2.id.unwrap_or(0),
            key: ct2.key,
            value: ct2.value,
            note: ct2.note,
            raw_tag_string: ct2.raw_tag_string,
            uuid: ct2.uuid,
            to_id: 0,
            to_uuid: ct2.parent_uuid.expect("Input common tag v2 is missing ToTag's parent To's UUID").to_string(),
        }
    }
}

