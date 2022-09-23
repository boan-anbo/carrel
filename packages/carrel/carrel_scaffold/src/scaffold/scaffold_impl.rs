use crate::scaffold::scaffold_struct::Scaffold;

// constrct project folder
impl Scaffold {
    pub fn construct_project_folder(&self) -> Result<String, std::io::Error> {
        let project_parent_dir = &self.config.project_parent_dir;
        let project_name = &self.config.project_name;
        let project_folder = format!("{}/{}", project_parent_dir, project_name);
        let result = std::fs::create_dir_all(&project_folder)?;
        Ok(project_folder)
    }
}
