import { Button } from '@chakra-ui/react';
import React from 'react';
import styles from './NavBarItem.module.scss';
export interface NavBarItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}



export const NavBarItem = ({ children, icon, ...props }: NavBarItemProps) => {
  return (
    <div className={styles.button}>
      <Button variant={"ghost"} onClick={props.onClick}>
        {children}
      </Button>
    </div>
  );
};

