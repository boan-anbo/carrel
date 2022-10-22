import { Badge, Container } from "@chakra-ui/react";
import React, { MouseEventHandler, useMemo } from "react";
import {
  DataTreeCollection,
  DataTreeConfigState,
  IDataTreeItem,
  IDataTreeNode,
} from "../../i-data-tree-node";

import styles from "./DataTreeItem.module.scss";

export interface DataTreeItemProps<T> {
  item: IDataTreeItem<T>;
  config: DataTreeConfigState<T>;
  itemIndentOverride?: number;
  onSelectionsChange: (selections: IDataTreeNode<T>[]) => void;
}

export function DataTreeItem({
  item,
  config,
  onSelectionsChange,
  itemIndentOverride,
}: DataTreeItemProps<any>) {
  const isSelected = useMemo(() => {
    return config.isSelected(item);
  }, [config.selectedItems]);

  const onClickItem = (e: MouseEvent<Element, MouseEvent>) => {
    config.select(item);
    onSelectionsChange(config.selectedItems);
  };

  return (
    <Container
      py="0.5"
      w="full"
      cursor="pointer"
      _hover={{
        background: "primaryBgHover",
      }}
      bg={isSelected ? "primaryBg" : "transparent"}
      onClick={onClickItem}
      maxW="full"
      pl={itemIndentOverride ?? config.itemIndent}
      pr="0"
    >
      <Badge colorScheme="orange">{item?.label}</Badge>
    </Container>
  );
}
