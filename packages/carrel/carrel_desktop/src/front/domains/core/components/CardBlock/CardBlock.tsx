import React from 'react';

import styles from './CardBlock.module.scss';

export interface CardBlockProps {
  prop?: string;
}

export function CardBlock({prop = 'default value'}: CardBlockProps) {
  return <div className={styles.CardBlock}>CardBlock {prop}</div>;
}
