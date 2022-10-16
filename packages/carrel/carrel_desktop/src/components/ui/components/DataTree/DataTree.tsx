import { Container, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { DataTreeCollectionItem } from "./components";
import { DataTreeItem } from "./components/DataTreeItem/DataTreeItem";

import {
  DataTreeConfiguration,
  EDataTreeNodeType,
  IDataTreeCollection
} from "./i-data-tree-node";

export interface DataTreeProps<T> {
  root?: IDataTreeCollection<T>[];
  config?: DataTreeConfiguration<T>;
}

export function DataTree({ root = [], ...props }: DataTreeProps<any>) {
  const orderedItems = useMemo(() => {
    return root.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, []);

  const rootTreeNodes = useMemo(() => {
    return orderedItems.map((item, index) => {
      if (item.type === EDataTreeNodeType.COLLECTION) {
        return <DataTreeCollectionItem item={item} />;
      } else {
        return <DataTreeItem item={item} />;
      }
    });
  }, [root]);
  return (
    <Container>
      <VStack>{rootTreeNodes}</VStack>
    </Container>
  );
}
