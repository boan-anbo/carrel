use postage::broadcast::{Sender};
use uuid::Uuid;

pub enum CarrelEventType {
    SYSTEM,
    USER
}



pub struct CarrelEvent {
    event_type: CarrelEventType,
    message: String,
    id: Uuid,
    sender: String,
    receiver: String,
}

pub struct CarrelRadio {
    pub broadcast: Sender<CarrelEvent>,
}
