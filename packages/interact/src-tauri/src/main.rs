#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod side_car_launcher;

use tauri::api::process::{Command, CommandEvent};
use tauri::Manager;
use side_car_launcher::{
    launch_distant_sidecar,
    kill_distant_sidecar
};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            launch_distant_sidecar,
            kill_distant_sidecar
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_greet() {
        assert_eq!(greet("Tauri"), "Hello, Tauri! You've been greeted from Rust!");
    }
}
