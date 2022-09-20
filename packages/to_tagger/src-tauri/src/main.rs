#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod parse_commands;
pub mod send_tag_string;


use parse_commands::parse_file;
use send_tag_string::send_tag_string;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            parse_file,
            send_tag_string,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
