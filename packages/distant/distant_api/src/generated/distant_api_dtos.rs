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
// #[serde(rename = "health")]
// pub health: String,

// #[serde(rename = "status")]
// pub status: String,

// #[serde(rename = "index")]
// pub index: String,

// #[serde(rename = "uuid")]
// pub uuid: String,

// #[serde(rename = "pri")]
// pub pri: String,

// #[serde(rename = "rep")]
// pub rep: String,

// #[serde(rename = "docs.count")]
// pub docs_count: String,

// #[serde(rename = "docs.deleted")]
// pub docs_deleted: String,

// #[serde(rename = "store.size")]
// pub store_size: String,

/// #[serde(rename = "pri.store.size")]
/// pub pri_store_size: String,
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct IndexInfo {
    #[prost(string, tag="1")]
    pub health: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub status: ::prost::alloc::string::String,
    #[prost(string, tag="3")]
    pub index: ::prost::alloc::string::String,
    #[prost(string, tag="4")]
    pub uuid: ::prost::alloc::string::String,
    #[prost(string, tag="5")]
    pub pri: ::prost::alloc::string::String,
    #[prost(string, tag="6")]
    pub rep: ::prost::alloc::string::String,
    #[prost(string, tag="7")]
    pub docs_count: ::prost::alloc::string::String,
    #[prost(string, tag="8")]
    pub docs_deleted: ::prost::alloc::string::String,
    #[prost(string, tag="9")]
    pub store_size: ::prost::alloc::string::String,
    #[prost(string, tag="10")]
    pub pri_store_size: ::prost::alloc::string::String,
}
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DistantListIndexResponse {
    #[prost(message, repeated, tag="1")]
    pub indices: ::prost::alloc::vec::Vec<IndexInfo>,
    /// count sint32
    #[prost(int32, tag="2")]
    pub count: i32,
}
