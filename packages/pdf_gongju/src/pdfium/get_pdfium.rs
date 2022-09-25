use pdfium_render::pdfium::Pdfium;

pub fn get_pdfium() -> Pdfium {
    let pdfium = Pdfium::new(
        Pdfium::bind_to_library(
            Pdfium::pdfium_platform_library_name_at_path("./src/pdfium/")
        )
            .or_else(|_| Pdfium::bind_to_system_library()).unwrap());
    pdfium
}
