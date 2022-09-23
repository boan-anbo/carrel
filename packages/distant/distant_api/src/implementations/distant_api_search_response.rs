use crate::distant_api::DistantApiSearchResponse;
use crate::passage::Passage;

/// impl from DistantSearchResult for DistantApiSearchResponse
impl From<&distant_es_client::responses::search_result::DistantSearchResult> for DistantApiSearchResponse {
    fn from(search_result: &distant_es_client::responses::search_result::DistantSearchResult) -> Self {
        let passages: Vec<Passage> = search_result
            .hits
            .hits
            .iter()
            .map(Passage::from)
            .collect();
        DistantApiSearchResponse {
            passages,
            count: search_result.hits.total.value,
            scroll_id: search_result.scroll_id.clone(),
            has_more: search_result.scroll_id.is_some(),
        }
    }
}