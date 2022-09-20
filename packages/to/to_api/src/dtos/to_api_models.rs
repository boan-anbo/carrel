#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ToApiScanRequest {
    #[prost(string, tag="1")]
    pub text: ::prost::alloc::string::String,
}
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ToApiTagScanResult {
    #[prost(string, tag="1")]
    pub text_original: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub text_cleaned: ::prost::alloc::string::String,
    #[prost(message, repeated, tag="3")]
    pub tags: ::prost::alloc::vec::Vec<ToApiTag>,
}
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ToApiTag {
    #[prost(string, tag="1")]
    pub key: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub value: ::prost::alloc::string::String,
    #[prost(string, tag="3")]
    pub note: ::prost::alloc::string::String,
}
