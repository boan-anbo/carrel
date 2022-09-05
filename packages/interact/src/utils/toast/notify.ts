import {notification} from "antd";

export const notify = (message: string, description: string, type: 'success' | 'error' | 'info' | 'warning' = 'success'
    , onClick?: () => void) => {
    notification.open({
        message,
        description,
        type,
        onClick,
    });
}
