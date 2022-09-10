import {getApolloClient} from "../../../Services/get-apollo-client";
import {
    GrowGraphTreeDocument,
    GrowGraphTreeQuery,
    InteractTreeDataFlat,
    InteractTreeDataFlatChild
} from "../grl-client/interact_db_client";
import {GraphinTreeData, NodeStyle} from "@antv/graphin";
import {ElementStatus} from "@antv/graphin/lib/typings/type";

export async function getTreeGraph(rootId: number): Promise<GraphinTreeDataWithI> {
    const {data}: { data: GrowGraphTreeQuery } = await getApolloClient().query({
        query: GrowGraphTreeDocument,
        variables: {
            "seed": {
                "branches": {
                    "roots": [rootId] as number[],
                    "hasBranches": [],
                    "asBranches": []
                },
                "option": {}
            }
        },
    });

    const result = data.treeGraph as InteractTreeDataFlat[];
    return convertToTreeGraph(result);
}

export class GraphinTreeDataWithI implements GraphinTreeData {
    interactionId: number = 0;
    children: GraphinTreeData[] = [] ;
    id: string = '';
    status?: Partial<ElementStatus> = {};
    style?: Partial<NodeStyle>;
    x?: number;
    y?: number;
}

export function TreeNodeToGraphinNode(treeGraph: InteractTreeDataFlat): GraphinTreeDataWithI {
    return {
         interactionId: treeGraph.interactionId,
        id: treeGraph.id,
        children: [],
        x: undefined,
        y: undefined,
        style: {
            label: {
                value: treeGraph.label,
            },
        },
        status: undefined
    } as GraphinTreeDataWithI
}

export function TreeNodeChildrenToGraphinNode(treeGraph: InteractTreeDataFlatChild): GraphinTreeDataWithI {
    return {
        interactionId: treeGraph.interactionId,
        id: treeGraph.id,
        children: [],
        x: undefined,
        y: undefined,
        style:  {
            label: {
                value: treeGraph.label,
            },
        },
        status: undefined
    } as GraphinTreeDataWithI
}

export const convertToTreeGraph = (input: InteractTreeDataFlat[]): GraphinTreeDataWithI => {

    const sourceData = input[0] as InteractTreeDataFlat;

    const root: GraphinTreeDataWithI = TreeNodeToGraphinNode(sourceData);

    root.children = sourceData.children?.filter(child => child.parentId === root.id).map((child: InteractTreeDataFlatChild) => TreeNodeChildrenToGraphinNode(child)) ?? [];


    // // recursive function to iterate over all children of children
    const iterateOverChildren = (children: GraphinTreeData[]) => {


        children.forEach((childRoot) => {

            // console.log(child)

            childRoot.children = sourceData.children
                .filter(
                    (child) => child.parentId === childRoot.id)
                .map(
                    (flatChildItem) => TreeNodeChildrenToGraphinNode(flatChildItem)
                );
            iterateOverChildren(childRoot.children);
        })
    }
    //
    iterateOverChildren(root.children);

    return root;

}
