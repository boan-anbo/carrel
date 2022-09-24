use to_core::to_tag::to_tag_struct::ToTag;
use crate::common::tag::v1::Tag;
use crate::firefly_keeper_model::model::v1::Fireflies;
use crate::firefly_keeper_model::model::v1::FireflyCategories;


// implement from for Vec<ToTag> to Fireflies
impl From<Vec<ToTag>> for Fireflies {
    fn from(tags: Vec<ToTag>) -> Self {
        let mut fireflies: Fireflies = Fireflies::default();

        // loop over tags

        for tag in tags {

            // check if it's a note tag
            let lower_tag_key = tag.key.to_lowercase();

            let converted_tag = Tag::from(tag);



            // add to all tags
            fireflies.all_tags.push(converted_tag.clone());
            fireflies.all_tags_count += 1;

            if lower_tag_key == "note" || lower_tag_key == "n" {
                fireflies.notes.push(converted_tag.clone());
                fireflies.notes_count += 1;
            } else if lower_tag_key == "todo" || lower_tag_key == "t" {
                fireflies.todos.push(converted_tag.clone());
                fireflies.todos_count += 1;
            } else if lower_tag_key == "idea" || lower_tag_key == "i" {
                fireflies.ideas.push(converted_tag.clone());
                fireflies.ideas_count += 1;
            } else if lower_tag_key == "summary" || lower_tag_key == "s" {
                fireflies.summaries.push(converted_tag.clone());
                fireflies.summaries_count += 1;
            } else if lower_tag_key == "point" || lower_tag_key == "p" {
                fireflies.points.push(converted_tag.clone());
                fireflies.points_count += 1;
            } else if lower_tag_key == "fact" || lower_tag_key == "f" {
                fireflies.facts.push(converted_tag.clone());
                fireflies.facts_count += 1;
            } else if lower_tag_key == "quote" || lower_tag_key == "q" {
                fireflies.quotes.push(converted_tag.clone());
                fireflies.quotes_count += 1;
            } else if lower_tag_key == "question" || lower_tag_key == "?" {
                fireflies.questions.push(converted_tag.clone());
                fireflies.questions_count += 1;
            } else if lower_tag_key == "keyword" || lower_tag_key == "k" {
                fireflies.keywords.push(converted_tag.clone());
                fireflies.keywords_count += 1;
            } else if lower_tag_key == "reference" || lower_tag_key == "r" {
                fireflies.references.push(converted_tag.clone());
                fireflies.references_count += 1;
            } else if lower_tag_key == "opoint" || lower_tag_key == "op" {
                fireflies.opoints.push(converted_tag.clone());
                fireflies.opoints_count += 1;
            } else if lower_tag_key == "oevidence" || lower_tag_key == "oe" {
                fireflies.oevidences.push(converted_tag.clone());
                fireflies.oevidences_count += 1;
            } else if lower_tag_key == "data" || lower_tag_key == "d" {
                fireflies.data.push(converted_tag.clone());
                fireflies.data_count += 1;
            } else {
                fireflies.unclassified.push(converted_tag.clone());
                fireflies.unclassified_count += 1;
            }
        }

        // return the fireflies
        fireflies
    }
}
