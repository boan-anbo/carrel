import {notification} from "antd";
import {showNotification} from "@mantine/notifications";
import {IconCircleCheck, IconError404, IconExclamationMark, IconInfoCircle} from "@tabler/icons";
import {NotificationProps} from "@mantine/notifications/lib/types";

const autoClose = 2000;
export const notify = (message: string, description: string, type: 'success' | 'error' | 'info' | 'warning' = 'success'
    , opt?: Partial<NotificationProps>) => {

    const msg: NotificationProps =
        Object.assign(
            {
                title: description,
                message: message,
                color: undefined,
                disallowClose: false,
                autoClose,
            },
            opt);

    switch (type) {
        case "success":
            msg.color = "lime";
            msg.icon = <IconCircleCheck/>;
            break;
        case "error":
            msg.color = "red";
            msg.icon = <IconError404/>;
            break;
        case "info":
            msg.color = "blue";
            msg.icon = <IconInfoCircle/>;
            break;
        case "warning":
            msg.color = "yellow";
            msg.icon = <IconExclamationMark/>;
            break;
    }
    showNotification(msg);

}
