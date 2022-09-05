import {Injectable} from '@angular/core';
import {ApolloQueryResult} from "@apollo/client/core";
import {GetFullInteractionQuery} from "../../../graphql/generated";
import {Edge, Node} from "@swimlane/ngx-graph";

@Injectable({
  providedIn: 'root'
})
export class GraphViewService {

  constructor() { }
  getNgxGraphDataFromInteractGraph(data: ApolloQueryResult<GetFullInteractionQuery>) {
    const nodes: Node[] = [];
    data.data.interaction.graph?.nodes?.forEach((node) => {
        if (node && nodes.every((n) => n.id !== node.id.toString())) {
            nodes.push({
                id: node.id.toString(),
                label: node.label || node.id.toString(),

            });
        }
    });
    const links: Edge[] = [];
    data.data.interaction.graph?.edges?.forEach((edge, index) => {
        if (edge) {


            links.push({
                id: edge.displayId ?? 'edge_' + index,
                source: edge.sourceId.toString(),
                target: edge.targetId.toString(),
                label: edge.label ?? edge.displayId ?? 'edge_' + index,
            });
        }
    });
    return {nodes, links};
}
}
