import {GraphView} from "../Graph/GraphinTreeView/GraphView";
import {useState} from "react";
import FilterInteractionSingle from "../_ViewComponents/Selectors/FilterInteractionSingle";
import {Interaction} from "../../BackEnd/grl-client/interact_db_client";
import {SelectValue} from "../_ViewComponents/_ControlComponents/Select/SelectValue";
import {Logger, LogSource} from "../../Services/logger";

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

            <FilterInteractionSingle placeholder={'View interaction'} style={{width: '100%'}} onSingleSelectionChange={onInteractionSelected}
            />

            {id > 0 && <GraphView id={id}/>}
        </div>
    )
}

InteractionGraphView.DefaultProps = {
    id: 0
} as InteractionGraphViewProps
