import { Box, Container, Flex, Input, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Item } from "react-stately";
import { TCarrelSize } from "../../props/i-size";
import { DataTreeCollectionItem } from "./components";
import { DataTreeItem } from "./components/DataTreeItem/DataTreeItem";
import { nodeTreeToRefTree, selectNodesBetween } from "./data-tree-utils";
import { DataTree } from "./DataTree";
import {
  NodeMatch as NodeFilterMatch,
  NodeMatch,
  shouldShowDataTreeItem,
} from "./filter-item";

import {
  DataTreeConfigState,
  DataTreeNodeRef,
  EDataTreeNodeType,
  IDataTreeCollection,
  IDataTreeItem,
  IDataTreeNode,
} from "./i-data-tree-node";

export interface DataTreeRootProps<T> {
  /**
   * A tree-like data structure for item `references` for which either the source or lazy-loaded-source needs to be provided.
   */
  treeNodes: IDataTreeNode<any>[];
  /**
   * If this is true, it will use lazySource to load the data.
   */
  isLazy?: boolean;
  loadNode?: (ref: DataTreeNodeRef) => IDataTreeNode<T>;
  config: DataTreeConfigState<T>;
  size?: TCarrelSize;
  /**
   * External source of filter pattern.
   * If `useBuiltInFilter` is set to true, this will be overridden by the internal filter pattern value.
   */
  filterPattern?: RegExp;

  onSelectionsChange?: (selections: IDataTreeNode<T>[]) => void;
}

export function DataTreeRoot({
  treeNodes = [],
  isLazy = false,
  loadNode,
  config,
  size: fontSize = "xs",
  onSelectionsChange,
  filterPattern,
  ...props
}: DataTreeRootProps<any>) {
  const [builtinFilterPattern, setBuiltinFilterPattern] =
    useState<RegExp | undefined>(undefined);

  const [builtinFilterValue, setBuiltinFilterValue] = useState<string>("");

  const [staticFlatNodeArray, setStaticFlatNodeArray] = useState<
    IDataTreeNode<any>[]
  >([]);

  /**
   * This contains the corresponding index and keys for the flat node array.
   * This is used to quickly select a range of keys without touching the Node Flat Tree which contains node data.
   */
  const [refKeyFlatArray, setRefKeyFlatArray] = useState<string[]>([]);

  const [itemRefTree, setItemRefTree] = useState<DataTreeNodeRef[]>([]);
  /**
   * Only keys are stored
   */
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [lastSelectedRef, setLastSelectedRef] =
    useState<DataTreeNodeRef | undefined>(undefined);

  // to store items that satisfy the filter pattern
  // if undefined, it means that the filter pattern is not set, and the components should render all items
  const [filterResult, setFilterResult] =
    useState<NodeFilterMatch[] | undefined>(undefined);

  if (!config) {
    config = new DataTreeConfigState();
  }

  /**
   * Convert input data tree to (1) a tree of references, (2) a flat array of nodes, and (3) a flat array of keys for quick selections.
   */
  useEffect(() => {
    const {
      refTree,
      nodeStaticFlatTree,
      refKeyFlatArray: refFlatArray,
    } = nodeTreeToRefTree(treeNodes);

    setItemRefTree(refTree);
    setStaticFlatNodeArray(nodeStaticFlatTree);
    setRefKeyFlatArray(refFlatArray);
  }, [treeNodes]);

  /**
   * Filter by pattern
   */
  useEffect(() => {
    if (builtinFilterPattern) {
      const matchedNodeKeys: NodeMatch[] = staticFlatNodeArray
        .map((node) => {
          const result = shouldShowDataTreeItem(
            node,
            builtinFilterPattern,
            config.filterFields
          );
          if (!result) {
            return undefined;
          }
          return {
            key: node.key,
            substring: result,
          } as NodeMatch;
        })
        .filter((x) => x !== undefined) as NodeMatch[];

      setFilterResult(matchedNodeKeys);
    } else {
      setFilterResult(undefined);
    }
  }, [builtinFilterPattern]);

  // whether should show built-in filter
  const shouldShowFilter = useMemo(() => {
    return config.enableFilter && config.useBuiltInFilter;
  }, [config.enableFilter, config.useBuiltInFilter]);

  // whether should show filter input box
  const builtInFilter = useMemo(() => {
    if (!shouldShowFilter) {
      return null;
    }
    return (
      <Input
        size={fontSize}
        value={builtinFilterValue}
        onChange={(e) => {
          const value = e.target.value;
          if (value && value.length > 0) {
            setBuiltinFilterValue(e.target.value);
            setBuiltinFilterPattern(new RegExp(e.target.value, "i"));
          } else {
            setBuiltinFilterValue("");
            setBuiltinFilterPattern(undefined);
          }
        }}
        placeholder="Filter"
      ></Input>
    );
  }, [shouldShowFilter, builtinFilterValue]);

  const onSelectNode = (e: any, selecteNodeRef: DataTreeNodeRef) => {
    const ctrlHeld = e.ctrlKey;

    const shiftHeld = e.shiftKey;

    const alreadySelected = selectedItems.some((i) => i === selecteNodeRef.key);
    const singleSelect =
      config.selectionMode === "single" && !ctrlHeld && !shiftHeld;
    // check selection mode
    if (singleSelect) {
      if (alreadySelected) {
        setSelectedItems([]);
      } else {
        setSelectedItems([selecteNodeRef.key]);
      }
      // multi selection, whether specified or ctrl key was held when selecting
    } else {
      if (shiftHeld && lastSelectedRef) {
        // last selected index
        const lastSelectedIndex = lastSelectedRef?.index;
        // current selected index
        const currentSelectedIndex = selecteNodeRef.index;
        // select range
        const selectedKeys = selectNodesBetween(
          lastSelectedIndex,
          currentSelectedIndex,
          refKeyFlatArray
        );
        // set selected items
        setSelectedItems(selectedKeys);
      } else if (alreadySelected) {
        setSelectedItems(selectedItems.filter((i) => i !== selecteNodeRef.key));
      } else {
        setSelectedItems([...selectedItems, selecteNodeRef.key]);
      }
    }

    // if the shift key is held, the last clicked item should not be recorded because the expected behavior is to have a fixed starting point.
    if (!shiftHeld) {
      setLastSelectedRef(selecteNodeRef);
    }
  };

  // emit selection change event
  useEffect(() => {
    if (onSelectionsChange) {
      const selectedNodes = selectedItems.map((key) => {
        return staticFlatNodeArray.find((node) => node.key === key);
      });
      onSelectionsChange(selectedNodes as IDataTreeNode<T>[]);
    }
  }, [selectedItems]);

  const defaultLoadNode = (ref: DataTreeNodeRef) => {
    return staticFlatNodeArray[ref.index];
  };

  return (
    <Container
      w="full"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      fontSize={fontSize}
      maxW="full"
      px="0"
      py="0"
    >
      {builtInFilter}
      <DataTree
        filterResults={filterResult}
        nodeRefs={itemRefTree}
        loadNode={loadNode || defaultLoadNode}
        config={config}
        isRoot={true}
        filterPattern={filterPattern ?? builtinFilterPattern}
        onSelectNode={onSelectNode}
        selectedItems={selectedItems}
      />
    </Container>
  );
}
