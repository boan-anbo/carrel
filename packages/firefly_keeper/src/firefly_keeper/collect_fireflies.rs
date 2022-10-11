use carrel_commons::carrel::common::firefly::v1::Firefly;
use carrel_commons::carrel::firefly_keeper::v1::Fireflies;
use to_core::to_tag::to_tag_converter_v1::to_tag_to_common_tag_v1;

use crate::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;
use crate::firefly_keeper::internal_scan_results::InternalScanResults;


pub fn collect_fireflies(scan_result: InternalScanResults, directory: Option<String>, opt: &FireflyKeeperOption) -> Fireflies {
    let mut fireflies: Fireflies = Fireflies {
        text_files_count: scan_result.text_files_scaned,
        files_count: scan_result.all_files_scaned,
        directory,
        ..Fireflies::default()
    };

    let tags = scan_result.tags;

    // loop over tags

    for tag in tags {

        // check if it's a note tag
        let lower_tag_key = tag.key.to_lowercase();

        let commond_tag = to_tag_to_common_tag_v1(tag);
        let firefly = Firefly::from(commond_tag);


        if lower_tag_key == "note" || lower_tag_key == "n" {
            fireflies.notes.push(firefly.clone());
            fireflies.notes_count += 1;
        } else if lower_tag_key == "todo" || lower_tag_key == "t" {
            fireflies.todos.push(firefly.clone());
            fireflies.todos_count += 1;
        } else if lower_tag_key == "idea" || lower_tag_key == "i" {
            fireflies.ideas.push(firefly.clone());
            fireflies.ideas_count += 1;
        } else if lower_tag_key == "summary" || lower_tag_key == "s" {
            fireflies.summaries.push(firefly.clone());
            fireflies.summaries_count += 1;
        } else if lower_tag_key == "point" || lower_tag_key == "p" {
            fireflies.points.push(firefly.clone());
            fireflies.points_count += 1;
        } else if lower_tag_key == "fact" || lower_tag_key == "f" {
            fireflies.facts.push(firefly.clone());
            fireflies.facts_count += 1;
        } else if lower_tag_key == "quote" || lower_tag_key == "q" {
            fireflies.quotes.push(firefly.clone());
            fireflies.quotes_count += 1;
        } else if lower_tag_key == "question" || lower_tag_key == "?" {
            fireflies.questions.push(firefly.clone());
            fireflies.questions_count += 1;
        } else if lower_tag_key == "keyword" || lower_tag_key == "k" {
            fireflies.keywords.push(firefly.clone());
            fireflies.keywords_count += 1;
        } else if lower_tag_key == "reference" || lower_tag_key == "r" {
            fireflies.references.push(firefly.clone());
            fireflies.references_count += 1;
        } else if lower_tag_key == "opoint" || lower_tag_key == "op" {
            fireflies.opoints.push(firefly.clone());
            fireflies.opoints_count += 1;
        } else if lower_tag_key == "oevidence" || lower_tag_key == "oe" {
            fireflies.oevidences.push(firefly.clone());
            fireflies.oevidences_count += 1;
        } else if lower_tag_key == "data" || lower_tag_key == "d" {
            fireflies.data.push(firefly.clone());
            fireflies.data_count += 1;
        } else if !opt.classified_only {
            fireflies.unclassified.push(firefly.clone());
            fireflies.unclassified_count += 1;
        }

        // add to all tags
        if !opt.classified_only {
            fireflies.all_fireflies.push(firefly.clone());
            fireflies.all_fireflies_count += 1;
        }
    }

    // return the fireflies
    fireflies
}

