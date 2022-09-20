use axum::http::StatusCode;
use axum::Json;
use axum::response::IntoResponse;
use to_core::to_dtos::to_add_dto::ToAddDto;
use to_core::to_dtos::to_add_dto::ToAddManyDto;
use to_core::to_dtos::to_find_dto::ToFindRequestDto;
use to_core::to_dtos::to_find_dto::ToFindResultDto;
use to_core::to_machine::to_machine_struct::ToMachine;
use to_core::to_parser::parser::ToParser;
use to_core::to_parser::parser_option::ToParserOption;
use crate::to_api_dtos::{ToApiScanRequest, ToApiTag, ToApiTagScanResult};

#[utoipa::path(
post,
path = "/scan_tags",
request_body = ToApiScanRequest,
responses(
(status = 201, description = "Scan results", body = ToApiTagScanResult<ToTag>),
)
)]
pub(crate) async fn scan_text_for_tags(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(_payload): Json<ToApiScanRequest>,
) -> impl IntoResponse {
    // insert your application logic here

    let result  = ToParser::scan_text_for_tags(&_payload.text, ToParserOption::default());


    (StatusCode::CREATED, Json(ToApiTagScanResult::from(result)))
}


// test
#[cfg(test)]
mod test {
    use super::*;

}
