//! A create for OS-level communication and control
//!
//! # Current features
//!
//! - Send keyboard input
//!
//! ```
//! use diji::keyboard::send_input::send_string_enigo;
//!
//! let result = send_string_enigo("Hello, World");
//! ```

#[cfg(feature="controls")]
pub mod controls;
