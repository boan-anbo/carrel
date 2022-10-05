use thiserror::Error;

#[derive(Error, Debug)]
pub enum ProjectConfigError {
    #[error("Cannot parse config file: `{0}`")]
    ConfigParseError(String),
    #[error("Cannot find config file: `{0}`")]
    ConfigFileNotFound(String),
    #[error("Cannot write config file: `{0}`")]
    ConfigWriteError(String),
    #[error("Cannot create config file: `{0}`")]
    ConfigCreateError(String),
}
