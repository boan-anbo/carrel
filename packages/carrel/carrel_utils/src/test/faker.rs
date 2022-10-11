use std::path::PathBuf;
use fake::Fake;
use fake::faker::filesystem::en::FilePath as FilePathEn;
use fake::faker::filesystem::zh_cn::FilePath as FilePathCn;

pub enum Language {
    English,
    Chinese
}
/// Get random number of file paths
/// Only English is supported for now
pub  fn get_random_number_of_file_pathbufs(
    number_of_file_paths: usize,
    language: Language
) -> Vec<PathBuf> {
    let mut results: Vec<PathBuf> = vec![];

    // get path buf with
    match language{
        Language::English => {
            let path = FilePathEn();

            for _ in 0..number_of_file_paths {
                let file_path = path.fake();
                results.push(file_path);
            }
        }
        Language::Chinese => {
            let path = FilePathCn();

            for _ in 0..number_of_file_paths {
                let file_path = path.fake();
                results.push(file_path);
            }
        }
    };

    // for

    results

}
pub fn get_random_number_of_file_paths(
    number_of_file_paths: usize,
    language: Language
) -> Vec<String> {
    let  results: Vec<String> = get_random_number_of_file_pathbufs(number_of_file_paths, language)
        .iter()
        .map(|path_buf| path_buf.to_str().unwrap().to_string())
        .collect();

    results

}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_random_number_of_file_paths() {
        let file_paths = get_random_number_of_file_paths(10, Language::English);
        println!("{:?}", file_paths);
        assert_eq!(file_paths.len(), 10);

        let file_pahts_chinese = get_random_number_of_file_paths(10, Language::Chinese);
    }
}
