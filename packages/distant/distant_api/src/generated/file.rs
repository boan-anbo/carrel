#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct File {
    /// id
    #[prost(string, tag="1")]
    pub uuid: ::prost::alloc::string::String,
    /// / filename, with extension
    #[prost(string, tag="10")]
    pub file_name: ::prost::alloc::string::String,
    /// / file extension
    #[prost(string, tag="11")]
    pub file_extension: ::prost::alloc::string::String,
    /// / file directory
    #[prost(string, tag="12")]
    pub file_dir: ::prost::alloc::string::String,
}
