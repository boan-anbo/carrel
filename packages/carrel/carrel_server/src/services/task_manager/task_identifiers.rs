use strum_macros::{Display, EnumString, IntoStaticStr};

#[derive(Debug, Clone, Copy, PartialEq)]
#[derive(Display, EnumString, IntoStaticStr)]  // strum macros.
pub enum TaskIdentifiers {
    #[strum(serialize = "SyncProjectArchives")]
    SyncProjectArchives,
}