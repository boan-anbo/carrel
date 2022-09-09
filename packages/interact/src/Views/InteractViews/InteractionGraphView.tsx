import {GraphView} from "../graph/GraphinTreeView/GraphView";
import {useState} from "react";
import FilterInteractionSingle from "../ViewComponents/FilterControls/FilterInteractionSingle";
import {Interaction} from "../../clients/grl-client/interact_db_client";
import {SelectValue} from "../ViewComponents/FilterControls/SelectValue";
import {Logger, LogSource} from "../../utils/logger";

export interface InteractionGraphViewProps {
    id?: number;
}
export const InteractionGraphView = (
    props: InteractionGraphViewProps
) => {

    const log = new Logger(LogSource.INTERACTION_GRAPH_VIEW);
    const [id, setId] = useState<number>(props.id ?? 0);


    function onInteractionSelected(selection: SelectValue<Interaction>) {
        log.info('onInteractionSelected', 'selected interaction', selection);
        if (selection.value) {
            setId(parseInt(selection.value as string));
        }
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
