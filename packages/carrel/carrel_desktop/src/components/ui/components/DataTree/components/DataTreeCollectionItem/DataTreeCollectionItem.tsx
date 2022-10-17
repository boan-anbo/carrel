import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import { DataTree } from "../../DataTree";
import {
  DataTreeConfigState,
  IDataTreeCollection,
} from "../../i-data-tree-node";
import { DataTreeItem } from "../DataTreeItem";

export interface DataTreeCollectionItemProps<T> {
  item: IDataTreeCollection<T>;
  config: DataTreeConfigState<T>;
}

export function DataTreeCollectionItem({
  item,
  config,
}: DataTreeCollectionItemProps<any>) {
  if (!item) {
    return null;
  }

  if (!config) {
    config = new DataTreeConfigState();
  }

  const [isOpen, setIsOpen] = useState(item.isOpen ?? false);

  const isSelected = useMemo(() => {
    return config.isSelected(item.key);
  }, [config.selectedKeys]);

  const canOpen = useMemo(() => {
    return item.subItemIds.length > 0 || item.subCollections.length > 0;
  }, [item]);

  const sortedSubItems = useMemo(() => {
    return item?.subItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [item.subItems, config.selectedKeys]);

  const itemNodes = useMemo(() => {
    return sortedSubItems.map((item, index) => {
      return <DataTreeItem key={index} config={config} item={item} />;
    });
  }, [sortedSubItems, config.selectedKeys]);

  const icon = useMemo(() => {
    return isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />;
  }, [isOpen]);

  const toggleOpenCollection = () => {
    setIsOpen(!isOpen);
    config.toggleSelection(item.key);
  };

  return (
    <Container
      pl={config.collectionIndent}
      pr="0"
      w="full"
      maxW="full"
      userSelect="none"
    >
      {/* Collection item itself */}
      <HStack
        cursor="pointer"
        w="full"
        py="1"
        pl={config.collectionIndent}
        onClick={toggleOpenCollection}
        bg={isSelected ? "primaryBg" : "transparent"}
        _hover={{
          background: "primaryBgHover",
        }}
      >
        <Box>{icon}</Box>
        <Flex gap="2" w="full">
          <Badge cursor="pointer">{item?.label}</Badge>
          {item?.count && <Badge variant="outline">{item?.count}</Badge>}
        </Flex>
      </HStack>
      {/* Regular Items uncer the collection */}
      {isOpen && canOpen && (
        <VStack spacing="0" w="full" align="start">
          <HStack w="full">
            <DataTree config={config} items={item?.subCollections} />
          </HStack>
          <VStack spacing="2" w="full">
            {itemNodes}
          </VStack>
        </VStack>
      )}
    </Container>
  );
}
