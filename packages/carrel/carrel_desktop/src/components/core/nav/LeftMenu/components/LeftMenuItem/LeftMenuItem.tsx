import { Button } from '@chakra-ui/react';
import React from 'react';

import styles from './LeftMenuItem.module.scss';

export interface LeftMenuItemProps {
  icon?: React.ReactElement;
  children?: React.ReactNode;
}


export function LeftMenuItem({icon, children}: LeftMenuItemProps) {
  return (
    <Button color='black' variant='ghost' fontWeight='light' leftIcon={icon} className={styles.LeftMenuItem}>
      {children}
    </Button>
  );
}
