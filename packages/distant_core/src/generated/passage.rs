#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Passage {
    /// id
    #[prost(string, tag="1")]
    pub uuid: ::prost::alloc::string::String,
    /// passage text
    #[prost(string, tag="2")]
    pub text: ::prost::alloc::string::String,
    /// passage description
    #[prost(string, tag="3")]
    pub description: ::prost::alloc::string::String,
    /// e.g. "book1/chapter1" or page number
    #[prost(string, tag="4")]
    pub location: ::prost::alloc::string::String,
    /// passage document
    #[prost(message, optional, tag="5")]
    #[schema(value_type=Document)]
    pub document: ::core::option::Option<super::document::Document>,
}
