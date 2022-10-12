import { Button, Text } from '@adobe/react-spectrum';
import React from 'react';

import { navBarItem, navBarItemButton } from './NavBarItem.css';


export interface NavBarItemProps {
  name?: string;
  onCLick?: () => void;
  icon?: React.ReactNode;
}

export function NavBarItem({name = 'Nav Bar Item', icon}: NavBarItemProps) {
  return (
    <div className={navBarItem}>
      <Button variant="primary">
        {icon}
        <Text>Icon + Label</Text>
      </Button>
    </div>
  );
}
