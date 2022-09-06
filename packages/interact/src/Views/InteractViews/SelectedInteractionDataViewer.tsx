import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {InteractionGraphView} from "./InteractionGraphView";
import {Interaction} from "../../clients/grl-client/interact_db_client";
import {useEffect, useState} from "react";
import {getFullInteractionById} from "../../clients/interact-db-client/filter-operations";

export const SelectedInteractionDataViewer = () => {
    const [fullInteraction, setFullInteraction] = useState<Interaction | null>(null);
    // get selected interaction
    const selectedInteraction = useSelector((state: RootState) => state.appstate.selectedInteraction);


    // const loadFullInteraction = async () => {
    //     console.log("Loading full interaction");
    //     const fullInteraction = await getFullInteractionById(selectedInteraction?.id ?? 0);
    //     console.log(fullInteraction);
    //     setFullInteraction(fullInteraction);
    // }


    return (
        <div onClick={e => e.stopPropagation()}>
            {/* Reload button */}
            {fullInteraction && <div
                onClick={e => e.stopPropagation()}
            >
                <h2>Interaction data</h2>
                {/*    User html table */}
                <table className={'text-xs'}>
                    <tr>
                        <th>Id</th>
                        <th>Label</th>
                        <th>Description</th>
                        <th>Content</th>
                    </tr>
                    <tr>
                        <td>{selectedInteraction?.id}</td>
                        <td>{selectedInteraction?.label}</td>
                        <td>{selectedInteraction?.description}</td>
                        <td>{selectedInteraction?.content}</td
                        >
                    </tr>
                </table>


            </div>}
            {!selectedInteraction && <div>No interaction selected</div>}
        </div>
    )
}
