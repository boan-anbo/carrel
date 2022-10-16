use crate::to::to_struct::TextualObject;
use entity::entities::{tag, textual_objects};
use entity::entities::textual_objects::{ActiveModel, Model};
use migration::Mode;
use sea_orm::ActiveValue::Set;
use uuid::Uuid;
use entity::entities::prelude::Tag;
use crate::to_machine::to_machine_pub_op::ToMPubMethods;
use crate::to_tag::to_tag_struct::ToTag;

/// Performs all the conversions to and from db entities
pub struct ToOrmMapper {}

pub trait ToOrmMapperTrait {
    fn to_into_active_model(to: TextualObject) -> ActiveModel;
    ///
    /// # Arguments
    ///
    /// * `tag`:
    /// * `to_id`: The id of the TextualObject that the tags are associated with.
    ///
    /// returns: ActiveModel
    ///
    /// # Examples
    ///
    /// ```
    ///
    /// ```
    fn to_tag_into_active_model(tag: ToTag, to_id: i32) -> tag::ActiveModel;
    fn to_tags_into_active_models(tags: Vec<ToTag>, to_id: i32) -> Vec<tag::ActiveModel>;
    ///
    ///
    /// # Arguments
    ///
    /// * `to_model`:
    /// * `tag_models`:
    ///
    /// returns: TextualObject
    ///
    /// # Examples
    ///
    /// ```
    ///
    /// ```
    fn to_and_tag_model_to_to_and_tag(to_model: textual_objects::Model, tag_models: Vec<tag::Model>) -> TextualObject;
}

impl ToOrmMapperTrait for ToOrmMapper {
    fn to_into_active_model(to: TextualObject) -> ActiveModel {
        ActiveModel {
            id: Default::default(),
            uuid: Set(to.uuid.to_string()),
            ticket_id: Set(to.ticket_id),

            ticket_minimal: Set(to.ticket_minimal),
            source_id: Set(to.source_id),
            source_name: Set(to.source_name),
            source_id_type: Set(to.source_id_type),
            source_path: Set(to.source_path),
            store_info: Set(to.store_info),
            store_url: Set(to.store_url),
            created: Set(to.created),
            updated: Set(to.updated),
            json: Set(to.json),
            json_type: Set(to.json_type),
            json_unique_id: Set(to.json_unique_id),
            card: Set(to.card),
            card_map: Set(to.card_map),
            context: Set(to.context),
            ticket_index_in_context: Set(to.ticket_index_in_context),
            tag_count: Set(to.tag_count),
        }
    }

    fn to_tag_into_active_model(tag: ToTag, to_id: i32) -> tag::ActiveModel {
        tag::ActiveModel {
            id: Default::default(),
            key: Set(tag.key),
            value: Set(tag.value),
            note: Set(tag.note),
            raw_tag_string: Set(tag.raw_tag_string),
            uuid: Set(tag.uuid.to_string()),
            to_id: Set(to_id),
            to_uuid: Set(tag.to_uuid.expect(
                "to_tag_into_active_model: to_uuid is required for tag"
            ).to_string()),
        }
    }

    fn to_tags_into_active_models(tags: Vec<ToTag>, to_id: i32) -> Vec<tag::ActiveModel> {
        let mut tag_models: Vec<tag::ActiveModel> = Vec::new();
        for tag in tags {
            tag_models.push(ToOrmMapper::to_tag_into_active_model(tag, to_id));
        }
        tag_models
    }


    fn to_and_tag_model_to_to_and_tag(to_model: Model, tag_models: Vec<tag::Model>) -> TextualObject {
        let mut to = ToOrmMapper::to_model_to_to(to_model);
        let mut tags = vec![];
        for tag_model in tag_models {
            tags.push(ToOrmMapper::to_tag_model_to_to_tag(tag_model));
        }
        to.tags = tags;
        to
    }
}

/// Private methods that are not exposed.
/// This is to make sure to and to tags are always mapped together via the public trait, not invidiaully.
impl ToOrmMapper {
    fn to_model_to_to(to_model: Model) -> TextualObject {
        TextualObject {
            id: to_model.id,
            uuid: Uuid::parse_str(to_model.uuid.as_str()).unwrap(),
            ticket_id: to_model.ticket_id,
            ticket_minimal: to_model.ticket_minimal,
            source_id: to_model.source_id,
            source_name: to_model.source_name,
            source_id_type: to_model.source_id_type,
            source_path: to_model.source_path,
            store_info: to_model.store_info,
            store_url: to_model.store_url,
            created: to_model.created,
            updated: to_model.updated,
            json: to_model.json,
            json_type: to_model.json_type,
            json_unique_id: to_model.json_unique_id,
            card: to_model.card,
            card_map: to_model.card_map,
            context: to_model.context,
            ticket_index_in_context: to_model.ticket_index_in_context,
            tags: vec![],
            tag_count: to_model.tag_count,
        }
    }

    fn to_tag_model_to_to_tag(to_tag_model: tag::Model) -> ToTag {
        ToTag {
            id: Some(to_tag_model.id),
            key: to_tag_model.key,
            value: to_tag_model.value,
            note: to_tag_model.note,
            raw_tag_string: to_tag_model.raw_tag_string,
            uuid: Uuid::parse_str(to_tag_model.uuid.as_str()).unwrap(),
            snippet: None,
            to_uuid: Some(Uuid::parse_str(to_tag_model.to_uuid.as_str()).unwrap()),
        }
    }
}

