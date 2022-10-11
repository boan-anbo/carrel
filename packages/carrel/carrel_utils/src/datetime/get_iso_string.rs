pub use chrono::{DateTime, Utc};
// get ISO string


pub fn get_iso_string(date_time: DateTime<Utc>) -> String {
    let iso_string = date_time.to_rfc3339();
    iso_string
}

pub fn get_now_iso_string() -> String {
    get_iso_string(Utc::now())
}

pub fn get_now() -> DateTime<Utc> {
    Utc::now()
}


#[cfg(test)]
mod test {
    use super::*;
    use chrono::prelude::*;

    #[test]
    fn should_get_iso_string() {
        let date_time = Utc::now();
        let iso_string = get_iso_string(date_time);
        println!("{}", iso_string);
        assert_eq!(iso_string.is_empty(), false);
    }
}
