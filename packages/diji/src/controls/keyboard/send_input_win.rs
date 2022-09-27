//! Send strings as keys to Windows

use enigo::{Enigo, KeyboardControllable};
use windows::Win32::Foundation::CHAR;
use windows::Win32::UI::Input::KeyboardAndMouse::*;
use windows::Win32::UI::WindowsAndMessaging::GetMessageExtraInfo;
use crate::CBSIZE;


fn send_keys(virutal_keys: &[VIRTUAL_KEY]) -> i32 {

    // send 0 if failed and 1 if success, try and catch error
    unsafe {
        let extra_info = GetMessageExtraInfo();
        let extra_info = extra_info.0.unsigned_abs();

        let mut pinputs = Vec::new();
        for virutal_key in virutal_keys {
            // push a shift key down
            pinputs.push(INPUT {
                r#type: INPUT_TYPE(1),
                Anonymous: INPUT_0 {
                    ki: KEYBDINPUT {
                        wVk: VK_LSHIFT,
                        wScan: 0,
                        dwFlags: KEYEVENTF_SCANCODE,
                        time: 0,
                        dwExtraInfo: extra_info,
                    },
                },
            }
            );

            pinputs.push(INPUT {
                r#type: INPUT_TYPE(1),
                Anonymous: INPUT_0 {
                    ki: KEYBDINPUT {
                        wVk: *virutal_key,
                        wScan: 0,
                        dwFlags: KEYEVENTF_UNICODE, // the kind of controls.keyboard event
                        time: 0, // supposedly time interval?
                        dwExtraInfo: extra_info,
                    }
                },
            });

            // push a shift key up
            pinputs.push(INPUT {
                r#type: INPUT_TYPE(1),
                Anonymous: INPUT_0 {
                    ki: KEYBDINPUT {
                        wVk: VK_LSHIFT,
                        wScan: 0,
                        dwFlags: KEYEVENTF_KEYUP,
                        time: 0,
                        dwExtraInfo: extra_info,
                    },
                },
            }
            );
        }
        // loop over borrows pinputs and print the type of each
        for pinput in &pinputs {
            println!("pinput type: {:?}", pinput.Anonymous.ki.dwFlags);
        }

        SendInput(&pinputs, CBSIZE); // CBSIZE is a static variable, indicating the memory size.
    }
    1
}

/// send_string as virutal keys and send them, currently this needs to be fixed because it doesn't account for Shifted characters.
/// I'll later revise this to study it.
pub fn send_string(string: &str) -> i32 {
    // create new slice for the chars
    let mut virutal_keys = Vec::new();
    unsafe {
        for c in string.chars() {
            let virutal_key = convert_char_to_virtual_key(c);
            virutal_keys.push(virutal_key);
        }
        println!("string: {}", string);
        send_keys(virutal_keys.as_slice())
    }
    // print the strings
}

fn convert_char_to_virtual_key(c: char) -> VIRTUAL_KEY {
    unsafe {
        // convert char to CHAR::from(c)
        let virutal_key = VIRTUAL_KEY(VkKeyScanW(c as u16) as u16);
        virutal_key
    }
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_input() {
        send_keys(&[VK_B, VK_O, VK_A, VK_N]);
    }

    #[test]
    fn test_string() {
        send_string("Hello, Little Baby");
    }

    #[test]
    fn test_unicode() {
        send_string("你好");
    }

    #[test]
    fn test_vertical_bar() {
        send_string("|");
    }

    #[test]
    fn test_convert_shift_characters() {
        let virtual_key = convert_char_to_virtual_key('a');
        assert_eq!(virtual_key, VK_A);
        let virtual_key = convert_char_to_virtual_key('A');
        assert_eq!(virtual_key, VK_A);
    }


}
