import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { MouseEventHandler, useMemo, useState } from "react";
import { DataTree } from "../../DataTree";
import { NodeMatch } from "../../filter-item";
import {
  CollectionExpandMode,
  DataTreeConfig,
  DataTreeNodeRef,
  IDataTreeCollection,
  IDataTreeNode
} from "../../i-data-tree-node";
import { DataTreeItem } from "../DataTreeItem";

export interface DataTreeCollectionItemProps<T> {
  nodeRef: DataTreeNodeRef;
  loadNode: (ref: DataTreeNodeRef) => IDataTreeNode<T>;
  config: DataTreeConfig<T>;
  filterResults: NodeMatch[] | undefined;
  isRoot?: boolean;
  selectedItems: string[];
  onSelectCollectionItem: (e: any, selections: DataTreeNodeRef) => void;
}

export function DataTreeCollectionItem({
  nodeRef,
  loadNode,
  config,
  onSelectCollectionItem,
  filterResults,
  selectedItems,
  isRoot,
}: DataTreeCollectionItemProps<any>) {
  const item = useMemo(() => {
    return loadNode(nodeRef) as IDataTreeCollection<any>;
  }, [nodeRef, loadNode]);

  const [isExpanded, setIsExpanded] = useState(item.isOpen ?? false);

  const isSelected = useMemo(() => {
    return selectedItems.some((i) => i === item.key);
  }, [selectedItems]);

  const canOpen = useMemo(() => {
    return nodeRef.subItems.length > 0 || nodeRef.subCollections.length > 0;
  }, [nodeRef]);

  /**
   * Undefined means we don't know if it's open or not.
   */
  const [hasFilterResults, setHasFilterResults] =
    useState<boolean | undefined>(false);

  const sortedSubItems = useMemo(() => {
    return nodeRef.subItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [nodeRef.subItems, selectedItems]);

  // generate collection item
  const itemNodes = useMemo(() => {
    return sortedSubItems.map((subNodeRef, index) => {
      return (
        <DataTreeItem
          filterResults={filterResults}
          onSelectTreeItem={onSelectCollectionItem}
          key={index}
          config={config}
          nodeRef={subNodeRef}
          loadNode={loadNode}
          selectedItems={selectedItems}
        />
      );
    });
  }, [sortedSubItems, filterResults, selectedItems]);

  const icon = useMemo(() => {
    return isExpanded
      ? item.collectionIconOpen ?? config.collectionDefaultIconExpanded
      : item.collectionIconClosed ?? config.collectionDefaultIconCollapsed;
  }, [isExpanded]);

  // it pass along the click event to two handlers: onClick and onSelect
  const onClickCollectionItem: MouseEventHandler<HTMLDivElement> = (event) => {
    if (
      config.collectionDefaultExpandMode ===
        CollectionExpandMode.SINGLE_CLICK ||
      item.expandMode === CollectionExpandMode.SINGLE_CLICK
    ) {
      setIsExpanded(!isExpanded);
    }

    if (item.onSingleClick) {
      item.onSingleClick(event, item.key, item.data);
    }
    onSelectCollectionItem(event, nodeRef);
  };

  const onDoubleClickCollectionItem: MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      config.collectionDefaultExpandMode ===
        CollectionExpandMode.DOUBLE_CLICK ||
      item.expandMode === CollectionExpandMode.DOUBLE_CLICK
    ) {
      setIsExpanded(!isExpanded);
    }

    if (item.onDoubleClick) {
      item.onDoubleClick(event, item.key, item.data);
    }

  };

  const collectionItem = useMemo(() => {
    if (config.enableFilter && filterResults) {
      // check if any of its sub items are in the filter results
      const hasFilteredSubItems = sortedSubItems.some((subNodeRef) => {
        return filterResults.some(
          (filterMatch) => filterMatch.key === subNodeRef.key
        );
      });
      if (!hasFilteredSubItems) {
        return <></>;
      } else {
        setHasFilterResults(true);
      }
    } else {
      setHasFilterResults(undefined);
    }
    return (
      <Flex bg={isSelected ? "primaryBgHeavy" : "transparent"}>
        <Box w={isRoot ? 0 : config.indentation} />
        <Flex
          py={config.spacing}
          cursor="pointer"
          w="full"
          onClick={onClickCollectionItem}
          onDoubleClick={onDoubleClickCollectionItem}
          _hover={{
            background: "primaryBgHover",
          }}
        >
          <Box>{icon}</Box>
          <Flex gap="2" w="full">
            {item?.label}
            {item?.countLabel}
          </Flex>
        </Flex>
      </Flex>
    );
  }, [filterResults, isExpanded]);

  return (
    <Container w="full" maxW="full" px="0" userSelect="none">
      {/* Collection item itself */}
      <>{collectionItem}</>
      {/* Regular Items uncer the collection */}
      {(isExpanded || hasFilterResults) && canOpen && (
        <Flex>
          <Box w={config.indentation} />
          <VStack spacing="0" w="full" align="start">
            <DataTree
              filterResults={filterResults}
              onSelectNode={onSelectCollectionItem}
              config={config}
              nodeRefs={nodeRef.subCollections}
              loadNode={loadNode}
              isRoot={false}
              selectedItems={selectedItems}
            />
            <VStack spacing="0" w="full">
              {itemNodes}
            </VStack>
          </VStack>
        </Flex>
      )}
    </Container>
  );
}
