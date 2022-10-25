import { assert, describe, expect, it } from 'vitest'
import { EDataTreeNodeType, IDataTreeCollection, IDataTreeNode } from './i-data-tree-node'
import { nodeTreeToRefTree, selectNodesBetween } from './data-tree-utils'

const nodeTreeSample: IDataTreeNode<File>[] = [
    {
        key: 'key7',
        type: EDataTreeNodeType.ITEM,
        label: 'root-level-item',
    },
    {
        key: 'key1',
        type: EDataTreeNodeType.COLLECTION,
        label: 'tree-collection-I',
        subCollections: [
            {
                key: 'key2',
                type: EDataTreeNodeType.COLLECTION,
                label: 'tree-collection-I-I',
                subItems: [
                    {
                        key: 'key3',
                        type: EDataTreeNodeType.ITEM,
                        label: 'tree-item-I-I-1',
                    }
                ]
            } as IDataTreeCollection<File>,
        ],
        subItems: [
            {
                key: 'key4',
                type: EDataTreeNodeType.ITEM,
                label: 'tree-item-I-1',
            }
        ]
    },
    {
        key: 'key5',
        type: EDataTreeNodeType.COLLECTION,
        label: 'tree-collection-II',
        subItems: [
            {
                key: 'key6',
                type: EDataTreeNodeType.ITEM,
                label: 'tree-item-II-1',
            }
        ]
    }
]


describe('Data tree utils work', () => {
    it('should convert node tree to ref tree', () => {

        const dataTreeConverted = nodeTreeToRefTree(nodeTreeSample);

        expect(dataTreeConverted.refTree.length).toBe(3);

        expect(dataTreeConverted.nodeStaticFlatTree.length).toBe(7);

        console.log(JSON.stringify(dataTreeConverted.refTree, null, 2));
        console.log(JSON.stringify(dataTreeConverted.nodeStaticFlatTree, null, 2));
        console.log(JSON.stringify(dataTreeConverted.refKeyFlatArray, null, 2));

    })

    it('should select nodes between indices', () => {
        const dataTreeConverted = nodeTreeToRefTree(nodeTreeSample);

        const selectedNodes = selectNodesBetween(4, 2, dataTreeConverted.refKeyFlatArray);

        expect(selectedNodes.length).toBe(3);
    }
    )

    it('root level items should be indexed after sub items', () => {
        const dataTreeConverted = nodeTreeToRefTree(nodeTreeSample);

        const refFlatArray = dataTreeConverted.refKeyFlatArray;

        const lastItemKey = refFlatArray[refFlatArray.length - 1];

        expect(lastItemKey).toBe('key7');
    })


}) 