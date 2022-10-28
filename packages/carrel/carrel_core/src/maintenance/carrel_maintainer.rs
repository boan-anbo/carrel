pub struct CarrelMaintainer {

}

pub trait CarrelMaintainerTrait {
    // check if tag's to_uuid is correct
    fn check_tag_to_uuids(&self, to_db_path: &str) -> bool;
}


