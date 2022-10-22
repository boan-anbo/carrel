import {toast, ToastOptions} from "react-toastify";

class Notify {

    success(message: string, options?: ToastOptions<{}> | undefined) {
        toast.success(message, options)
    }

    error(message: string, options?: ToastOptions<{}> | undefined) {
        toast.error(message, options)
    }
}

export const notify = new Notify()
