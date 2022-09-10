import {EdgeStyle, IUserEdge, IUserNode, NodeStyle} from "@antv/graphin";
import {
    EdgeOfRelation,
    GraphOfRelationAndInteraction,
    NodeOfInteraction
} from "../../BackEnd/clients/grl-client/interact_db_client";


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
            },
            keyshape: {
                lineAppendWidth: 5,
                lineDash: [0, 0],
                opacity: 1,
                fillOpacity: 1
            }
        }
    }
}

export function

extractGraphData(graph: GraphOfRelationAndInteraction): { nodes: InteractGraphNode[]; edges: InteractGraphEdge[] } {
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
    console.log("before disambiguation", {
        nodes: nodes,
        edges: edges
    });
    const disambiguatedNodes = disambiguateGraph(nodes, edges);
    console.log("after disambiguation", disambiguatedNodes);
    return {
        nodes: disambiguatedNodes.nodes,
        edges: disambiguatedNodes.edges
    };
}


export const disambiguateGraph = (graphNodes: InteractGraphNode[], graphEdges: InteractGraphEdge[]): { nodes: InteractGraphNode[], edges: InteractGraphEdge[] } => {
    const disambiguatedNodes: InteractGraphNode[] = [...graphNodes];
    const disambiguatedEdges: InteractGraphEdge[] = [];

    graphEdges.forEach((edge, index) => {
        const source = edge.source;
        const originalEdgeTarget = edge.target;
        const duplicated = disambiguatedEdges.some(edge => edge.source === source && edge.target === originalEdgeTarget);
        if (duplicated) {
            const newEdgeTarget = originalEdgeTarget + '-' + index;
            const duplicateTargetNode = disambiguatedNodes.find(node => node.id === originalEdgeTarget);
            const newNode = Object.assign({}, duplicateTargetNode, {id: newEdgeTarget});
            disambiguatedNodes.push(newNode);
            const newEdge = Object.assign({}, edge, {target: newEdgeTarget});
            disambiguatedEdges.push(newEdge);
        } else {
            disambiguatedEdges.push(edge);
        }
    })

    return {
        nodes: disambiguatedNodes,
        edges: disambiguatedEdges
    }

}
