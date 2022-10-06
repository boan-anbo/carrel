use chrono::{DateTime, FixedOffset, Utc};


pub fn parse_datetime_str(datetime_str: &str) -> Result<DateTime<FixedOffset>, String> {
    // use chrono format for sample: D:20220822235323-05'00'
    let datetime = DateTime::parse_from_str(datetime_str ,"%Y%m%d%H%M%S%z").unwrap();
    let iso = datetime.to_rfc3339();
    println!("iso: {}", iso);
    Ok(datetime)
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_datetime_str() {
        let datetime_str = "20220822235323+05:00";
        let datetime = parse_datetime_str(datetime_str).unwrap();
        let iso = datetime.to_rfc3339();
        println!("iso: {}", iso);
    }
}