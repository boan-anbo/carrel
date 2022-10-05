// Generated by diesel_ext
// ...

use crate::Queryable;

#[derive(Queryable, Debug, Identifiable)]
#[primary_key(uuid)]
pub struct Project {
    pub uuid: Option<String>,
    pub name: Option<String>,
    pub description: Option<String>,
    pub working_folder: Option<String>,
    pub updated_at: Option<String>,
    pub opened_at: Option<String>,
    pub created_at: Option<String>,
    pub finished_at: Option<String>,
}
