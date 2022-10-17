use crate::m20220929_111159_create_to::{Tag, TagRelation, TextualObjects};
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
        .into_table(TextualObjects::Table)
        .columns(
            vec![
                TextualObjects::Uuid,
                TextualObjects::TicketId,
                TextualObjects::TicketMinimal,
                TextualObjects::SourceId,
                TextualObjects::SourceName,
                TextualObjects::SourceIdType,
                TextualObjects::SourcePath,
                TextualObjects::StoreInfo,
                TextualObjects::StoreUrl,
                TextualObjects::Created,
                TextualObjects::Updated,
                TextualObjects::Json,
                TextualObjects::JsonType,
                TextualObjects::JsonUniqueId,
                TextualObjects::Card,
                TextualObjects::CardMap,
                TextualObjects::Context,
                TextualObjects::TicketIndexInContext,
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
                r#"{"collection_uuids":[],"comment":"Page 0: Highlight Text","comment_author":"Bo","comment_created_at":"2022-08-22T23:52:45+05:00","comment_modified_at":"2022-08-22T23:52:58+05:00","context":"《二十一世紀》網絡版 二○○三年六月號 總第 15 期 2003年6月30日\r\n中國知識份子的邊緣化\r\n⊙ 余英時\r\n我想借這個機會提出一個比較有趣的問題，供大家討論，這個問題──中國知識份子的邊緣\r\n化──牽涉的範圍太廣，而我自己的思考也遠遠未達成熟的地步。現在我只能寫出一個簡單\r\n的提綱，我的目的是在提出問題，因為我也沒有自信這裡的提法是否合適。文中所表示的看\r\n法都屬未定之見，尤其要聲明一句的是：我所想做的是盡量客觀地展示歷史的問題，不是下\r\n價值判斷。這裡並沒有「春秋筆法」。\r\n一 從士大夫到知識份子\r\n中國傳統的士大夫（或「士」）今天叫做知識份子。但這不僅是名稱的改變，而是實質的改\r\n變。這一改變其實便是知識份子從中心向邊緣移動。\r\n1 傳統中國的士\r\n在中國傳統社會結構中，「士」號稱「四民之首」，確是佔據著中心的位置。荀子所謂「儒\r\n者在本朝則美政，在下位則美俗」大致點破了「士」的政治的和社會文化的功能。秦漢統一\r\n帝國以後，在比較安定的時期，政治秩序和文化秩序的維持都落在「士」的身上；在比較黑\r\n暗或混亂的時期，「士」也往往負起政治批評或社會批評的任務。通過漢代的鄉舉里選和隋\r\n唐以下的科舉制度，整個官僚系統大體上是由「士」來操縱的。通過宗族、學校、鄉約、會\r\n館等社會組織，「士」成為民間社會的領導階層。無論如何，在一般社會心理中，「士」是\r\n「讀書明理」的人；他們所受的道德和知識訓練（當然以儒家經典為主）使他們成為唯一有\r\n資格治理國家和領導社會的人選。「士」的這一社會形象也許只是「神話」，也許只能證明\r\n儒家作為一種意識形態在中國文化傳統中特別成功，但這不是我所要討論的問題。我想這一\r\n形象足以說明一項基本的歷史事實：在傳統中國，「士」確是處於中心的地位。\r\n2 知識份子的出現\r\n但是進入二十世紀，中國的狀況發生了劇烈的變化，「士」已從這一中心地位退了下來，代\r\n之而起的是現代知識份子。後者雖與前者有歷史傳承的關係，然而畢竟有重要的差異。如上\r\n所述，「士」在傳統社會上是有定位的；現代知識份子則如社會學家所云，是「自由浮動\r\n的」（\"free-floating\"）。從「士」變為知識份子自然有一個過程，不能清楚地劃一條界\r\n線。不過如果我們要找一個象徵的年份，1905年（光緒三十一年）科舉制度的廢止也許是十\r\n分合適的。科舉既廢，新式學校和東西洋遊學成為教育的主流，所造就的便是現代知識份子\r\n了。清末有一則趣聞可以象徵從士到知識份子的轉變（見商衍鎏：《清代科舉考試述錄》，","created_at":"2022-08-22T23:52:45+05:00","description":"Highlight","document_author":"","document_description":"","document_id":"","document_id_type":"","document_metadata":{},"document_pages":8,"document_publication_datetime":"","document_publication_year":0,"document_reference":"","document_storage_id":"","document_storage_id_type":"","document_storage_url":"","document_title":"chn","extracted_at":"2000-10-07T02:55:00.795685700+00:00","file_directory":"\\\\?\\C:\\Script\\carrel\\packages\\carrel\\carrel_core\\tests\\fixtures\\pdfs","file_extension":"pdf","file_full_name":"chn.pdf","file_full_path":"","full_text":"","importance":0,"light":"中國知識份子的邊緣化","location_actual":"0","location_actual_modified_at":"2000-10-07T02:55:00.795685700+00:00","location_actual_type":"pdf_page_index","location_raw":"0","location_raw_type":"pdf_page_index","metadata":{},"modified_at":"2000-08-22T23:52:58+05:00","more_comments":{},"select_tag":null,"storage_description":"","storage_id_int":0,"storage_id_str":"","storage_url":"","tags":[],"title":"","unique_id":"","uuid":"","viewed_at":""}"#.into(),
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
        .into_table(TextualObjects::Table)
        .columns(vec![
            TextualObjects::Uuid,
            TextualObjects::TicketId,
            TextualObjects::TicketMinimal,
            TextualObjects::SourceId,
            TextualObjects::SourceName,
            TextualObjects::SourceIdType,
            TextualObjects::SourcePath,
            TextualObjects::StoreInfo,
            TextualObjects::StoreUrl,
            TextualObjects::Created,
            TextualObjects::Updated,
            TextualObjects::Json,
            TextualObjects::JsonType,
            TextualObjects::JsonUniqueId,
            TextualObjects::Card,
            TextualObjects::CardMap,
            TextualObjects::Context,
            TextualObjects::TicketIndexInContext,
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
        .into_table(TextualObjects::Table)
        .columns(vec![
            TextualObjects::Uuid,
            TextualObjects::TicketId,
            TextualObjects::TicketMinimal,
            TextualObjects::SourceId,
            TextualObjects::SourceName,
            TextualObjects::SourceIdType,
            TextualObjects::SourcePath,
            TextualObjects::StoreInfo,
            TextualObjects::StoreUrl,
            TextualObjects::Created,
            TextualObjects::Updated,
            TextualObjects::Json,
            TextualObjects::JsonType,
            TextualObjects::JsonUniqueId,
            TextualObjects::Card,
            TextualObjects::CardMap,
            TextualObjects::Context,
            TextualObjects::TicketIndexInContext,
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
