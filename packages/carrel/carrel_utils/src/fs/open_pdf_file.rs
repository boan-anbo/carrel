use std::process::Command;

pub async fn open_pdf_file(command: String, page_index: Option<String>) {
    let mut page_index = if page_index.is_none() {
        "0".to_string()
    } else {
        page_index.unwrap()
    };

    // add 1 to page_index to get the correct page
    let page_index = page_index.parse::<usize>().unwrap() + 1;

    let file_path = command.to_string();

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
            .args(["/c", command.as_str()])
            .output()
            .expect("failed to execute process")
    };

}
