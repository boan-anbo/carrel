use std::borrow::{Borrow};
use crate::collectors::collector::Collector;
use crate::core::historia::Historia;
use crate::parsers::parser::Parser;
use crate::selectors::selector::Selector;
use crate::timelines::timeline::Timeline;

impl Historia {
    pub fn process(&self) -> Timeline {

        let mut metadata = self.metadata.clone();
        // break texts into lines.
        let text_lines = &self.text.lines().map(|s| s.to_string()).collect::<Vec<String>>();
        // select all the lines that has date event content.
        let selected = Selector::select(text_lines, self.options.borrow(), &mut metadata);
        // parse events
        let parsed = Parser::parse(selected, self.options.borrow(), &mut metadata);
        // collect the result of event collecting.
        let collected = Collector::collect(parsed, self.options.borrow(), &mut metadata);
        // compile the events into a timeline.
        Timeline::compile(collected, self.options.borrow(), &mut metadata)
    }
}
