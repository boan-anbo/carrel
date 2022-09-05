import {EdgeStyle, IUserEdge, IUserNode, NodeStyle} from "@antv/graphin";
import {ElementStatus, RestEdge} from "@antv/graphin/es/typings/type";
import {EdgeOfRelation, GraphOfRelationAndInteraction, NodeOfInteraction} from "../grl-client/interact_db_client";


export class InteractGraphNode implements IUserNode {

    [key: string]: any;

    id: string;
    style: NodeStyle;

    constructor(node: NodeOfInteraction) {
        this.id = node.id.toString();
        this.style = {
            badges: [],
            halo: {},
            icon: {},
            keyshape: {},
            label: {
                value: node.label ?? "No Label",
            }
        }
    }


}

export class InteractGraphEdge implements IUserEdge {
    [key: string]: any;

    source: string;
    target: string;
    style: Partial<EdgeStyle>


    constructor(edge: EdgeOfRelation) {
        this.source = edge.sourceId.toString();
        this.target = edge.targetId.toString();
        this.style = {
            label: {
                value: edge.label ?? "No Label",
            }
        }

    }


}

export function extractGraphData(graph: GraphOfRelationAndInteraction): { nodes: InteractGraphNode[]; edges: InteractGraphEdge[] } {
    const nodes: InteractGraphNode[] = []
    const edges: InteractGraphEdge[] = []
    graph.nodes?.filter(node => node != null).forEach(node => {
            if (node != null) {
                const convertedNode = new InteractGraphNode(node);
                nodes.push(
                    convertedNode
                )
            }
        }
    )

    graph.edges?.filter(edge => edge != null).forEach(
        edge => {
            if (edge != null) {
                const convertedEdge = new InteractGraphEdge(edge);
                edges.push(
                    convertedEdge
                )
            }
        }
    )
    console.log("ready to return", {nodes, edges});
    return {nodes, edges};
}
