use chrono::DateTime;


pub fn parse_datetime_str(datetime_str: &str) -> String {
    // use chrono format for sample: D:20220822235323-05'00'
    // if datetime_str starts with D:, then remove it
    let datetime_str = if datetime_str.starts_with("D:") {
        &datetime_str[2..]
    } else {
        datetime_str
    };

    // replace - with +
    let datetime_str = datetime_str.replace("-", "+");
    // replace ' with :
    let datetime_str = datetime_str.replace("'", ":");
    // remove last :
    let datetime_str = datetime_str.trim_end_matches(':');

    let datetime = DateTime::parse_from_str(datetime_str ,"%Y%m%d%H%M%S%z");
    // if error, return empty string
    // if success, return datetime iso string
    match datetime {
        Ok(datetime) => datetime.to_rfc3339(),
        Err(_) => "".to_string(),
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_datetime_str() {
        let datetime_str = "D:20220822235323-05'00'";
        let datetime = parse_datetime_str(datetime_str);
        assert_eq!(datetime, "2022-08-22T23:53:23+05:00");

        let invalid_datetime_str = "D:2020823-05'00";
        let datetime = parse_datetime_str(invalid_datetime_str);
        assert_eq!(datetime, "");
    }
}