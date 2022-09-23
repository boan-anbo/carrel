/// The greeting service definition.
/// The request message containing the user's name.
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ApiError {
    /// / code
    #[prost(string, tag="1")]
    pub code: ::prost::alloc::string::String,
    /// / message
    ///
    /// / suggestion
    #[prost(string, tag="2")]
    pub message: ::prost::alloc::string::String,
    #[prost(string, tag="3")]
    pub suggestion: ::prost::alloc::string::String,
    /// / user payload
    #[prost(string, tag="4")]
    pub user_payload: ::prost::alloc::string::String,
    /// / payload for user
    #[prost(string, tag="5")]
    pub payload_for_user: ::prost::alloc::string::String,
}
