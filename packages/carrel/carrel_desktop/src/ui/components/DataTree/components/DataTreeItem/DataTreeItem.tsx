import { Box, Container, Flex, Highlight } from "@chakra-ui/react";
import { size } from "lodash";
import { MouseEventHandler, useMemo } from "react";
import { NodeMatch } from "../../filter-item";
import {
  DataTreeConfig,
  DataTreeNodeRef,
  IDataTreeItem,
  IDataTreeNode
} from "../../i-data-tree-node";

export interface DataTreeItemProps<T> {
  nodeRef: DataTreeNodeRef;
  loadNode: (ref: DataTreeNodeRef) => IDataTreeNode<T>;
  config: DataTreeConfig<T>;
  itemIndentOverride?: number;
  onSelectTreeItem: (e: any, selections: DataTreeNodeRef) => void;
  /**
   * The keys of the selected items.
   */
  selectedItems: string[];
  filterResults: NodeMatch[] | undefined;
  isRoot?: boolean;
}

export function DataTreeItem({
  nodeRef,
  loadNode,
  config,
  onSelectTreeItem,
  itemIndentOverride,
  filterResults,
  selectedItems,
  isRoot,
}: DataTreeItemProps<any>) {
  const item: IDataTreeItem<any> = useMemo(() => {
    return loadNode(nodeRef) as IDataTreeItem<any>;
  }, [nodeRef, loadNode]);

  const isSelected = useMemo(() => {
    return selectedItems.some((i) => i === item.key);
  }, [selectedItems]);

  const openIcon = useMemo(() => {
    return item.iconActive ?? config.itemDefaultIconOpen ?? null;
  }, [item.iconActive]);

  const itemMatch: NodeMatch | undefined = useMemo(() => {
    return filterResults?.find((i) => i.key === item.key);
  }, [filterResults]);

  const showHighlight = useMemo(() => {
    return config.enableFilter && itemMatch && itemMatch.substring?.length > 0;
  }, [config.enableFilter, itemMatch]);

  // check if we should filter this item
  if (config.enableFilter && filterResults) {
    if (!itemMatch) {
      return null;
    }
  }

  // hide the data tree item if it has not label
  if (!item.label || item.plainLabel?.length === 0) {
    return null;
  }

  const label = (showHighlight) ? (
         <Highlight  query={[itemMatch?.substring ?? ""]} styles={{ bg: "yellow.200", fontWeight: "semibold" }} >
              {item.plainLabel ?? ""}
            </Highlight>
    ):  (item.label ?? "");


  const onClickItem: MouseEventHandler<HTMLDivElement> = (event) => {
    if (item.onSingleClick) {
      item.onSingleClick(event, item.key, item);
    }
    onSelectTreeItem(event, nodeRef);
  };


  return (
    <Container
      py={config.spacing}
      px="0"
      w="full"
      cursor="pointer"
      _hover={{
        background: "primaryBgHover",
      }}
      bg={isSelected ? "primaryBgHeavy" : "transparent"}
      onClick={onClickItem}
      maxW="full"
    >
      <Flex>
        <Flex gap={2}>
          <Flex justifyContent="center" h="full" minW="15px">
            {openIcon}
          </Flex>
          <Box fontSize={config.size}>
            {label}
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}
