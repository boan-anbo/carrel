use crate::m20220929_111159_create_to::{Tag, TagRelation, TextualObject};
use crate::Query;
use carrel_utils::datetime::get_iso_string::get_now_iso_string;
use carrel_utils::uuid::new_v4;
use sea_orm_migration::SchemaManager;

// sqlx::query!("
//        CREATE TABLE IF NOT EXISTS textual_objects
// (
//     id PRIMARY KEY                               NOT NULL,
//     ticket_id               TEXT                 NOT NULL,
//     ticket_minimal          TEXT    DEFAULT ''   NOT NULL,
//
//     source_id               TEXT                 NOT NULL,
//     source_name             TEXT    DEFAULT ''   NOT NULL,
//     source_id_type          TEXT    DEFAULT ''   NOT NULL,
//     source_path             TEXT    DEFAULT ''   NOT NULL,
//
//     store_info              TEXT    DEFAULT ''   NOT NULL,
//     store_url               TEXT    DEFAULT ''   NOT NULL,
//
//     created                 TIMESTAMP            NOT NULL,
//     updated                 TIMESTAMP            NOT NULL,
//
//     json                    JSONB   DEFAULT '{}' NOT NULL,
//
//     card                    JSONB   DEFAULT NULL,
//     card_map                TEXT    DEFAULT ''   NOT NULL,
//     context                 TEXT    DEFAULT ''   NOT NULL,
//     ticket_index_in_context INTEGER DEFAULT 0    NOT NULL
// }

pub async fn seed_database<'a>(manager: &'a SchemaManager<'a>) {
    let first_to_uuid = new_v4().to_string();
    // // seed project
    let insert_to_1 = Query::insert()
        .into_table(TextualObject::Table)
        .columns(
            vec![
                TextualObject::Uuid,
                TextualObject::TicketId,
                TextualObject::TicketMinimal,
                TextualObject::SourceId,
                TextualObject::SourceName,
                TextualObject::SourceIdType,
                TextualObject::SourcePath,
                TextualObject::StoreInfo,
                TextualObject::StoreUrl,
                TextualObject::Created,
                TextualObject::Updated,
                TextualObject::Json,
                TextualObject::JsonType,
                TextualObject::JsonUniqueId,
                TextualObject::Card,
                TextualObject::CardMap,
                TextualObject::Context,
                TextualObject::TicketIndexInContext,
            ])
        .values_panic(
            [
                first_to_uuid.clone().into(),
                "ticket_id1".into(),
                "ticket_1_ticket_minimal".into(),
                "source_id1".into(),
                "source_name1".into(),
                "source_id_type1".into(),
                "source_path1".into(),
                "store_info1".into(),
                "store_url1".into(),
                get_now_iso_string().into(),
                get_now_iso_string().into(),
                r#"{"ticket_id": "ticket_id1","collection_uuids":[],"comment":"Page 0: Highlight Text","comment_author":"Bo","comment_created_at":"2022-08-22T23:52:45+05:00","comment_modified_at":"2022-08-22T23:52:58+05:00","context":"?????????????????????????????? ???????????????????????? ?????? 15 ??? 2003???6???30???\r\n??????????????????????????????\r\n??? ?????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n???????????????????????????????????????????????????\r\n??? ???????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n?????????????????????????????????????????????????????????????????????\r\n1 ??????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n?????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n2 ?????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n?????????\"free-floating\"???????????????????????????????????????????????????????????????????????????????????????\r\n??????????????????????????????????????????????????????1905????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\r\n????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","created_at":"2022-08-22T23:52:45+05:00","description":"Highlight","document_author":"","document_description":"","document_id":"","document_id_type":"","document_metadata":{},"document_pages":8,"document_publication_datetime":"","document_publication_year":0,"document_reference":"","document_storage_id":"","document_storage_id_type":"","document_storage_url":"","document_title":"chn","extracted_at":"2000-10-07T02:55:00.795685700+00:00","file_directory":"\\\\?\\C:\\Script\\carrel\\packages\\carrel\\carrel_core\\tests\\fixtures\\pdfs","file_extension":"pdf","file_full_name":"chn.pdf","file_full_path":"","full_text":"","importance":0,"light":"??????????????????????????????","location_actual":"0","location_actual_modified_at":"2000-10-07T02:55:00.795685700+00:00","location_actual_type":"pdf_page_index","location_raw":"0","location_raw_type":"pdf_page_index","metadata":{},"modified_at":"2000-08-22T23:52:58+05:00","more_comments":{},"select_tag":null,"storage_description":"","storage_id_int":0,"storage_id_str":"","storage_url":"","tags":[],"title":"","unique_id":"","uuid":"","viewed_at":""}"#.into(),
                "firefly".into(),
                new_v4().to_string().into(),
                "{}".into(),
                "card_map1".into(),
                "context1".into(),
                1.into(),
            ])
        .to_owned();

    manager.exec_stmt(insert_to_1).await.unwrap();
    let second_to_uuid = new_v4().to_string();

    let insert_to_2 = Query::insert()
        .into_table(TextualObject::Table)
        .columns(vec![
            TextualObject::Uuid,
            TextualObject::TicketId,
            TextualObject::TicketMinimal,
            TextualObject::SourceId,
            TextualObject::SourceName,
            TextualObject::SourceIdType,
            TextualObject::SourcePath,
            TextualObject::StoreInfo,
            TextualObject::StoreUrl,
            TextualObject::Created,
            TextualObject::Updated,
            TextualObject::Json,
            TextualObject::JsonType,
            TextualObject::JsonUniqueId,
            TextualObject::Card,
            TextualObject::CardMap,
            TextualObject::Context,
            TextualObject::TicketIndexInContext,
        ])
        .values_panic([
            second_to_uuid.clone().into(),
            "ticket_id2".into(),
            "ticket_2_ticket_minimal".into(),
            "source_id2".into(),
            "source_name2".into(),
            "source_id_type2".into(),
            "source_path2".into(),
            "store_info2".into(),
            "store_url2".into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            "{}".into(),
            "NULL".into(),
            new_v4().to_string().into(),
            "{}".into(),
            "card_map2".into(),
            "context2".into(),
            2.into(),
        ])
        .to_owned();

    manager.exec_stmt(insert_to_2).await.unwrap();

    let insert_to_3 = Query::insert()
        .into_table(TextualObject::Table)
        .columns(vec![
            TextualObject::Uuid,
            TextualObject::TicketId,
            TextualObject::TicketMinimal,
            TextualObject::SourceId,
            TextualObject::SourceName,
            TextualObject::SourceIdType,
            TextualObject::SourcePath,
            TextualObject::StoreInfo,
            TextualObject::StoreUrl,
            TextualObject::Created,
            TextualObject::Updated,
            TextualObject::Json,
            TextualObject::JsonType,
            TextualObject::JsonUniqueId,
            TextualObject::Card,
            TextualObject::CardMap,
            TextualObject::Context,
            TextualObject::TicketIndexInContext,
        ])
        .values_panic([
            new_v4().to_string().into(),
            "ticket_id3".into(),
            "ticket_3_ticket_minimal".into(),
            "source_id3".into(),
            "source_name3".into(),
            "source_id_type3".into(),
            "source_path3".into(),
            "store_info3".into(),
            "store_url3".into(),
            get_now_iso_string().into(),
            get_now_iso_string().into(),
            "{}".into(),
            "NULL".into(),
            new_v4().to_string().into(),
            "{}".into(),
            "card_map3".into(),
            "context3".into(),
            3.into(),
        ])
        .to_owned();

    // pub id: i32,
    // pub key: String,
    // pub value: String,
    // pub note: String,
    // pub raw_tag_string: String,
    // pub uuid: String,
    // pub to_id: i32,
    // insert two tags to the first textual object
    let insert_to_1_tag_1 = Query::insert()
        .into_table(Tag::Table)
        .columns(vec![
            Tag::Id,
            Tag::Key,
            Tag::Value,
            Tag::Note,
            Tag::RawTagString,
            Tag::Uuid,
            Tag::ToUuid,
            Tag::ToId,
        ])
        .values_panic([
            1.into(),
            "tag_key_1".into(),
            "tag_value_1".into(),
            "tag_note_1".into(),
            "tag_raw_tag_string_1".into(),
            new_v4().to_string().into(),
            first_to_uuid.clone().into(),
            1.into(),
        ])
        .to_owned();

    let insert_to_1_tag_2 = Query::insert()
        .into_table(Tag::Table)
        .columns(vec![
            Tag::Id,
            Tag::Key,
            Tag::Value,
            Tag::Note,
            Tag::RawTagString,
            Tag::Uuid,
            Tag::ToUuid,
            Tag::ToId,
        ])
        .values_panic([
            2.into(),
            "tag_key_2".into(),
            "tag_value_2".into(),
            "tag_note_2".into(),
            "tag_raw_tag_string_2".into(),
            new_v4().to_string().into(),
            first_to_uuid.clone().into(),
            1.into(),
        ])
        .to_owned();

    manager.exec_stmt(insert_to_1_tag_1).await.unwrap();

    manager.exec_stmt(insert_to_1_tag_2).await.unwrap();

    let insert_to_2_tag_1_but_same_key_1 = Query::insert()
        .into_table(Tag::Table)
        .columns(vec![
            Tag::Id,
            Tag::Key,
            Tag::Value,
            Tag::Note,
            Tag::RawTagString,
            Tag::Uuid,
            Tag::ToUuid,
            Tag::ToId,
        ])
        .values_panic([
            3.into(),
            "tag_key_1".into(),
            "tag_value_3".into(),
            "tag_note_3".into(),
            "tag_raw_tag_string_3".into(),
            new_v4().to_string().into(),
            second_to_uuid.clone().into(),
            2.into(),
        ])
        .to_owned();

    let insert_to_2_tag_2_with_same_key_and_value = Query::insert()
        .into_table(Tag::Table)
        .columns(vec![
            Tag::Id,
            Tag::Key,
            Tag::Value,
            Tag::Note,
            Tag::RawTagString,
            Tag::Uuid,
            Tag::ToUuid,
            Tag::ToId,
        ])
        .values_panic([
            4.into(),
            "tag_key_1".into(),
            "tag_value_3".into(),
            "tag_note_4".into(),
            "tag_raw_tag_string_4".into(),
            new_v4().to_string().into(),
            second_to_uuid.clone().into(),
            2.into(),
        ])
        .to_owned();

    manager.exec_stmt(insert_to_2_tag_1_but_same_key_1).await.unwrap();

    manager.exec_stmt(insert_to_2_tag_2_with_same_key_and_value).await.unwrap();
    // Table,
    // SourceId,
    // TargetId,
    // RelationType,
    // insert two relations between the tags
    let insert_to_tag_1_relation_1 = Query::insert()
        .into_table(TagRelation::Table)
        .columns(vec![
            TagRelation::SourceId,
            TagRelation::TargetId,
            TagRelation::RelationType,
        ])
        .values_panic([
            1.into(),
            2.into(),
            0.into(),
        ])
        .to_owned();

    manager.exec_stmt(insert_to_tag_1_relation_1).await.unwrap();

    let insert_to_tag_2_relation_1 = Query::insert()
        .into_table(TagRelation::Table)
        .columns(vec![
            TagRelation::SourceId,
            TagRelation::TargetId,
            TagRelation::RelationType,
        ])
        .values_panic([
            2.into(),
            1.into(),
            2.into(),
        ])
        .to_owned();

    manager.exec_stmt(insert_to_tag_2_relation_1).await.unwrap();




    manager.exec_stmt(insert_to_3).await.unwrap();
}
