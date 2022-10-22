import { Box, Button, Flex, HStack, IconButton } from '@chakra-ui/react';
import React, { ReactNode, useMemo } from 'react';
import { TCarrelFontWeight } from '../../../props/i-font-weight';
import { TCarrelSize } from '../../../props/i-size';
import { Tooltip } from '../Tooltip/Tooltip';

import styles from './ActionBarItem.module.scss';
import { IActionBarItem } from './IActionBarItem';

export interface ActionBarItemProps {
  item: IActionBarItem;
  size?: TCarrelSize;
  fontWeight?: TCarrelFontWeight;
}

export function ActionBarItem({item, fontWeight, ...props}: ActionBarItemProps) {
  const isIconButton = useMemo(() => {
    return item.icon && (!item.label || (item.label?.length === 0));
  }, [item]);

  let button: ReactNode = null;

  // whether use iconbutton or regular button with or without icon
  if (isIconButton) {
    button = (
      <IconButton
        px="1"
        textColor="actionText"
        bg='transparent'
        variant="solid"
        size={'xs'}
        _hover={{
          backgroundColor: "actionBgHover",
        }}
        isRound
        aria-label={item.label ?? "label not provided"}
        onClick={item.command}
      >
        {item.icon}
      </IconButton>
    );
  } else {
   button = (
     <Button
       size={props.size}
       variant="link"
       textColor="actionText"
       fontWeight={fontWeight}
       onClick={item.command}
     >
       {item.icon && <Box px="1">{item.icon}</Box>}
       <Box px='1'>{item.label}</Box>
     </Button>
   );
  }
    return (
      <Tooltip side="top" type="action" content={item.tooltip}>
        {button}
      </Tooltip>
    );
}
