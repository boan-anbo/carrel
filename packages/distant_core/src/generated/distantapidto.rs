#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DistantApiSearchRequest {
    #[prost(string, tag="1")]
    pub query: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub index: ::prost::alloc::string::String,
}
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DistantApiSearchResponse {
    #[prost(message, repeated, tag="1")]
    #[schema(value_type=Vec<Passage>)]
    pub passages: ::prost::alloc::vec::Vec<super::passage::Passage>,
    /// / count
    #[prost(uint64, tag="2")]
    pub count: u64,
}
