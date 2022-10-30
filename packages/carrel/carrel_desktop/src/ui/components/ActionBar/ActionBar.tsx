import { Flex, HStack, StackDivider } from "@chakra-ui/react";
import { useMemo } from "react";
import { TCarrelFontWeight } from "../../../props/i-font-weight";
import { TCarrelSize } from "../../../props/i-size";
import { BLOCK_ACTION_BAR_HEIGHT } from "../../styles/constants";
import { ActionBarItem } from "../ActionBarItem";
import { IActionBarItem } from "../ActionBarItem/IActionBarItem";

import styles from "./ActionBar.module.scss";

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
    <Flex h={BLOCK_ACTION_BAR_HEIGHT} className={styles.ActionBar}>
      <HStack
        divider={<StackDivider borderColor="actionDivider" />}
        gap={props.gap}
      >
        {actions}
      </HStack>
    </Flex>
  );
}
