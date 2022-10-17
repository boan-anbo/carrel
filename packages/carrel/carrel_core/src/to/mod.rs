use to_core::error::ToErrors;

pub struct To {}

#[async_trait::async_trait]
pub trait ToTrait {
    async fn initialize_db(&self) -> Result<String, ToErrors>;
}

#[async_trait::async_trait]
impl ToTrait for To {
    async fn initialize_db(&self) -> Result<String, ToErrors> {
        todo!()
    }
}

