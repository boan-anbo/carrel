
// add project

use diesel::{RunQueryDsl, SqliteConnection};
use crate::projects::new_project::NewProject;

fn insert(project: NewProject, connection: &mut SqliteConnection) -> bool {
    use crate::schema::project;

    diesel::insert_into(project::table)
        .values(&project)
        .execute(connection)
        .is_ok()
}


#[cfg(test)]
mod tests {
    use super::*;
    use crate::db::connect::establish_connection;

    #[test]
    fn test_insert() {
        let mut connection = establish_connection();
        let project = NewProject {
            name: "test_name".to_string(),
            description: "test_description".to_string(),
            working_folder: "test_working_folder".to_string(),
        };

        assert!(insert(project, &mut connection));
    }
}
