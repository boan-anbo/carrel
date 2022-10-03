use std::io::Error;

// create a new project_manager
pub fn scaffold_new_project(project_name: &str, project_parent_dir: &str) -> Result<String, Error> {
    let scaffold = carrel_scaffold::scaffold::scaffold_struct::Scaffold::new_project(project_name, project_parent_dir);
    let created_folder = scaffold.construct_project_folder();
    created_folder
}
