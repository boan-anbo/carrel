use async_trait::async_trait;
use sea_orm::{ActiveModelTrait, Database, EntityTrait, IntoActiveModel};
use sea_orm::ActiveValue::Set;
use entity::entities::prelude::Tag;
use entity::entities::tag::Relation::TextualObjects;
use entity::entities::textual_objects::Entity;
use crate::to::to_struct::TextualObject;

pub struct ToMaintainer {

}

#[async_trait]
pub trait ToMaintainerTrait {
    async fn check_tag_to_uuid_integrity(db_path: &str) -> Result<(), String>;
}


#[async_trait]
impl ToMaintainerTrait for ToMaintainer {
    async fn check_tag_to_uuid_integrity(db_path: &str) -> Result<(), String> {
        let db = Database::connect(db_path).await.unwrap();
        let all_tags = Tag::find().all(&db).await.unwrap();
        // go over each tag
        for tag in all_tags {
            // get the textual object
            let textual_object = Entity::find_by_id(tag.to_id).one(&db).await.unwrap();
            match textual_object {
                Some(to) => {
                    // check if the uuid of the textual object is the same as the uuid of the tag
                    if to.uuid != tag.to_uuid {
                        // if not, update the tag's to_uuid to the textual object's uuid
                        let mut tag = tag.into_active_model();
                        tag.to_uuid = Set(to.uuid);
                        tag.update(&db).await.unwrap();
                    }

                },
                None => {
                    return Err(format!("Tag with id {} is linked to a textual object that does not exist", tag.id));
                }
            }
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_check_tag_to_uuid_integrity() {

        let db_path = "C:\\Script\\carrel\\packages\\carrel\\carrel_desktop\\test\\fixtures\\simple_project\\to.db";
        let sqlite_db_path = "sqlite:".to_string() + db_path;
        let result = ToMaintainer::check_tag_to_uuid_integrity(sqlite_db_path.as_str()).await.unwrap();
    }
}