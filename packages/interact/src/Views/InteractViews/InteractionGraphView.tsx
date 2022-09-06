import {GraphView} from "../graph/GraphView";
import {useState} from "react";
import FilterInteractionSingle, {SelectValue} from "../../db-gadgets/FilterInteractionSingle";
import {Interaction} from "../../clients/grl-client/interact_db_client";

export interface InteractionGraphViewProps {
    id?: number;
}
export const InteractionGraphView = (
    props: InteractionGraphViewProps
) => {

    const [id, setId] = useState<number>(props.id ?? 0);


    function onInteractionSelected(value: SelectValue<Interaction>) {
        console.log("Interaction selected: " + id);
        setId(value.data.id);
    }

    return (
        <div>

            <FilterInteractionSingle placeholder={'View interaction'} style={{width: '100%'}} onSelect={onInteractionSelected}/>

            {id > 0 && <GraphView id={id}/>}
        </div>
    )
}

InteractionGraphView.DefaultProps = {
    id: 0
} as InteractionGraphViewProps
