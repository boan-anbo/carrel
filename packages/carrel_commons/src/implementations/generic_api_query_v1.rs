use crate::generic::api::query::v1::{Condition, FilterSet, StandardQuery};


pub trait QueryMutator {
    // this ensures that the query must have the provided conditions
    // This adds a necessary condition to the query
    // If the query already has the condition, it is ignored
    fn must_have(&mut self, must_conditions: Vec<Condition>) -> Self;
}

impl QueryMutator for StandardQuery {
    fn must_have(self: &mut StandardQuery, must_conditions: Vec<Condition>) -> Self {
        let mut query = self.clone();
        if query.filter.is_some() {
            let mut filter = query.filter.unwrap();
            filter.must.extend(must_conditions);
            query.filter = Some(filter);
        } else {
            let mut new_filter_set = FilterSet::default();
            new_filter_set.must.extend(must_conditions);
        }
        query
    }
}
