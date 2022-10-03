#[cfg(test)]
mod tests {
    use carrel_utils::datetime::get_iso_string::{ get_now_iso_string};
    use entity::entities::prelude::*;
    // insert archive
    use sea_orm::prelude::Uuid;
    use sea_orm::{ActiveModelTrait, Database, Set, ActiveValue};
    use sea_orm::EntityTrait;


    use entity::entities::archive;

    pub async fn insert_archive(project_id: i32) -> archive::Model {
        let db: sea_orm::DatabaseConnection =
            Database::connect("sqlite://db.sqlite3").await.unwrap();
        let new_archive = archive::ActiveModel {
            name: Set("test".to_owned()),
            description: Set("test".to_owned()),
            uuid: Set(Uuid::new_v4().to_string()),
            updated_at: Set(get_now_iso_string()),
            created_at: Set(get_now_iso_string()),
            project_id: Set(project_id),
            ..Default::default()
        };
        let insert_result = new_archive.insert(&db).await.unwrap();



        println!("inserted archive: {:?}", insert_result);

        insert_result
    }
    #[tokio::test]
    pub async fn insert_archive_to_project() {
        let project = entity::entities::project::ActiveModel {
            name: Set("test".to_owned()),
            description: Set("test".to_owned()),
            ..Default::default()
        };

        let db: sea_orm::DatabaseConnection =
            Database::connect("sqlite://db.sqlite3").await.unwrap();
        let inserted_project = project.insert(&db).await.unwrap();
        let insert_archive_result = insert_archive(inserted_project.id).await;
    }

    #[tokio::test]
    pub async fn query_all_projects_with_archives() {
        let db: sea_orm::DatabaseConnection =
            Database::connect("sqlite://db.sqlite3").await.unwrap();

            // find first project
        // let project = entity::entities::project::Entity::find().all(db).await.unwrap();
    }
}
