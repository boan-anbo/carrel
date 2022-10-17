import { Badge, Container } from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  DataTreeCollection,
  DataTreeConfigState,
  IDataTreeItem,
} from "../../i-data-tree-node";

import styles from "./DataTreeItem.module.scss";

export interface DataTreeItemProps<T> {
  item: IDataTreeItem<T>;
  config: DataTreeConfigState<T>;
}

export function DataTreeItem({ item, config }: DataTreeItemProps<any>) {
  const isSelected = useMemo(() => {
    return config.isSelected(item.key);
  }, [config.selectedKeys]);

  return (
    <Container
      py="0.5"
      w="full"
      cursor="pointer"
      _hover={{
        background: "primaryBgHover",
      }}
      bg={isSelected ? "primaryBg" : "transparent"}
      onClick={(e) => {
        console.log(config.selectedKeys)
        if (item?.onSingleClick) {
          item?.onSingleClick(e, item.key, item.data);
        }
        config.toggleSelection(item?.key);
        // e.stopPropagation();
      }}
      maxW="full"
      pl={config.itemIndent}
      pr="0"
    >
      <Badge colorScheme="orange">{item?.label}</Badge>
    </Container>
  );
}
