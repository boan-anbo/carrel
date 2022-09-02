#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DistantApiSearchRequest {
    #[prost(string, tag="1")]
    pub query: ::prost::alloc::string::String,
    #[prost(string, repeated, tag="2")]
    pub indices: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
}
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DistantApiSearchResponse {
    #[prost(message, repeated, tag="1")]
    #[schema(value_type=Vec<Passage>)]
    pub passages: ::prost::alloc::vec::Vec<super::passage::Passage>,
    /// / count
    #[prost(sint64, tag="2")]
    pub count: i64,
    /// / optional scroll_id
    #[prost(string, optional, tag="3")]
    pub scroll_id: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(bool, tag="4")]
    pub has_more: bool,
}
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DistantApiScrollRequest {
    #[prost(string, tag="1")]
    pub scroll_id: ::prost::alloc::string::String,
}
