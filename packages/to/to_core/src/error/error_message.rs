use crate::error::ToErrors;
use strum_macros::{Display, EnumString};

#[derive(Debug, Clone, Display, EnumString)]
pub enum ToErrorMessage {
    // give serialize string
    #[strum(serialize = "No ticket ids provided")]
    FindRequestDtoNoTicketIds,

    #[strum(serialize = "store_url does not exist")]
    FindOrScanRequestDtoStoreUrlDoesNotExist,

    #[strum(serialize = "No text is provided")]
    ScanRequestDtoNoText,
}
