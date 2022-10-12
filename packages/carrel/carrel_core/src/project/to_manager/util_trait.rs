//! Key util functions to convert firefly db models to Textual Objects (TOs) and vice versa

use carrel_commons::carrel::common::firefly::v2::Firefly;
use serde_json::Value;
use to_core::entities::textual_objects;
use to_core::implementation::util_func::ToUtilFunc;

// this handles the conversion of TO to Firefly by connecting two steps:
// 1. convert TO.json to a json value
// 2. convert json value to Firefly
pub trait ToFireflyUtils {
    fn into_common_firefly_v2(self) -> Option<Firefly>;
}

impl ToFireflyUtils for textual_objects::ActiveModel {
    fn into_common_firefly_v2(self) -> Option<Firefly> {
        let firefly_json_value = self.get_json_value().unwrap();
        let firefly = serde_json::from_value::<Option<Firefly>>(firefly_json_value).unwrap_or(None);
        firefly
    }
}

impl ToFireflyUtils for textual_objects::Model {
    fn into_common_firefly_v2(self) -> Option<Firefly> {
        let firefly_json_value = self.get_json_value();
        match firefly_json_value {
            Some(json) => serde_json::from_value::<Option<Firefly>>(json).unwrap_or(None),
            None => None,
        }
    }
}

pub trait ToFireflyUtilsOption {
    fn into_firefly_option(self) -> Option<Firefly>;
}

impl ToFireflyUtilsOption for Option<textual_objects::Model> {
    fn into_firefly_option(self) -> Option<Firefly> {
        match self {
            Some(to) => to.into_common_firefly_v2(),
            None => None,
        }
    }
}

pub trait ToFirefliesUtils {
    fn into_fireflies(self) -> Vec<Firefly>;
}

impl ToFirefliesUtils for Vec<textual_objects::Model> {
    fn into_fireflies(self) -> Vec<Firefly> {
        let mut fireflies = Vec::new();
        for to in self {
            let firefly = to.into_common_firefly_v2();
            match firefly {
                Some(f) => fireflies.push(f),
                None => continue,
            }
        }
        fireflies
    }
}

impl ToFirefliesUtils for Vec<textual_objects::ActiveModel> {
    fn into_fireflies(self) -> Vec<Firefly> {
        let mut fireflies = Vec::new();
        for to in self {
            let firefly = to.into_common_firefly_v2();
            match firefly {
                Some(f) => fireflies.push(f),
                None => continue,
            }
        }
        fireflies
    }
}