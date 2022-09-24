use tracing_subscriber::fmt::Subscriber as FmtSubscriber;
use crate::Level;

/// Attach a debug tracing subscriber to the current thread.
pub fn attach_tracing_subscriber() {
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::DEBUG)
        .finish();

    tracing::subscriber::set_global_default(subscriber).expect("setting default subscriber failed");
}
