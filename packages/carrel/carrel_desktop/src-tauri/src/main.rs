#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


use crate::server::server_manager::launch_carrel_server;

pub mod server;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            launch_carrel_server
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
