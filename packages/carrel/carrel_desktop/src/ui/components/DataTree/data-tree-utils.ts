import { DataTreeNodeRef, EDataTreeNodeType, IDataTreeCollection, IDataTreeNode } from "./i-data-tree-node";

/**
 * The conversion result of a user provided node tree into a combination of a tree-like structure of references and a flat array of nodes as the source.
 */
export interface DataTreeNodeRefConversionResult {
    refTree: DataTreeNodeRef[];
    nodeStaticFlatTree: IDataTreeNode<File>[];
    /**
     * A flat ref array that contains only the references to the keys. This is used to quickly find a range of keys without needing to iterate over the nodeStaticFlatTree.
     * Typically used to select a range of node keys.
     */
    refKeyFlatArray: string[];
}


export const nodeTreeToRefTree = <T>(nodeTree: IDataTreeNode<T>[]): DataTreeNodeRefConversionResult => {
    const refTree: DataTreeNodeRef[] = [];
    const nodeStaticFlatTree: IDataTreeNode<File>[] = [];
    let globalIndex = 0;

    const nodeToRef = (node: IDataTreeNode<any>): DataTreeNodeRef => {
        const refNode: DataTreeNodeRef = new DataTreeNodeRef();
        refNode.index = globalIndex;
        globalIndex++;
        refNode.type = node.type;
        refNode.key = node.key;
        refNode.order = node.order || 0;


        if (refNode.type === EDataTreeNodeType.COLLECTION) {
            let nodeCollect = node as IDataTreeCollection<T>;
            refNode.subCollections = nodeCollect.subCollections?.map((item) => {
                return nodeToRef(item);
            });
            refNode.subItems = nodeCollect.subItems?.map((item) => {
                return nodeToRef(item);
            });
        }

        nodeStaticFlatTree[refNode.index] = Object.assign({}, node, {
            subCollections: undefined,
            subItems: undefined,
        });
        return refNode;
    };

    const nodeTreeCollections = nodeTree.filter((item) => item.type === EDataTreeNodeType.COLLECTION);
    const nodeTreeItems = nodeTree.filter((item) => item.type === EDataTreeNodeType.ITEM);

    const orderedNodes = [
        ...nodeTreeCollections, // collections first
        ...nodeTreeItems, // then items
    ]
    
    orderedNodes.forEach((node) => {
        const refNode = nodeToRef(node);
        refTree.push(refNode);
    });

    const refFlatArray = nodeStaticFlatTree.map((node) => node.key);
    return {
        refTree,
        nodeStaticFlatTree,
        refKeyFlatArray: refFlatArray,
    };
}


export const selectNodesBetween = <T>(firstIndex: number, secondIndex: number, nodeKeyArray: string[]): string[] => {
    const result: string[] = [];
    const start = Math.min(firstIndex, secondIndex);
    const end = Math.max(firstIndex, secondIndex);
    for (let i = start; i <= end; i++) {
        result.push(nodeKeyArray[i]);
    }
    return result;
}