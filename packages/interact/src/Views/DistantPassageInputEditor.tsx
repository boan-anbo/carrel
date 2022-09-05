import {Passage} from "../clients/distant_api";
import {DistantDocumentView} from "./ViewComponents/Distant/DistantDocumentItem";
import {useSelector} from "react-redux";

export interface DistantPassageInputEditorProps {
    passage: Passage;
    index: number;
}

export const DistantPassageInputEditor = (props: DistantPassageInputEditorProps) => {
    return (
        <div>

            {props.passage && <DistantDocumentView passage={props.passage} index={0}/>}
            {!props.passage && <div>Nothing selected</div>}

        </div>
    )
}
