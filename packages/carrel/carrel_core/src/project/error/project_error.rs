use carrel_db::errors::database_error::SeaOrmDatabaseError;
use thiserror::Error;
use crate::project::error::project_config_error::ProjectConfigError;


#[derive(Error, Debug)]
pub enum ProjectError {
    #[error("Project folder `{0}` does not exist")]
    ProjectFolderDoesNotExit(String),
    #[error("Project config file `{0}` fails to parse")]
    ProjectConfigParseError(#[from] ProjectConfigError),
    #[error("Cannot create default config file `{0}`")]
    ProjectConfigCreateError(String),
    #[error("Project Directory Error: `{0}`")]
    ProjectDirectoryError(String),
    #[error("Project db intialization error `{0}` does not exist")]
    ProjectDbInitializationError(#[source] SeaOrmDatabaseError),

}

