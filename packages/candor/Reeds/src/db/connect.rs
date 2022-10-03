use std::env;
use diesel::{Connection, SqliteConnection};
use dotenvy::dotenv;

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}


#[cfg(test)]
mod tests {
    use super::*;
    use diesel::prelude::*;

    #[test]
    fn test_establish_connection() {
        let connection = establish_connection();
        // make sure connection works

        // test connection


        assert_eq!(1, 1);
    }
}
