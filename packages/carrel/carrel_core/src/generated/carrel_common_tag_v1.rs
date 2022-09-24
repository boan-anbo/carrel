/// / A common tag for carrel system.
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Tag {
    #[prost(string, tag="1")]
    pub key: ::prost::alloc::string::String,
    #[prost(string, optional, tag="2")]
    pub value: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, optional, tag="3")]
    pub note: ::core::option::Option<::prost::alloc::string::String>,
    #[prost(string, tag="4")]
    pub tag_marker: ::prost::alloc::string::String,
    #[prost(message, optional, tag="5")]
    pub snippet_location: ::core::option::Option<super::super::snippet_location::v1::SnippetLocation>,
    #[prost(string, tag="6")]
    pub uuid: ::prost::alloc::string::String,
}
