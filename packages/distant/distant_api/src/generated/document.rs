/// / An abstract document.
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Document {
    /// / Uuid of the source.
    #[prost(string, tag="1")]
    pub uuid: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub title: ::prost::alloc::string::String,
    /// / description
    #[prost(string, tag="3")]
    pub description: ::prost::alloc::string::String,
    /// / citation information
    #[prost(string, tag="4")]
    pub citation: ::prost::alloc::string::String,
    /// / publication date
    #[prost(string, tag="5")]
    pub publication_date: ::prost::alloc::string::String,
    /// / creators
    #[prost(message, repeated, tag="6")]
    #[schema(value_type=Vec<Person>)]
    pub creators: ::prost::alloc::vec::Vec<super::person::Person>,
    /// / In the case of a Zotero Item, this is the Zotero URI.
    #[prost(string, tag="7")]
    pub source_id: ::prost::alloc::string::String,
    /// / Describes what the unique Id refers to.
    #[prost(string, tag="8")]
    pub source_id_type: ::prost::alloc::string::String,
    /// / source url, e.g. a direct link to the source, e.g. the DOI of a book or journal
    #[prost(string, tag="9")]
    pub source_url: ::prost::alloc::string::String,
    /// / archive location
    #[prost(string, tag="10")]
    pub archive_location: ::prost::alloc::string::String,
    /// / file
    #[prost(message, repeated, tag="11")]
    #[schema(value_type=Vec<File>)]
    pub files: ::prost::alloc::vec::Vec<super::file::File>,
    /// pages protobuf number type
    #[prost(string, tag="12")]
    pub pages: ::prost::alloc::string::String,
    /// / modified date using Unix timestamp
    #[prost(int64, tag="13")]
    pub modified: i64,
    /// / created date
    #[prost(int64, tag="14")]
    pub created: i64,
    /// / content type
    #[prost(string, tag="15")]
    pub content: ::prost::alloc::string::String,
}
