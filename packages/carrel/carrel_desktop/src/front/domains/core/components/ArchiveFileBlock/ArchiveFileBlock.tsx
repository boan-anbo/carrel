import React from 'react';

import styles from './ArchiveFileBlock.module.scss';

export interface ArchiveFileBlockProps {
  prop?: string;
}

export function ArchiveFileBlock({prop = 'default value'}: ArchiveFileBlockProps) {
  return <div className={styles.ArchiveFileBlock}>ArchiveFileBlock {prop}</div>;
}
