import React from 'react';

import styles from './PanelViewList.module.scss';

export interface PanelViewListProps {
  prop?: string;
}

export function PanelViewList({prop = 'default value'}: PanelViewListProps) {
  return <div className={styles.PanelViewList}>PanelViewList {prop}</div>;
}
