// @generated automatically by Diesel CLI.

diesel::table! {
    project (uuid) {
        uuid -> Nullable<Text>,
        name -> Nullable<Text>,
        description -> Nullable<Text>,
        working_folder -> Nullable<Text>,
        updated_at -> Nullable<Text>,
        opened_at -> Nullable<Text>,
        created_at -> Nullable<Text>,
        finished_at -> Nullable<Text>,
    }
}
