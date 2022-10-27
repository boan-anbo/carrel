import { Container } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TagGroup } from "../../../../../backend/carrel_server_client/carrel/common/tag/v2/tag_v2_pb";
import { carrelApi } from "../../../../../backend/server-api/carrel-api";
import { carrelQueries } from "../../../../../backend/server-api/carrel-queries";
import { ActionBar } from "../../../../../ui/components";
import { Block } from "../../../../../ui/components/Block/Block";
import {
  DataTreeConfig, IDataTreeCollection,
  IDataTreeNode
} from "../../../../../ui/components/DataTree/i-data-tree-node";
import { RootState } from "../../../../store/store";

import { useMemo } from "react";
import { BiRefresh } from "react-icons/bi";
import { appDir } from "../../../../../backend/tauri/fs/get_app_data_dir";
import { DataTreeRoot } from "../../../../../ui/components/DataTree/DataTreeRoot";
import { getDataTreeNodesFromTagGroups } from "./tag-tree-utils";

export interface TagTreeProps {
  propjectDirectory?: string;
  onSelectionsChange?: (selections: IDataTreeNode<any>[]) => void;
}

export function TagTree({ onSelectionsChange, ...props }: TagTreeProps) {
  const workingProject = useSelector(
    (state: RootState) => state.workingProject.workingProject
  );

  const { data, refetch } = carrelQueries.ListAllTagGroups(
    props.propjectDirectory || workingProject?.directory
  );

  if (!data) {
    return null;
  }

    const items: IDataTreeCollection<TagGroup>[] = useMemo(() => getDataTreeNodesFromTagGroups(
    data.tagGroups,
    {
      defaultExpanded: true
    }
  ), [
    data.tagGroups
  ]) 

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
                appDirectory,
              });
            }
          },
        },
        {
          icon: <BiRefresh />,
          tooltip: "Refresh",
          label: "Refresh",
          command: async () => {
            refetch();
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
        <DataTreeRoot
          size="xs"
          treeNodes={items}
          config={new DataTreeConfig()}
        />
      </Container>
    </Block>
  );
}
