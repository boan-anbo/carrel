use diji::controls::keyboard::send_input_enigo::send_string;

#[tauri::command]
pub async fn send_tag_string(tag_string: String) {
    println!("Sending: {}", &tag_string);
    send_string(tag_string);
}
