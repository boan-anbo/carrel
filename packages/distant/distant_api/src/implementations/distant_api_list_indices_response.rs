use distant_es_client::responses::index_info::IndexInfo;
use crate::distant_api::{DistantApiSearchResponse, DistantListIndexResponse};
use crate::passage::Passage;

/// impl from DistantSearchResult for DistantApiSearchResponse
impl From<Vec<IndexInfo>> for DistantListIndexResponse {
    fn from(indices: Vec<IndexInfo>) -> Self {
        DistantListIndexResponse {
            // to i64
            count: indices.len() as i32,
            indices: indices
                .iter()
                // this convert two different types with the same data.
                // Fixme: replace distant_es_client's type definition for IndexInfo with the same one distant core is using, which is from Protobuf.
                .map(|index| crate::distant_api::IndexInfo {
                    health: index.health.clone(),
                    status: index.status.clone(),
                    index: index.index.clone(),
                    uuid: index.uuid.clone(),
                    pri: index.pri.clone(),
                    rep: index.rep.clone(),
                    docs_count: index.docs_count.clone(),
                    docs_deleted: index.docs_deleted.clone(),
                    store_size: index.store_size.clone(),
                    pri_store_size: index.pri_store_size.clone(),
                })
                .collect(),
        }
    }
}