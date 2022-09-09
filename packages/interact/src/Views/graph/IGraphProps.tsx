import {GraphinData, IUserEdge, IUserNode} from "@antv/graphin";

export interface IGraphProps extends GraphinData {
    nodes: IUserNode[];
    edges: IUserEdge[];
}
