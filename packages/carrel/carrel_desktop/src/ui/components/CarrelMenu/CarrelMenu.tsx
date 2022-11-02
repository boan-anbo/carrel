import { Box, Flex, Spacer } from "@chakra-ui/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { TCarrelSize } from "../../props/i-size";
import {
  DROPDOWN_MENU_HEIGHT,
  DROPDOWN_MENU_ITEM_HEIGHT_NUMBER,
} from "../../styles/constants";
import { CarrelMenuSubItem } from "../CarrelMenuSubItem";
import styles from "./CarrelMenu.module.scss";

export enum CarrelMenuItemType {
  Item = "item",
  Separator = "separator",
  ItemWithSubItems = "itemWithSubItems",
}

export interface CarrelMenuItem<T> {
  type: CarrelMenuItemType;
  label?: string;
  subItems?: CarrelMenuItem<any>[];
  command?: (e: Event, data: T) => void;
  data?: T;
  shortcut?: string;
}

export interface MenuItemProps {
  rootItem: CarrelMenuItem<any>;
  size?: TCarrelSize;
  defaultOpen?: boolean;
}

export function CarrelMenu({
  rootItem,
  size = "sm",
  defaultOpen = false,
}: MenuItemProps) {
  const items = useMemo(() => {
    return rootItem.subItems?.map((item) => {
      let element = null;
      switch (item.type) {
        case CarrelMenuItemType.Item:
          element = (
            <Flex w="full" px="8" justifyContent="space-between">
              <Box w="full">
                <DropdownMenu.DropdownMenuItem
                  className={styles.CarrelMenu}
                  onSelect={(e: Event) => item.command?.(e, item.data)}
                >
                  {item.label}
                </DropdownMenu.DropdownMenuItem>
              </Box>
              {item.shortcut && <Spacer minW="40px" />}
              {item.shortcut && <Box>{item.shortcut}</Box>}
            </Flex>
          );
          break;

        case CarrelMenuItemType.ItemWithSubItems:
          element = (
            <Box w="full">
              <DropdownMenu.DropdownMenuSub>
                <DropdownMenu.SubTrigger>
                  <Flex
                    pl="8"
                    pr="2"
                    align="center"
                    justify="space-between"
                    w="full"
                  >
                    <Box w="full">{item.label}</Box>
                    <Box>
                      <ChevronRightIcon />
                    </Box>
                  </Flex>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <Box
                    borderRadius={"lg"}
                    shadow="md"
                    color="primaryText"
                    bg="primaryBg"
                  >
                    {item.subItems?.map((subItem) => {
                      return <CarrelMenuSubItem item={subItem} />;
                    })}
                  </Box>
                </DropdownMenu.SubContent>
              </DropdownMenu.DropdownMenuSub>
            </Box>
          );
          break;
        case CarrelMenuItemType.Separator:
          return <DropdownMenu.Separator className={styles.Separator} />;
      }
      return (
        <Flex
          alignContent="center"
          alignItems={"center"}
          cursor="pointer"
          h={DROPDOWN_MENU_ITEM_HEIGHT_NUMBER}
          w="full"
          _hover={{
            backgroundColor: "primaryBgHover",
            color: "primaryTextHover",
            borderRadius: "4px",
          }}
        >
          {element}
        </Flex>
      );
    });
  }, [rootItem.subItems]);

  return (
    <Box fontSize={size}>
      <DropdownMenu.Root defaultOpen={defaultOpen}>
        <Flex
          justifyContent="center"
          align="center"
          px="2"
          w="fit-content"
          _hover={{
            bg: "bgDarkHover",
            color: "primaryTextHover",
          }}
          style={{
            outline: "none",
          }}
          h={DROPDOWN_MENU_HEIGHT}
          color="gray.100"
        >
          <DropdownMenu.Trigger>{rootItem.label}</DropdownMenu.Trigger>
        </Flex>
        <DropdownMenu.Content align="start">
          <Box p="1" bg="primaryBg" borderRadius={"lg"} shadow="md">
            {items}
          </Box>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}
