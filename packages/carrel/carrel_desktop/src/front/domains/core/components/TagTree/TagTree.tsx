import { Container } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Tag,
  TagGroup
} from "../../../../../backend/carrel_server_client/carrel/common/tag/v2/tag_v2_pb";
import { carrelApi } from "../../../../../backend/server-api/carrel-api";
import { carrelQueries } from "../../../../../backend/server-api/carrel-queries";
import { ActionBar } from "../../../../../ui/components";
import { Block } from "../../../../../ui/components/Block/Block";
import {
  CollectionExpandMode,
  DataTreeConfig,
  IDataTreeCollection,
  IDataTreeNode
} from "../../../../../ui/components/DataTree/i-data-tree-node";
import { RootState } from "../../../../store/store";

import { useMemo } from "react";
import { BiRefresh } from "react-icons/bi";
import { appDir } from "../../../../../backend/tauri/fs/get_app_data_dir";
import { DataTreeRoot } from "../../../../../ui/components/DataTree/DataTreeRoot";
import { setTagsSelected as setCoreTagsSelected } from "../../../../store/slices/appstate/appstate";
import { getDataTreeNodesFromTagGroups } from "./tag-tree-utils";

export interface TagTreeProps {
  propjectDirectory?: string;
  onSelectionsChange?: (selections: IDataTreeNode<any>[]) => void;
}

export function TagTree({ onSelectionsChange, ...props }: TagTreeProps) {
  const dispatch = useDispatch();
  const workingProject = useSelector(
    (state: RootState) => state.workingProject.workingProject
  );

  const { data, refetch } = carrelQueries.ListAllTagGroups(
    props.propjectDirectory || workingProject?.directory
  );

  const items: IDataTreeCollection<TagGroup>[] = useMemo(() => {
    if (data) {
      return getDataTreeNodesFromTagGroups(data?.tagGroups, {
        defaultExpanded: true,
      });
    } else {
      return [];
    }
  }, [data?.tagGroups]);

  if (!data) {
    return null;
  }

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

  const onCoreTagsSelected = (selections: IDataTreeNode<any>[]) => {
    onSelectionsChange?.(selections);
    const tags: Tag[] = selections.map((s) => {
      if (!s.data) {
        console.warn("no data for the selected tags", s);
      }
      return s.data as Tag;
    });
    const setTags = setCoreTagsSelected(tags);
    dispatch(setTags);
  };

  return (
    <Block
      topActionBar={actionBar}
      topActionBarJustify="center"
      title="Firefly tags"
    >
      <Container  w="full" maxW="full" p="0">
        <DataTreeRoot
          onSelectionsChange={onCoreTagsSelected}
          size="xs"
          treeNodes={items}
          config={
            new DataTreeConfig({
              collectionDefaultExpandMode: CollectionExpandMode.DOUBLE_CLICK,
            })
          }
        />
      </Container>
    </Block>
  );
}
