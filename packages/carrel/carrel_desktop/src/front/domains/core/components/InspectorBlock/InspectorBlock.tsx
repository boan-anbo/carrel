import React from 'react';

import styles from './InspectorBlock.module.scss';

export interface InspectorBlockProps {
  prop?: string;
}

export function InspectorBlock({prop = 'default value'}: InspectorBlockProps) {
  return <div className={styles.InspectorBlock}>InspectorBlock {prop}</div>;
}
