import { Badge } from "@chakra-ui/react";
import { v4 } from "uuid";
import { TagGroup } from "../../../../../backend/carrel_server_client/carrel/common/tag/v2/tag_v2_pb";
import { IDataTreeCollection, EDataTreeNodeType } from "../../../../../ui/components/DataTree/i-data-tree-node";

export interface IGetDataTreeNodesFromTagGroupsOptions {
    defaultExpanded?: boolean;
}
export const getDataTreeNodesFromTagGroups = (tagGroups: TagGroup[], opt: IGetDataTreeNodesFromTagGroupsOptions): IDataTreeCollection<TagGroup>[]  =>{
  return tagGroups.map(
    (tagGroup) => {
      return {
        type: EDataTreeNodeType.COLLECTION,
        label: (<Badge>{tagGroup.key ?? ""}</Badge>),
        key: tagGroup.key,
        count: tagGroup.keyCount,
        data: tagGroup,
        subCollectionsCount: 0,
        subItemsCount: 0,
        isOpen: opt.defaultExpanded ?? false,
                subItems: [
          {
            type: EDataTreeNodeType.ITEM,
            label: tagGroup.value ?? "",
            key: v4(),
            data: tagGroup,
          },
        ],
        subCollections: [],
      } as IDataTreeCollection<TagGroup>;
    }
  );
}