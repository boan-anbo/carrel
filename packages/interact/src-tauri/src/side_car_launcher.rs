use std::intrinsics::type_id;
use tauri::api::process::{Command, CommandChild, CommandEvent};

enum SideCars {
    Distant,
    InteractDb
}

// create a once cell to store sidecar child
static DISTANT_SIDE_CAR: once_cell::sync::OnceCell<tauri::api::process::Child> = once_cell::sync::OnceCell::new();

// create a once cell to
static INTERACT_DB_SIDE_CAR: once_cell::sync::OnceCell<tauri::api::process::Child> = once_cell::sync::OnceCell::new();







async fn launch_interact_side_car(side_car_type: SideCars) {

   let child = match side_car_type {
        SideCars::Distant => {
            launch_sidecar("distant".to_string())
        }
        SideCars::InteractDb => {
            launch_sidecar("interact_db".to_string())
        }
    }.await;

    match side_car_type {
        SideCars::Distant => {
            DISTANT_SIDE_CAR.set(&child).unwrap();
        }
        SideCars::InteractDb => {
            INTERACT_DB_SIDE_CAR.set(&child).unwrap();
        }
    }
}

// start distant sidecar
async fn launch_sidecar(port: int32) -> tauri::api::process::Child {
    // parse the port to a string
    let port_string = port.to_string();

    let (mut rx, mut child) = Command::new_sidecar("distant",
    )
        .expect(fmt!("failed to create `{}` binary command", &side_car_name))
        .spawn()
        .expect("Failed to spawn sidecar");

    let handle = tauri::async_runtime::spawn(async move {
        // read events such as stdout
        while let Some(event) = rx.recv().await {
            if let CommandEvent::Stdout(line) = event {
                window
                    .emit("message", Some(format!("'{}'", line)))
                    .expect("failed to emit event");
                // write to stdin
                child.write("message from Rust\n".as_bytes()).unwrap();
            }
        }
    });

    child

}
// kill sidecar
async fn kill_side_car(side_car_type: SideCars) {
    match side_car_type {
        SideCars::Distant => {
            let child = DISTANT_SIDE_CAR.get().unwrap();
            child.kill().unwrap();
        }
        SideCars::InteractDb => {
            let child = INTERACT_DB_SIDE_CAR.get().unwrap();
            child.kill().unwrap();
        }
    }
}

// has sidecar
async fn has_side_car(side_car_type: SideCars) -> bool {
    match side_car_type {
        SideCars::Distant => {
            DISTANT_SIDE_CAR.get().is_some()
        }
        SideCars::InteractDb => {
            INTERACT_DB_SIDE_CAR.get().is_some()
        }
    }
}



async fn launch_sidecar(side_car_name: String) -> CommandChild {
    let (mut rx, mut child) = Command::new_sidecar(&side_car_name)
        .expect(fmt!("failed to create `{}` binary command", &side_car_name))
        .spawn()
        .expect("Failed to spawn sidecar");

    let handle = tauri::async_runtime::spawn(async move {
        // read events such as stdout
        while let Some(event) = rx.recv().await {
            if let CommandEvent::Stdout(line) = event {
                window
                    .emit("message", Some(format!("'{}'", line)))
                    .expect("failed to emit event");
                // write to stdin
                child.write("message from Rust\n".as_bytes()).unwrap();
            }
        }
    });

    child

}

