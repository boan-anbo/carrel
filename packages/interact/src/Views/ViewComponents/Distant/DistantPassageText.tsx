import {Passage} from "../../../clients/distant_api";
import {MouseEvent} from "react";
import {useDispatch} from "react-redux";
import {selectInputText} from "../../../features/app-state/appStateSlice";

export function DistantPassageText(props: { passage: Passage; onTextSelected?: (text: string | null) => void }) {
    // dispatch the selected text to the store
    const dispatchSelectedText = useDispatch();

    function onDivMouseUp(event: MouseEvent<HTMLDivElement>) {
        // get window selection
        const selection = window.getSelection();
        if (selection) {
            const selectedText = selection.toString();
            // dispatch the selected text to the store
            dispatchSelectedText(selectInputText(selectedText));
            props.onTextSelected?.(selectedText);
        } else {
            dispatchSelectedText(selectInputText(null));
            props.onTextSelected?.(null);

        }

    }

    return <div

        className="p-2 rounded bg-gray-50 drop-shadow" dangerouslySetInnerHTML={{__html: props.passage.text}}
        onMouseUp={onDivMouseUp}>

    </div>;
}
