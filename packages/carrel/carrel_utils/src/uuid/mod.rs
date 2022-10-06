use uuid::Error;
pub use uuid::Uuid;

pub fn new_v4() -> Uuid {
    Uuid::new_v4()
}

pub fn parse_str(s: &str) -> Result<Uuid, Error> {
    Uuid::parse_str(s)
}

pub fn parse_strs(s: &Vec<String>) -> Result<Vec<Uuid>, Error> {
    let mut uuids = Vec::new();
    for i in s {
        uuids.push(Uuid::parse_str(i)?);
    }
    Ok(uuids)
}
