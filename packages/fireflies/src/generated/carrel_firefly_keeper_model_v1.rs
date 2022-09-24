/// / Fireflies capture project-wide (i.e. within the project folder) tags and category them by important types.
/// / Those tags in these types are presumed to be important, even though they are not unlike any other tags.
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Fireflies {
    /// all tags
    #[prost(message, repeated, tag="1")]
    pub all_tags: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// all tags count
    #[prost(int32, tag="2")]
    pub all_tags_count: i32,
    /// this is a special sense of note as in `annotation`, which is the essence of knowledge-making such as in commenting, summarizing, paraphrasing, expanding etc on a passage.
    /// Marker: \[[Note]\] or \[[N]\]
    #[prost(message, repeated, tag="3")]
    pub notes: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// notes count
    #[prost(int32, tag="4")]
    pub notes_count: i32,
    /// this is for tasks. E.g. "revise this part", "search for another keyword"
    /// Marker: \[[Todo]\] or \[[T]\]
    #[prost(message, repeated, tag="5")]
    pub todos: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// todos count
    #[prost(int32, tag="6")]
    pub todos_count: i32,
    /// this is for original ideas from the researcher
    /// Marker: \[[Idea]\] or \[[I]\]
    #[prost(message, repeated, tag="7")]
    pub ideas: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// ideas count
    #[prost(int32, tag="8")]
    pub ideas_count: i32,
    /// summary of key points or ideas from materials. \[[Summary]\]
    /// Marker: \[[Summary]\] or \[[S]\]
    #[prost(message, repeated, tag="9")]
    pub summaries: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// summaries count
    #[prost(int32, tag="10")]
    pub summaries_count: i32,
    /// points, similar to ideas, but usable for writing.
    /// Marker: \[[Point]\] or \[[P]\]
    #[prost(message, repeated, tag="11")]
    pub points: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// points count
    #[prost(int32, tag="12")]
    pub points_count: i32,
    /// facts, to mark important facts or data points.
    /// Marker: \[[Fact]\] or \[[F]\]
    #[prost(message, repeated, tag="13")]
    pub facts: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// facts count
    #[prost(int32, tag="14")]
    pub facts_count: i32,
    /// quotes, to mark important quotes to use.
    /// Marker: \[[Quote]\] or \[[Q]\]
    #[prost(message, repeated, tag="15")]
    pub quotes: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// quotes count
    #[prost(int32, tag="16")]
    pub quotes_count: i32,
    /// questions, to mark important questions to ask.
    /// Marker: \[[Question]\] or \[[?]\]
    #[prost(message, repeated, tag="17")]
    pub questions: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// questions count
    #[prost(int32, tag="18")]
    pub questions_count: i32,
    /// keywords, to mark important keywords to use.
    /// Marker: \[[Keyword]\] or \[[K]\]
    #[prost(message, repeated, tag="19")]
    pub keywords: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// keywords count
    #[prost(int32, tag="20")]
    pub keywords_count: i32,
    /// references, to mark important references to use.
    /// Marker: \[[Reference]\] or \[[R]\]
    #[prost(message, repeated, tag="21")]
    pub references: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// references count
    #[prost(int32, tag="22")]
    pub references_count: i32,
    /// others' points, point by another, usually from readings.
    /// Marker: \[[OPoint]\] or \[[OP]\]
    #[prost(message, repeated, tag="23")]
    pub opoints: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// opoints count
    #[prost(int32, tag="24")]
    pub opoints_count: i32,
    /// Others' evidences, examples by another, usually from readings.
    /// Marker: \[[OEvidence]\] or \[[OE]\]
    #[prost(message, repeated, tag="25")]
    pub oevidences: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// oevidences count
    #[prost(int32, tag="26")]
    pub oevidences_count: i32,
    /// data, to mark important data to use.
    /// Marker: \[[Data]\] or \[[D]\]
    #[prost(message, repeated, tag="27")]
    pub data: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// data count
    #[prost(int32, tag="28")]
    pub data_count: i32,
    /// the rest of the tags that are not categorized.
    #[prost(message, repeated, tag="29")]
    pub unclassified: ::prost::alloc::vec::Vec<super::super::super::common::tag::v1::Tag>,
    /// unclassified count
    #[prost(int32, tag="30")]
    pub unclassified_count: i32,
}
#[derive(serde::Serialize, serde::Deserialize)]
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]
#[repr(i32)]
pub enum FireflyCategories {
    /// all tags
    AllTags = 0,
    /// notes
    Notes = 1,
    /// todos
    Todos = 2,
    /// ideas
    Ideas = 3,
    /// summaries
    Summaries = 4,
    /// points
    Points = 5,
    /// facts
    Facts = 6,
    /// quotes
    Quotes = 7,
    /// questions
    Questions = 8,
    /// keywords
    Keywords = 9,
    /// references
    References = 10,
    /// others' points
    Opoints = 11,
    /// others' evidences
    Oevidences = 12,
    /// data
    Data = 13,
    /// unclassified
    Unclassified = 14,
}
impl FireflyCategories {
    /// String value of the enum field names used in the ProtoBuf definition.
    ///
    /// The values are not transformed in any way and thus are considered stable
    /// (if the ProtoBuf definition does not change) and safe for programmatic use.
    pub fn as_str_name(&self) -> &'static str {
        match self {
            FireflyCategories::AllTags => "ALL_TAGS",
            FireflyCategories::Notes => "NOTES",
            FireflyCategories::Todos => "TODOS",
            FireflyCategories::Ideas => "IDEAS",
            FireflyCategories::Summaries => "SUMMARIES",
            FireflyCategories::Points => "POINTS",
            FireflyCategories::Facts => "FACTS",
            FireflyCategories::Quotes => "QUOTES",
            FireflyCategories::Questions => "QUESTIONS",
            FireflyCategories::Keywords => "KEYWORDS",
            FireflyCategories::References => "REFERENCES",
            FireflyCategories::Opoints => "OPOINTS",
            FireflyCategories::Oevidences => "OEVIDENCES",
            FireflyCategories::Data => "DATA",
            FireflyCategories::Unclassified => "UNCLASSIFIED",
        }
    }
}
