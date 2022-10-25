import React from 'react';

import styles from './TagBlock.module.scss';

export interface TagBlockProps {
  prop?: string;
}

export function TagBlock({prop = 'default value'}: TagBlockProps) {
  return <div className={styles.TagBlock}>TagBlock {prop}</div>;
}
