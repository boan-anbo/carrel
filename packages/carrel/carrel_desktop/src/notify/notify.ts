import {toast, ToastOptions} from "react-toastify";

class Notify {

    success(message: string, options?: ToastOptions<{}> | undefined) {
        toast.success(message, options)
    }
}

export const notify = new Notify()
