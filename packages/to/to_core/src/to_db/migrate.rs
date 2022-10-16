use crate::to_db::connect::get_connection;
use crate::to_db::to_orm::ToOrmError;
use migration::Migrator;
use migration::MigratorTrait;
use std::path::Path;

// initialize a new db with the given path, and return the path to the db
pub async fn init_db(db_path: &str) -> Result<String, ToOrmError> {
    // create the db file if not exist
    let db_file_path = Path::new(db_path);
    if !db_file_path.exists() {
        std::fs::File::create(db_file_path).map_err(ToOrmError::DatabaseFileCreationError)?;
    } else {
        // if the db file exists, check if it has the right table structure
        let conn = get_connection(db_path).await?;
        // Apply all pending migrations
        Migrator::up(&conn, None).await.unwrap();
    }
    // get db connection
    let db = get_connection(db_path).await?;
    // run the migration
    Migrator::up(&db, None)
        .await
        .map_err(ToOrmError::DatabaseInitError)
        .unwrap();
    Ok(db_path.to_string())
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::to::to_struct::TextualObject;
    use crate::to_db::to_orm::{ToOrmTrait, ToOrm};
    use carrel_utils::test::test_folders::get_random_test_temp_folder;
    use uuid::Uuid;

    #[tokio::test]
    async fn test_init_db() {
        let temp_test_folder = get_random_test_temp_folder();
        let db_file_name = "test.db";
        let db_path = format!("{}/{}", temp_test_folder, db_file_name);

        let create_db_path = init_db(db_path.as_str()).await.unwrap();
        assert_eq!(create_db_path, db_path);
    }

    #[tokio::test]
    async fn test_init_db_should_not_overwrite_existing() {
        let temp_test_folder = get_random_test_temp_folder();
        let db_file_name = "test.db";
        let db_path = format!("{}/{}", temp_test_folder, db_file_name);

        // the file should not exist
        assert!(!Path::new(db_path.as_str()).exists());

        let initial_db_path = init_db(db_path.as_str()).await.unwrap();
        assert_eq!(initial_db_path, db_path);

        let to_orm = ToOrm::new(db_path.as_str());

        let results = to_orm.count_tos().await.unwrap();

        assert_eq!(results, 3);

        let delete_result = to_orm.clear().await.unwrap();

        assert_eq!(delete_result, 3);

        let results = to_orm.count_tos().await.unwrap();

        assert_eq!(results, 0);

        let same_db_path = init_db(db_path.as_str()).await.unwrap();

        assert_eq!(same_db_path, db_path);

        let results = to_orm.count_tos().await.unwrap();

        // it should not populate the db again but rather return the same path
        assert_eq!(results, 0);

        // insert a new to
        let to: Uuid = to_orm
            .insert_one(TextualObject::get_sample())
            .await
            .unwrap();
        // get the count of tos
        let results = to_orm.count_tos().await.unwrap();
        // it should be 1
        assert_eq!(results, 1);

        // init again and it should not overwrite the existing to
        let same_db_path = init_db(db_path.as_str()).await.unwrap();
        assert_eq!(same_db_path, db_path);
        let results = to_orm.count_tos().await.unwrap();
        assert_eq!(results, 1);

        // let create_db_path = init_db(db_path.as_str()).await;
        // assert!(create_db_path.is_err());
    }
}
