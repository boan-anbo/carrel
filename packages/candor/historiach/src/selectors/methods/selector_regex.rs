use regex::Regex;
use snafu::ensure;
use crate::core::historia_opt::{HistoriaOptions, Language};
use crate::errors::language_errors::{LanguageError};

/// Regex to tell is a passage contains information about a event in the given language
pub fn get_selector_regex(language: &Language) -> regex::Regex {

    let regex_str = match language {
        Language::CHINESE => CHINESE_SELECTOR_REGEX,
        Language::ENGLISH => ENGLISH_SELECTOR_REGEX,
    };

    Regex::new(regex_str).unwrap()
}



// language selector regex consts
// test if any Chinese date or time marker exists
const CHINESE_SELECTOR_REGEX: &str = r"[年月日时分秒]";

const ENGLISH_SELECTOR_REGEX: &str = r"";


#[cfg(test)]
mod tests {
    use crate::core::historia_opt::{HistoriaOptions, Language};
    use crate::selectors::methods::selector_regex::get_selector_regex;

    fn test(test_case: &str, language: &Language, expected: bool) {
        let regex = get_selector_regex(language);

        let result = regex.is_match(test_case);
        if result != expected {
            println!("Failed case: {}", test_case);
            println!("language: {:?}", language);
            println!("expected: {}", expected);
            println!("result: {}", result);
        }
        assert_eq!(result, expected);
    }

    // test an array of test cases
    fn test_cases(case: &Vec<(&str, Language, bool)>) {

        let language = Language::CHINESE;

        let result = get_selector_regex(&language);

        // loop over
        for (test_case, language, expected) in case {
            test(test_case, language, *expected);
        }

    }

    #[test]
    fn test_all_cases() {
        let cases = vec![
            ("年", Language::CHINESE, true),
            ("月", Language::CHINESE, true),
            ("日", Language::CHINESE, true),
            ("时", Language::CHINESE, true),
            ("分", Language::CHINESE, true),
            ("秒", Language::CHINESE, true),
            ("不是事件", Language::CHINESE, false),
        ];

        test_cases(&cases);
    }

}


