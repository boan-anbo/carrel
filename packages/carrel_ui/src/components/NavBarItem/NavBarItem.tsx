import React from 'react';
import { Button } from '../Button/Button';
import { CUButtonVariantType } from '../Button/CUButtonVariant';
import styles from './NavBarItem.module.scss';
export interface NavBarItemProps {
  variant?: CUButtonVariantType
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}



export const NavBarItem = ({
  children,
  icon,
  variant,
  ...props
}: NavBarItemProps) => {
  return (
    <div  className={styles.button}>
      <Button variant={variant} onClick={props.onClick}>
        {children}
      </Button>
    </div>
  );
}

