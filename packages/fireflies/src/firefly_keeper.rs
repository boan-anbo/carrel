use std::io;
use to_core::to_parser::parser::ToParser;
use to_core::to_parser::parser_option::ToParserOption;
use to_core::to_tag::to_tag_struct::ToTag;
use crate::firefly_keeper_model::model::v1::Fireflies;

pub struct FireflyKeeper {
    // directory
    directory: String,
    // result
    result: Fireflies

}

// constructor
impl FireflyKeeper {
    pub fn new(directory: &str) -> FireflyKeeper {
        FireflyKeeper {
            directory: directory.to_string(),
            result: Fireflies::default()
        }
    }
}


// scanning directory
impl FireflyKeeper {
    pub fn scan_directory(&self) -> Result<Fireflies, std::io::Error> {
        // all files under directory
        let mut all_tags: Vec<ToTag> = Vec::new();

        let directory = std::fs::read_dir(&self.directory).expect("directory not found");

        // loop over files and extract all tags from each file
        for entry in  directory {
            let entry = entry?;
            let path = entry.path();

            // if path is file
            if path.is_file() {

                // get file tags
                let file_tags = ToParser::scan_file_for_tags(path.to_str().unwrap(), &ToParserOption::default());

                // add file tags to all tags
                all_tags.extend(file_tags.tos);

            }
        };

        let result = Fireflies::from(all_tags);
        Ok(result)

    }
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
   fn test_scan_directory() {
        // get rust environment variable for root directory of project
        let root_dir = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        // use its test folder as directory to scan
        let test_directory = format!("{}/tests", root_dir);

        let firefly_keeper = FireflyKeeper::new(test_directory);
        let result = firefly_keeper.scan_directory().expect("error scanning directory");
        assert_eq!(result.all_tags_count, 3);
        assert_eq!(result.notes.len(), 1);
    }
}
