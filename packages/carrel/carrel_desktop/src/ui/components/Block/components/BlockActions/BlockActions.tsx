import React, { ReactNode } from 'react';
import { ActionBar } from '../../../ActionBar/ActionBar';

import styles from './BlockActions.module.scss';

export interface BlockActionsProps {
  actionBar: ReactNode;
}

export function BlockActions({actionBar}: BlockActionsProps) {
  return <>
  {actionBar}
  </>;
}
