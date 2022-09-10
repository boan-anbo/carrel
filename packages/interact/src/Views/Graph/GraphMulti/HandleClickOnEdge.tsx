import {IG6GraphEvent} from "@antv/graphin";
import {INode, NodeConfig} from "@antv/g6";
import {Logger, LogSource} from "../../../Services/logger";
import {ApisType} from "@antv/graphin/lib/apis/types";

const log = new Logger(LogSource.handleClickOnEdge);
export function handleSingleClickOnEdge(props: { onLoadInteraction: (interactionId: number) => Promise<void> }, apis: ApisType) {
    const handleDoubleClick = (evt: IG6GraphEvent) => {
        const node = evt.item as INode;
        log.info(`Double clicked on node ${node}`, 'double clicked node', node);
        const model = node.getModel() as NodeConfig;
        log.info(`Double clicked on node ${model.id}`, 'double clicked model', model);

        const {source, target} = model;
        const edgeId = `${source}-${target}`;

        try {
            // @ts-ignore
            const number = parseInt(model.interactionId, 10);
            // check is number is number
            if (isNaN(number)) {
                log.error(`Double on node ${model.id} with interactionId ${model.interactionId} which is not a number`, 'clicked model', model);
            } else {
                props.onLoadInteraction(number);
            }
        } catch (e) {
            log.error(`Clicked on node ${model.id} with interactionId ${model.interactionId} which is not a number`, 'clicked model', model);
        }
    }
    return handleDoubleClick;
}
