import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { FaSync } from "react-icons/fa";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { TagGroup } from "../../../../../backend/carrel_server_client/carrel/common/tag/v2/tag_v2_pb";
import { carrelApi } from "../../../../../backend/server-api/carrel-api";
import { carrelQueries } from "../../../../../backend/server-api/carrel-queries";
import { RootState } from "../../../../store/store";
import { ActionBar } from "../../../../../ui/components";
import { Block } from "../../../../../ui/components/Block/Block";
import { DataTree } from "../../../../../ui/components/DataTree/DataTree";
import {
  DataTreeConfigState,
  EDataTreeNodeType,
  IDataTreeCollection,
  IDataTreeNode,
} from "../../../../../ui/components/DataTree/i-data-tree-node";

import styles from "./TagTree.module.scss";
import {appDir} from "../../../../../backend/tauri/fs/get_app_data_dir";

export interface TagTreeProps {
  propjectDirectory?: string;
  onSelectionsChange?: (selections: IDataTreeNode<any>[]) => void;
}

export function TagTree({ onSelectionsChange, ...props }: TagTreeProps) {
  const workingProject = useSelector(
    (state: RootState) => state.workingProject.workingProject
  );

  const { data } = carrelQueries.ListAllTagGroups(
    props.propjectDirectory || workingProject?.directory
  );
  if (!data) {
    return null;
  }

  const items: IDataTreeCollection<TagGroup>[] = data.tagGroups.map(
    (tagGroup) => {
      return {
        type: EDataTreeNodeType.COLLECTION,
        label: tagGroup.key,
        key: tagGroup.key,
        count: tagGroup.keyCount,
        data: tagGroup,
        subCollectionIds: [],
        subItemIds: [],
        subItems: [
          {
            type: EDataTreeNodeType.ITEM,
            label: tagGroup.value,
            key: v4(),
            data: tagGroup,
          },
        ],
        subCollections: [],
      };
    }
  );

  const actionBar = (
    <ActionBar
      items={[
        {
          icon: <FaSync />,
          tooltip: "Sync all archives",
          label: "Sync project",
          command: async () => {
            const appDirectory = await appDir();
            console.log("appDirectory", appDirectory);
            if (workingProject?.directory) {
              const result = await carrelApi.syncProjectArchives({
                projectDirectory: workingProject?.directory,
                // appDirectory:
                appDirectory
              });
            }
          },
        },
      ]}
    />
  );

  return (
    <Block
      topActionBar={actionBar}
      topActionBarJustify="center"
      title="Firefly tags"
    >
      <Container w="full" maxW="full" px="0">
        <Box>Archive files</Box>
        <DataTree
          isRoot
          size="xs"
          onSelectNode={onSelectionsChange || (() => {})}
          config={new DataTreeConfigState({})}
          items={items}
        />
      </Container>
    </Block>
  );
}
