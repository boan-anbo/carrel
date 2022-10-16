import { Container } from '@chakra-ui/react';
import React from 'react';
import { DataTreeCollection, IDataTreeItem } from '../../i-data-tree-node';

import styles from './DataTreeItem.module.scss';

export interface DataTreeItemProps<T> {
  item?: IDataTreeItem<T>;
}

export function DataTreeItem({item}: DataTreeItemProps<any>) {
  return <Container>
    {item?.label}
  </Container>;
}
