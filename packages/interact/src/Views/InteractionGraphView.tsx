import {GraphComponent} from "../graph/GraphComponent";
import {useState} from "react";
import FilterInteractionSingle, {SelectValue} from "../db-gadgets/FilterInteractionSingle";
import {Interaction} from "../grl-client/interact_db_client";

export const InteractionGraphView = () => {
    const [id, setId] = useState(0);


    function onInteractionSelected(value: SelectValue<Interaction>) {
        setId(value.data.id);
    }

    return (
        <div>

            <FilterInteractionSingle placeholder={'View interaction'} style={{width: '100%'}} onSelect={onInteractionSelected}/>

            {id > 0 && <GraphComponent id={id}/>}
        </div>
    )
}
