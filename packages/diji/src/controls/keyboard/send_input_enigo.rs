use enigo::{Enigo, KeyboardControllable};

pub fn send_string(string: String)  {
    let mut enigo = Enigo::new();
    enigo.key_sequence(&string);
    // return string sent
}

#[cfg(test)]
mod test {
    use crate::controls::keyboard::send_input_enigo::send_string;

    #[test]
    fn test_enigo() {
        send_string("|".to_string());
    }
}
