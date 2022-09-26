use carrel_commons::carrel::firefly_keeper::v1::Fireflies;
use crate::firefly_keeper::firefly_keeper_option::FireflyKeeperOption;

pub struct FireflyKeeper {
    // directory
    pub directory: String,
    pub result:Fireflies

}

// constructor
impl FireflyKeeper {
    pub fn new(directory: &str, opt: FireflyKeeperOption) -> FireflyKeeper {
        FireflyKeeper {
            directory: directory.to_string(),
            result: Fireflies::default()
        }
    }
}


