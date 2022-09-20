use ahk_rs::keyboard::send_input::send_string_enigo;

#[tauri::command]
pub async fn send_tag_string(tag_string: String) {
    let result = send_string_enigo(&tag_string);
    // print
    println!("send_tag_string: {}", tag_string);
}
