import {Passage} from "../../BackEnd/clients/distant_api";
import {DistantDocumentView} from "../Distant/DistantDocumentItem";

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
