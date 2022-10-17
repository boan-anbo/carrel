import { Box, Container, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { Item } from "react-stately";
import { TCarrelSize } from "../../../props/i-size";
import { DataTreeCollectionItem } from "./components";
import { DataTreeItem } from "./components/DataTreeItem/DataTreeItem";

import {
  DataTreeConfigState,
  EDataTreeNodeType,
  IDataTreeCollection,
  IDataTreeNode,
} from "./i-data-tree-node";

export interface DataTreeProps<T> {
  items: IDataTreeCollection<T>[];
  config: DataTreeConfigState<T>;
  fontSize?: TCarrelSize;
  isRoot?: boolean; // this needs to be set to true if this is the root of the tree
  onSelectionsChange: (selections: IDataTreeNode<T>[]) => void;
}

export function DataTree({
  items: root = [],
  config,
  fontSize,

  isRoot, 
  onSelectionsChange,
  ...props
}: DataTreeProps<any>) {
  if (!config) {
    config = new DataTreeConfigState();
  }

  const orderedItems = useMemo(() => {
    return root.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, []);

  const rootCollectionNodes = useMemo(() => {
    return orderedItems
      .filter((i) => i.type === EDataTreeNodeType.COLLECTION)
      .map((item, index) => {
        return (
          <DataTreeCollectionItem
            collectionIndentOverride={isRoot ? 0 : config.collectionIndent}
            onSelectionsChange={onSelectionsChange}
            key={index}
            config={config}
            item={item}
          />
        );
      });
  }, [root]);

  const rootItemNodes = useMemo(() => {
    return orderedItems
      .filter((i) => i.type === EDataTreeNodeType.ITEM)
      .map((item, index) => {
        return (
          <DataTreeItem
            itemIndentOverride={isRoot ? 10 : config.itemIndent}
            onSelectionsChange={onSelectionsChange}
            key={index}
            config={config}
            item={item}
          />
        );
      });
  }, [root]);

  return (
    <Container w='full' fontSize={fontSize} maxW="full" px="0">
      <VStack pt="1" w="full">
        {rootCollectionNodes}
      </VStack>
      <VStack  py={isRoot ? "3" : "1"} w="full">
        {rootItemNodes}
      </VStack>
    </Container>
  );
}
