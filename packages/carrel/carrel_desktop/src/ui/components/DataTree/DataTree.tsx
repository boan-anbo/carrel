import { Container, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { TCarrelSize } from "../../props/i-size";
import { DataTreeCollectionItem } from "./components";
import { DataTreeItem } from "./components/DataTreeItem/DataTreeItem";
import { NodeMatch } from "./filter-item";

import {
  DataTreeConfig,
  DataTreeNodeRef,
  EDataTreeNodeType, IDataTreeNode
} from "./i-data-tree-node";

export interface DataTreeProps<T> {
  nodeRefs: DataTreeNodeRef[];
  loadNode: (ref: DataTreeNodeRef) => IDataTreeNode<T>;
  config: DataTreeConfig<T>;
  size?: TCarrelSize;
  isRoot: boolean; // this needs to be set to true if this is the root of the tree

  /**
   * External source of filter pattern.
   * If `useBuiltInFilter` is set to true, this will be overridden by the internal filter pattern value.
   */
  filterPattern?: RegExp;
  filterFields?: string[][];
  filterResults: NodeMatch[] | undefined;

  selectedItems: string[];

  onSelectNode: (e: any, selections: DataTreeNodeRef) => void;
}

export function DataTree({
  nodeRefs = [],
  loadNode,
  config,
  size: fontSize,
  isRoot,
  onSelectNode,
  filterResults,
  selectedItems,
  ...props
}: DataTreeProps<any>) {
  const orderedNodeRefs = useMemo(() => {
    return nodeRefs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [nodeRefs]);

  const rootCollectionNodes = useMemo(() => {
    return orderedNodeRefs
      .filter((i) => i.type === EDataTreeNodeType.COLLECTION)
      .map((nodeRef, index) => {
        return (
          <DataTreeCollectionItem
            filterResults={filterResults}
            onSelectCollectionItem={onSelectNode}
            isRoot={isRoot}
            key={index}
            config={config}
            nodeRef={nodeRef}
            loadNode={loadNode}
            selectedItems={selectedItems}
          />
        );
      });
  }, [orderedNodeRefs, filterResults, selectedItems]);

  const rootItemNodes = useMemo(() => {
    return orderedNodeRefs
      .filter((i) => i.type === EDataTreeNodeType.ITEM)
      .map((nodeRef, index) => {
        return (
          <DataTreeItem
            isRoot={isRoot}
            filterResults={filterResults}
            onSelectTreeItem={onSelectNode}
            key={index}
            config={config}
            nodeRef={nodeRef}
            loadNode={loadNode}
            selectedItems={selectedItems}
          />
        );
      });
  }, [orderedNodeRefs, filterResults, selectedItems]);

  return (
    <Container maxW="full" px="0">
      <VStack spacing="0" w="full">
        {rootCollectionNodes}
      </VStack>
      <VStack spacing="0" w="full">
        {rootItemNodes}
      </VStack>
    </Container>
  );
}
