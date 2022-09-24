/// describes the location of a snippet of string in a plaintext file.
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct SnippetLocation {
    ///
    #[prost(string, tag="1")]
    pub snippet: ::prost::alloc::string::String,
    /// the line number of the snippet in the file
    #[prost(int32, tag="2")]
    pub line_number: i32,
    /// the column number, starting index, of the snippet in the file
    #[prost(int32, tag="3")]
    pub column_number: i32,
    /// the length of the snippet
    #[prost(int32, tag="4")]
    pub length: i32,
    /// the file path of the snippet
    #[prost(string, tag="5")]
    pub file_path: ::prost::alloc::string::String,
    /// the file name of the snippet
    #[prost(string, tag="6")]
    pub file_name: ::prost::alloc::string::String,
    /// the file extension of the snippet
    #[prost(string, tag="7")]
    pub file_extension: ::prost::alloc::string::String,
}
