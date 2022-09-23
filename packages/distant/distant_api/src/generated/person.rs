/// / a unique id in the original place
/// / In the case of a web page, this is the url.
/// / In the case of a book, this is the isbn.
/// / In the case of a journal, this is the issn.
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(utoipa::ToSchema)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Person {
    #[prost(string, tag="1")]
    pub uuid: ::prost::alloc::string::String,
    /// / first name
    #[prost(string, tag="2")]
    pub first_name: ::prost::alloc::string::String,
    /// / last name
    #[prost(string, tag="3")]
    pub last_name: ::prost::alloc::string::String,
    /// / description
    #[prost(string, tag="4")]
    pub description: ::prost::alloc::string::String,
}
