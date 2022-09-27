use carrel_server::launch::launch_server::launch_server;

#[tauri::command]
 pub async fn launch_carrel_server() {
    println!("Launching carrel server");
    let handle = tauri::async_runtime::spawn(async {
        launch_server().await;
    });
    handle.await.expect("Cannot start Carrel server");

}
