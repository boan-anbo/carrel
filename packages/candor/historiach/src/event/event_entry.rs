use crate::event::event::Event;
use crate::event::range::Gap;

pub struct EventEntry {
    pub start: Event,
    pub gap: Option<Gap>,
    pub end: Option<Event>

}
