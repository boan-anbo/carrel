
#[derive(Insertable)]
#[table_name = "project"]
pub struct NewProject {
    pub name: String,
    pub description: String,
    pub working_folder: String,
}
