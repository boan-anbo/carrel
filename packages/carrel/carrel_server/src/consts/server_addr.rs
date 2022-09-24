use config::Config;

pub struct ServerAddr {
    /// The address of Tonic server, must be of 127 kind
    pub server_addr: String,
    /// with http:// prefix, this allows GrpcWeb to connect to the server
    pub http_server_addr: String,
}

// static once-cell for string server address
pub static SERVER_ADDR: once_cell::sync::Lazy<ServerAddr> = once_cell::sync::Lazy::new(|| {
    let settings = Config::builder()
        // retrieve the config file from the root of the project in `config.yaml`
        .add_source(config::File::with_name("config.yaml"))
        .build()
        .unwrap();

    // get addr
    let addr = settings.get::<String>("addr").expect("`addr` not found");
    // get port from addr
    let port = settings.get::<String>("port").expect("`port` not found");
    // concat addr and port
    let server_addr = format!("{}:{}", addr, port);
    // return addr
    let http_server_addr = format!("http://{}", server_addr);
    ServerAddr {
        server_addr,
        http_server_addr,
    }
});
