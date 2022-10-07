use std::fs;
fn main() {

    // before the compilation, copy two files to the output directory
    // First: src/pdfium/pdfium.dll
    // Second: src/pdfium/libpdfium.dylib
    fs::copy("src/pdfium/pdfium.dll", "target/debug/pdfium.dll").unwrap();
    fs::copy("src/pdfium/libpdfium.dylib", "target/debug/libpdfium.dylib").unwrap();
}