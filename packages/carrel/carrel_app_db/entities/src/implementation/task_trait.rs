use carrel_utils::uuid::new_v4;
use sea_orm::ActiveValue::Set;
use sea_orm::sea_query::ColumnSpec::Default;
use crate::generated::prelude::*;
use crate::generated::task::ActiveModel;
use carrel_commons::carrel::core::project_manager::v1::TaskState;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
// constructor

impl Task {
    pub fn new_active_model(identifier: &str, description: &str, commissioner: &str, allow_multiple: bool) -> ActiveModel {
        ActiveModel {
            id: Set(0),
            identifier: Set(identifier.to_string()),
            uuid: Set(new_v4().to_string()),
            description: Set(description.to_string()),
            state: Set(i32::from(TaskState::Created)),
            created_at: Set(get_now_iso_string()),
            updated_at: Set(get_now_iso_string()),
            progress: Set(0),
            allow_multiple: Set(if allow_multiple { 1 } else { 0 }),
            last_message: Set("".to_string()),
            commissioner: Set(commissioner.to_string()),
        }
    }
}