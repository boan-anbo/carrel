use crate::core::metadata::Metadata;

pub struct Timeline {
    pub metadata: Metadata,



}

// impl default
impl Default for Timeline {
    fn default() -> Self {
        Self {
            metadata: Metadata::default(),
        }
    }
}


#[cfg(test)]
mod tests {
    use crate::core::historia::Historia;
    use crate::core::historia_opt::HistoriaOptions;


    #[test]
    fn test_default() {
        let test_case = "1984年1月20日第一件事，2020年12月第二件事";

        let historia = Historia::new(test_case, HistoriaOptions::default());

        let result = historia.process();

    }
}
