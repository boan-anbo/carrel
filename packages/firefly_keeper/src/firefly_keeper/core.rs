use carrel_commons::carrel::firefly_keeper::v1::Fireflies;

pub struct FireflyKeeper {
    // directory
    pub directory: String,
    pub result:Fireflies

}

// constructor
impl FireflyKeeper {
    pub fn new(directory: &str) -> FireflyKeeper {
        FireflyKeeper {
            directory: directory.to_string(),
            result: Fireflies::default()
        }
    }
}


