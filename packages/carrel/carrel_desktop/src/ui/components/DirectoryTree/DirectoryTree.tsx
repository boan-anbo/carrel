import { FileTextIcon } from "@radix-ui/react-icons";
import React, { useMemo } from "react";
import { FaDatabase, FaRegFilePdf } from "react-icons/fa";
import { Directory } from "../../../backend/carrel_server_client/carrel/common/directory/v1/directory_v1_pb";
import { File } from "../../../backend/carrel_server_client/carrel/common/file/v1/file_v1_pb";
import { fsManagerQueries } from "../../../backend/server-api/fs-manager-queries";
import { DataTreeRoot } from "../DataTree/DataTreeRoot";
import {
  DataTreeConfigState,
  EDataTreeNodeType,
  IDataTreeNode,
} from "../DataTree/i-data-tree-node";
import {
  DirectoryItemIconType,
  getDataTreeFromDirectory,
} from "./directory-to-data-tree-collection";

export interface DirectoryTreeProps {
  root_directory: string | undefined;
  // if provided, only files that match the filter will be shown
  fileMasks?: RegExp[];
  onFilesSelected?: (selected: File[]) => void;
}

export function DirectoryTree({
  root_directory,
  fileMasks,
  onFilesSelected,
  ...props
}: DirectoryTreeProps) {
  const { data } = fsManagerQueries.GetDirectoryTree(root_directory);

  const dataTreeCollection: IDataTreeNode<File>[] = useMemo(() => {
    if (!data?.directoryTree) {
      return [];
    }

    // provide a icon map to specify which icon to use for particular file types
    const iconMap: (
      node: IDataTreeNode<File> | IDataTreeNode<Directory>,
      itemType: EDataTreeNodeType,
      iconType: DirectoryItemIconType
    ) => React.ReactNode = (node, itemType, iconType) => {
      if (itemType === EDataTreeNodeType.ITEM) {
        const file = node.data as File;
        if (file.fileName.endsWith(".pdf")) {
          return <FaRegFilePdf />;
        } else if (
          file.fileName.endsWith(".txt") ||
          file.fileName.endsWith(".md")
        ) {
          return <FileTextIcon />;
        } else if (file.fileName.endsWith(".db")) {
          return <FaDatabase />;
        }
      }

      return undefined;
    };
    const result = getDataTreeFromDirectory(data.directoryTree, {
      getItemIcon: iconMap,
      fileMasks,
    });

    result.isOpen = true;
    return [...result.subItems, ...result.subCollections]; // take out the content to hide the top level directory
  }, [data, fileMasks]);

  const onSelectionChange = (selectedFiles: IDataTreeNode<any>[]) => {
    const files = selectedFiles
      .filter((node) => node.type === EDataTreeNodeType.ITEM)
      .map((node) => node.data as File);

    if (onFilesSelected) {
      onFilesSelected(files);
    }
  };

  return (
    <DataTreeRoot
      size="xs"
      treeNodes={dataTreeCollection}
      onSelectionsChange={onSelectionChange}
      config={
        new DataTreeConfigState({
          enableFilter: true,
          useBuiltInFilter: true,
          selectionMode: "single",
        })
      }
    />
  );
}
