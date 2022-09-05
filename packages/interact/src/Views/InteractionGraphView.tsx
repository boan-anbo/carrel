import {GraphComponent} from "../graph/GraphComponent";
import {useState} from "react";
import FilterInteractions, {SelectValue} from "../db-gadgets/FilterInteractions";

export function InteractionGraphView() {
    const [id, setId] = useState(0);

    function onFilterInteractionsInteractionSelected(interactions: SelectValue[]) {
        console.log(interactions);

    }

    return (
        <div>
            <FilterInteractions

                onInteractionSelected={onFilterInteractionsInteractionSelected}></FilterInteractions>
            {/*    Conditional rendering*/}
            {id > 0 ?
                <GraphComponent id={id}/>
                :
                <div> Select interaction to browse </div>}
        {/*    Else */}
        </div>
    )
}
