#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod open_file;
mod distant_sidecar_launcher;
mod db_sidecar_launcher;
mod e_side_cars;

use tauri::api::process::{Command, CommandEvent};
use tauri::Manager;
use distant_sidecar_launcher::{
    launch_distant_sidecar,
    kill_distant_sidecar
};
use db_sidecar_launcher::{
    launch_db_sidecar,
    kill_db_sidecar
};
use open_file::open_file;


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            launch_distant_sidecar,
            kill_distant_sidecar,
            open_file,
            launch_db_sidecar,
            kill_db_sidecar
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
