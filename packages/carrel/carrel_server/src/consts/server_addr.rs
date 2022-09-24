use config::Config;

// static once-cell for string server address
pub static SERVER_ADDR: once_cell::sync::Lazy<String> = once_cell::sync::Lazy::new(|| {
    let settings = Config::builder()
        // Add in `./Settings.toml`
        .add_source(config::File::with_name("config.yaml"))
        // Add in settings from the environment (with a prefix of APP)
        // Eg.. `APP_DEBUG=1 ./target/app` would set the `debug` key
        .build()
        .unwrap();

    // get addr
    let addr = settings.get::<String>("addr").expect("`addr` not found");
    // get port from addr
    let port = settings.get::<String>("port").expect("`port` not found");
    // concat addr and port
    let addr = format!("{}:{}", addr, port);
    // return addr
    addr
});
