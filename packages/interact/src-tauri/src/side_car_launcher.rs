use std::borrow::{Borrow, BorrowMut};
use std::ops::Deref;
use once_cell::sync::OnceCell;
use tauri::api::process::{Command, CommandChild, CommandEvent};

enum SideCars {
    Distant,
    InteractDb,
}


static mut DISTANT_SIDE_CAR: OnceCell<CommandChild> = OnceCell::new();

// start distant sidecar
#[tauri::command]
pub async fn launch_distant_sidecar(port: i32) {
    // unsafe {
    //     if !DISTANT_SIDE_CAR.get().unwrap() {
    //         println!("distant already running");
    //         return;
    //     }
    // }
    // parse the port to a string
    let sidecar_name = "distant";

    let (mut rx, mut child) = Command::new_sidecar(sidecar_name,
    )
        .expect(&format!("failed to create `{}` binary command", "distant"))
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

    unsafe { DISTANT_SIDE_CAR.set(child).unwrap() }
}

// kill sidecar
#[tauri::command]
pub async fn kill_distant_sidecar() {
    println!("distant sidecar killed");
    unsafe {
        let child = DISTANT_SIDE_CAR.take().expect("distant sidecar not running");
        child.kill().expect("failed to kill distant sidecar");
        //  print
    }
}

// has sidecar
async unsafe fn has_distant_side_car() -> bool {
    DISTANT_SIDE_CAR.get().is_some()
}
