//! Shared crate for generated typeings and implementations for carrel eco-system as a single source of truth
//!
//! - This is separated from carrel_core because this crate is for typings and implementations, while carrel_core is for business logic for the carrel-applications (desktop, web, mobile, etc.)
//!
//! For instance, FireflyKeeper and InteractDb might use these types, but they are not part of the carrel-core and do not need carrel-application business logic.
//!
//! - It is unforunately that Tonic has to be included because the Carrel specific Grpc services are not needed by every user of this crate.
//!
//! But prost-build under Tonic-build can only build all at once if we want to share the same proto types. If we separate the services from the messages, for example, there will be two sets of messages nominally (by virtue of crate paths) different for Rust even though they have the exact same structures.
//!
//! This why it cannot be fixed, by letting FireflyKeeper build its own set of protos, for example, unless we write a set of conversions between what effectively are the same type of definitions such `common.Tag.v1.Tag` to `common.Tag.v1.Tag`, as far as I know.


mod implementations;

pub mod carrel {
    pub const FILE_DESCRIPTOR_SET: &[u8] = include_bytes!("generated/carrel_descriptor.bin");

    pub mod common {
        pub mod tag {
            pub mod v1 {
                include!("generated/carrel_common_tag_v1.rs");
            }
        }

        pub mod document {
            pub mod v1 {
                include!("generated/carrel_common_document_v1.rs");
            }
        }

        pub mod snippet_location {
            pub mod v1 {
                include!("generated/carrel_common_snippet_location_v1.rs");
            }
        }

        pub mod comment {
            pub mod v1 {
                include!("generated/carrel_common_comment_v1.rs");
            }
        }

        pub mod card {
            pub mod v1 {
                include!("generated/carrel_common_card_v1.rs");
            }
        }

        pub mod file {
            pub mod v1 {
                include!("generated/carrel_common_file_v1.rs");
            }
        }

        pub mod importance {
            pub mod v1 {
                include!("generated/carrel_common_importance_v1.rs");
            }
        }

        pub mod person {
            pub mod v1 {
                include!("generated/carrel_common_person_v1.rs");
            }
        }

        pub mod passage {
            pub mod v1 {
                include!("generated/carrel_common_passage_v1.rs");
            }
        }

        pub mod storage_info {
            pub mod v1 {
                include!("generated/carrel_common_storage_info_v1.rs");
            }
        }
    }

    #[cfg(feature = "server")]
    pub mod server {
        pub mod firefly_keeper {
            pub mod v1 {
                include!("generated/carrel_server_firefly_keeper_v1.rs");
            }
        }

        pub mod scaffold {
            pub mod v1 {
                include!("generated/carrel_server_scaffold_v1.rs");
            }
        }
    }

    #[cfg(feature = "firefly_keeper")]
    pub mod firefly_keeper {
        pub mod v1 {
            include!("generated/carrel_firefly_keeper_v1.rs");
        }
    }

    #[cfg(feature = "stacks")]
    pub mod stacks {
        pub mod services {
            pub mod v1 {
                include!("generated/carrel_stacks_services_v1.rs");
            }
        }
    }
}

// google::protobuf::FloatValue
pub mod google {
    pub mod protobuf {
        include!("generated/google_protobuf.rs");
    }
}

#[cfg(feature = "generic")]
pub mod generic {
    pub mod api {
        pub mod request_directory {
            pub mod v1 {
                include!("generated/generic_api_request_directory_v1.rs");
            }
        }
    }
}



