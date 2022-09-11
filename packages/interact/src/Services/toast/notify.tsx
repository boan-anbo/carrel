import {notification} from "antd";
import {showNotification} from "@mantine/notifications";
import {IconCircleCheck} from "@tabler/icons";
import {NotificationProps} from "@mantine/notifications/lib/types";

const autoClose = 3000;
export const notify = (message: string, description: string, type: 'success' | 'error' | 'info' | 'warning' = 'success'
    , onClick?: () => void) => {

    const msg: NotificationProps =
        {
            title: description,
            message: message,
            color: undefined,
            disallowClose: true,
            autoClose,
            icon: <div></div>,
            onClick: onClick,
        }

    switch (type) {
        case "success":
            msg.color = "lime";
            break;
        case "error":
            msg.color = "red";
            break;
        case "info":
            msg.color = "blue";
            break;
        case "warning":
            msg.color = "yellow";
            break;
    }
    showNotification(msg);

}
