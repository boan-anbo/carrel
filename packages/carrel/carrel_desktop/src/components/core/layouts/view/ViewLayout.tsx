import {Button} from "@blueprintjs/core";

export function ViewLayout(props: {
    windowId: string,
    onWindowClose: (windowId: string) => void
}) {

    return <>
        New Window: {props.windowId}
        <Button
            text={'Close'}
            onClick={() => {
                props.onWindowClose(props.windowId);
            }}
        />
    </>;
}
