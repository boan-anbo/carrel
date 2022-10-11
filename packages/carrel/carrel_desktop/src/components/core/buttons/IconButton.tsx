import {Button} from "@blueprintjs/core";

export function IconButton(props: { icon: JSX.Element, onClick: () => void }) {
    return <Button minimal icon={props.icon} onClick={props.onClick}>

    </Button>;
}
