import { Container, HStack, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { DataTree } from "../../DataTree";
import { IDataTreeCollection } from "../../i-data-tree-node";
import { DataTreeItem } from "../DataTreeItem";

export interface DataTreeCollectionItemProps<T> {
  item: IDataTreeCollection<T>;
}

export function DataTreeCollectionItem({
  item,
}: DataTreeCollectionItemProps<any>) {
  const sortedSubItems = useMemo(() => {
    return item.subItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [item.subItems]);

  const itemNodes = useMemo(() => {
    return sortedSubItems.map((item, index) => {
      return <DataTreeItem item={item} />;
    });
  }, [sortedSubItems]);

  return (
    <Container>
      {item?.label}
      <HStack>
        <DataTree root={item.subCollections} />
      </HStack>
      <VStack>
        {itemNodes}
      </VStack>
    </Container>
  );
}
