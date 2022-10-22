import { Flex, HStack, Spacer, StackDivider } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { TCarrelFontWeight } from '../../../props/i-font-weight';
import { TCarrelSize as TCarrelSize } from '../../../props/i-size';
import { ActionBarItem, ActionBarItemProps } from '../ActionBarItem';
import { IActionBarItem } from '../ActionBarItem/IActionBarItem';

import styles from './ActionBar.module.scss';

export interface ActionBarProps {
  items?: IActionBarItem[];
  gap?: number;
  size?: TCarrelSize;
  fontWeight?: TCarrelFontWeight;
}

export function ActionBar({
  size = "xs",
  fontWeight = "normal",
  ...props
}: ActionBarProps) {
  const actions = useMemo(() => {
    return props.items?.map((item, index) => {
      return (
        <ActionBarItem
          fontWeight={fontWeight}
          size={size}
          key={index}
          item={item}
        />
      );
    });
  }, [props.items]);

  return (
    <Flex className={styles.ActionBar}>
      <HStack
        divider={<StackDivider borderColor="actionDivider" />}
        gap={props.gap}
      >
        {actions}
      </HStack>
    </Flex>
  );
}
