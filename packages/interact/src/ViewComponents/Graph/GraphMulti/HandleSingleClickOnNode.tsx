import {Logger, LogSource} from "../../../Services/logger";
import {IG6GraphEvent} from "@antv/graphin";
import {INode, NodeConfig} from "@antv/g6";
import {useDispatch, useSelector} from "react-redux";
import {selectInteraction} from "../../../States/features/app-state/appStateSlice";
import {getFullInteractionById} from "../../../BackEnd/clients/interact-db-client/filter-operations";

const log = new Logger(LogSource.handleSingleClickOnNode);

export function handleSingleClickOnNode(props: {
    onLoadInteraction: (interactionId: number) => Promise<void> ,
    onSelectInteraction: (interactionId: number) => void
}) {


    return async (evt: IG6GraphEvent) => {
        const node = evt.item as INode;
        log.debug(`Clicked on node ${node}`, 'clicked node', node);
        const model = node.getModel() as NodeConfig;
        log.debug(`Clicked on node ${model.id}`, 'clicked model', model);

        try {
            // @ts-ignore
            const number = parseInt(model.interactionId, 10);
            // check is number is number
            if (isNaN(number)) {
                log.error(`Clicked on node ${model.id} with interactionId ${model.interactionId} which is not a number`, 'clicked model', model);
            } else {
                props.onLoadInteraction(number);
                props.onSelectInteraction(number);
            }
        } catch (e) {
            log.error(`Clicked on node ${model.id} with interactionId ${model.interactionId} which is not a number`, 'clicked model', model);
        }
    };
}
