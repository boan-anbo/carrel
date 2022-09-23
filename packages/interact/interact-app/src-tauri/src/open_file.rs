use std::process::Command;
use std::str::Utf8Error;
use std::string::FromUtf8Error;

#[tauri::command]
pub async fn open_file(file_path: String, mut page_index: Option<String>) {
  if page_index.is_none() {
    page_index = Some("0".to_string());
  }

  // add 1 to page_index to get the correct page
  let page_index = page_index.unwrap().parse::<usize>().unwrap() + 1;


  let editor = r"C:\Program Files (x86)\Foxit Software\Foxit PhantomPDF\FoxitPDFEditor.exe".to_string();
  let output = if cfg!(target_os = "windows") {
    Command::new(editor)
      .args([
        file_path.as_str(),
        "/A",
        format!("page={}", page_index).as_str(),
      ]
      )
      .output()
      .expect("failed to execute process")
  } else {
    Command::new("sh")
      .args(["/c", file_path.as_str()])
      .output()
      .expect("failed to execute process")
  };
  String::from_utf8(
    output.stdout
  );
}

#[cfg(test)]
mod test_run_command {
  use super::*;

  #[test]
  fn test_launch_java() {
    // let result = open_file(r"D:\Dropbox\MacAir Backup 2013-2020\Downloads\(Athlone Contemporary European Thinkers) Gerald Moore, Stuart Elden, Henri Lefebvre-Rhythmanalysis_ Space, Time and Everyday Life -Continuum (2004).pdf", None);
    // println!("{}", &result.unwrap());
  }
}
