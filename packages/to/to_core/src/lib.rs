#![allow(dead_code, unused_imports)]

//! Core Library for the Textual Object Ecosystem
//!
//! This library is the core library for the Textual Object Ecosystem.
//!
//! # Main Features
//!
//! - Textual Object Machine
//!
//! - Textual Object Parser
//!
//! - Textual Object Ticket
//!
//! - Textual Object DB
//!
//! - Textual Object Tag
//!
//! - Textual Object Card

pub mod db;
pub mod entities;
pub mod enums;
pub mod error;
pub mod file_utils;
pub mod to;
pub mod to_card;
pub mod to_dtos;
pub mod to_machine;
pub mod to_parser;
pub mod to_tag;
pub mod to_ticket;
pub(crate) mod utils;
// Handles files etc.
pub(crate) mod fs;
