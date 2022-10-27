import { dir } from 'console';
import React, { useMemo } from 'react';
import { Directory } from '../../../../../backend/carrel_server_client/carrel/common/directory/v1/directory_v1_pb';
import { carrelQueries } from '../../../../../backend/server-api/carrel-queries';
import { IDataTreeNode } from '../../../../../ui/components/DataTree/i-data-tree-node';

import styles from './TagBlock.module.scss';

export interface TagBlockProps {
  directory?: string
}

export function TagBlock({directory}: TagBlockProps) {

  return <div className={styles.TagBlock}>TagBlock {prop}</div>;
}
