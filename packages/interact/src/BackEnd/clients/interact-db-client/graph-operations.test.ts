import {expect, it} from 'vitest'
import {InteractTreeDataFlat, InteractTreeDataFlatChild} from "../grl-client/interact_db_client";
import {convertToTreeGraph} from "./graph-operations";

it('should convert tree sucessfully', () => {

    const rootTreeNode: InteractTreeDataFlat = {
        id: '1',
        children: [
            {
                id: '2',
                parentId: '1',
            } as InteractTreeDataFlatChild,
            {
                id: '3',
                parentId: '1',
            },
            {
                id: '4',
                parentId: '2',
            },
            {
                id: '5',
                parentId: '2',
            },
            {
                id: '6',
                parentId: '3',
            },
            {
                id: '7',
                parentId: '3',
            },
            {
                id: '8',
                parentId: '4',
            },
            {
                id: '9',
                parentId: '3',
            },
            {
                id: '10',
                parentId: '11',
            },
            {
                id: '11',
                parentId: '1',
            }



        ]
    } as InteractTreeDataFlat

    const result = convertToTreeGraph([rootTreeNode]);

    expect(result.id).equals('1');
    expect(result.children?.length).equals(3);

    const firstChildOfRoot = result.children?.find(child => child.id === '2');
    expect(firstChildOfRoot?.children?.length).equals(2);
    const secondChildOfRoot = result.children?.find(child => child.id === '3');
    expect(secondChildOfRoot?.children?.length).equals(3);
    const thirdChildOfRoot = result.children?.find(child => child.id === '11');
    expect(thirdChildOfRoot?.children?.length).equals(1);
    const firstChildOfThirdChildOfRoot = thirdChildOfRoot?.children?.find(child => child.id === '10');


})
