use crate::core::historia_opt::{HistoriaOptions, Language};
use crate::core::metadata::Metadata;
use crate::selectors::methods::selector_regex;
use crate::selectors::selected::Selected;
use crate::selectors::selected_entry::SelectedEntry;
use crate::selectors::selector::Selector;

impl Selector {
    pub fn select(text: &Vec<String>, options: &HistoriaOptions, metadata: &mut Metadata) -> Selected {
        let mut selected_entries: Vec<SelectedEntry> = vec![];

        let language_selector_regex = selector_regex::get_selector_regex(&options.language);

        // go through each line
        for (line_number, line) in text.iter().enumerate() {
            // get index of each match
            let matches = language_selector_regex.find_iter(line);

            // create a new selected entry
            let mut selected_entry = SelectedEntry::default();

            // go through each match
            for match_ in matches {
                // get the match
                let matched = match_.as_str();

                // get the index of the match
                let index = match_.start();

                // add the match to the selected entry
                selected_entry.add_match(matched, index, line_number.clone());
            }

            // add the selected entry to the selected entries
            selected_entries.push(selected_entry);
        }

        // return the selected lines
        Selected {
            lines: text.to_owned(),
            select_event_tree: selected_entries,
        }
    }
}


#[cfg(test)]
mod tests {
    use crate::core::historia::Historia;
    use crate::core::historia_opt::{HistoriaOptions, Language};
    use crate::core::metadata::Metadata;
    use crate::selectors::methods::selector_regex::get_selector_regex;
    use crate::selectors::selector::Selector;
    use test_case::test_case;

    #[test_case("1986年2月12日", 1, Language::CHINESE; "chinese")]
    #[test_case("198", 0, Language::CHINESE; "none")]
    fn should_select_lines_with_event_markers(text: &str, expected_selections: usize, language: Language) {
        let opt = HistoriaOptions {
            language,
            ..Default::default()
        };
        let selected = Selector::select(&text.lines().map(|s| s.to_string()).collect::<Vec<String>>(), &opt, &mut Metadata::default());

        assert_eq!(selected.select_event_tree.len(), expected_selections);
    }
    #[test]
    fn test_default() {
        let test_case = "1984年1月20日第一件事，2020年12月第二件事";


        let selected = Selector::select(&test_case.lines().map(|s| s.to_string()).collect::<Vec<String>>(), &HistoriaOptions::default(), &mut Metadata::default());

        assert_eq!(selected.select_event_tree.len(), 1);
    }



    #[test]
    fn test_chinese() {
        let test_cases: Vec< ( &str, Language, usize ) > = vec![
            ("1984年1月20日第一件事\n2020年12月第二件事", Language::CHINESE, 2),
            ("不拉不拉", Language::CHINESE, 1)
            ];

        test_case_number_of_entry(test_cases);
    }

    fn test_case_number_of_entry(cases: Vec<(&str, Language, usize)>) {

        for (test_case, language, expected) in cases {
            let options = HistoriaOptions {
                language: language,
                ..HistoriaOptions::default()
            };

            let selected = Selector::select(
                &test_case.lines().map(|s| s.to_string()).collect::<Vec<String>>(),
                &options,
                &mut Metadata::default(),
            );

            // if failed, print the test case
            if selected.select_event_tree.len() != expected {
                println!("Failed case: {}", test_case);
                println!("Expected: {}", expected);
                println!("Actual: {}", selected.select_event_tree.len());

            }

            assert_eq!(selected.select_event_tree.len(), expected);
        }

    }
}
