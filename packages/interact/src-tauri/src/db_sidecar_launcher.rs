use std::borrow::{Borrow, BorrowMut};
use std::ops::Deref;
use std::path::Path;
use once_cell::sync::OnceCell;
use tauri::api::process::{Command, CommandChild, CommandEvent};
use tauri::command;


static mut DB_SIDECAR: OnceCell<CommandChild> = OnceCell::new();

// start distant sidecar
#[tauri::command]
pub async fn launch_db_sidecar() {
    let sidecar_name = "db";

    // get current working directory
    let current_dir = std::env::current_dir().unwrap();

    // println!("current_dir: {:?}", current_dir);
    // path = "C:\\Script\\carrel\\packages\\interact\\src-tauri\\target\\debug")
    // construct pathbuf
    let path = Path::new("C:\\Script\\carrel\\packages\\interact\\src-tauri\\target\\debug");
    let (mut rx, mut child) = Command::new_sidecar(sidecar_name)
        .expect(&format!("failed to create `{}` binary command", "distant"))
        .current_dir(path.to_path_buf())
        .spawn()
        .expect("Failed to spawn sidecar");

    let handle = tauri::async_runtime::spawn(async move {
        // read events such as stdout
        while let Some(event) = rx.recv().await {
            if let CommandEvent::Stdout(line) = event {
                println!("{}: {}", sidecar_name, line);
                // write to stdin
                // &child.borrow_mut().write("message from Rust\n".as_bytes()).unwrap();
            }
        }
    });

    println!("db sidecar launched {}", &child.pid());

    unsafe { DB_SIDECAR.set(child).unwrap() }
}

// kill sidecar
#[tauri::command]
pub async fn kill_db_sidecar() {
    println!("distant sidecar killed");
    unsafe {
        let child = DB_SIDECAR.take().expect("interact-db sidecar not running");
        child.kill().expect("failed to kill interact-db sidecar");
        //  print
    }
}
