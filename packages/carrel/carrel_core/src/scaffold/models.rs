pub mod firefly_keeper_model {
    pub mod model {
        pub mod v1 {
            include!("generated/carrel_firefly_keeper_model_v1.rs");
        }
    }
}

pub mod common {
    pub mod tag {
        pub mod v1 {
            include!("generated/carrel_common_tag_v1.rs");
        }
    }

    pub mod snippet_location {
        pub mod v1 {
            include!("generated/carrel_common_snippet_location_v1.rs");
        }
    }
}
