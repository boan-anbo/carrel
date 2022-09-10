import {Button} from "@mantine/core";
import {IconClearAll, IconCode, IconPlus} from "@tabler/icons";

export function FormButtons(props: { onClearShowJson: () => void, onClickClear: () => void }) {
    return <>
        <Button variant="white" leftIcon={<IconCode/>} onClick={props.onClearShowJson}>
            JSON
        </Button>
        <Button leftIcon={<IconClearAll/>} onClick={props.onClickClear} variant="white" color="pink">
            Clear
        </Button>

        <Button type="submit" leftIcon={<IconPlus/>} variant="white" color="cyan">
            Submit
        </Button>
    </>;
}
