import React from "react";
import { CarrelMenu, CarrelMenuItem } from "../CarrelMenu/CarrelMenu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./CarrelMenuSubItem.module.scss";
import { Box, Flex, Text } from "@chakra-ui/react";
import { DROPDOWN_MENU_ITEM_HEIGHT_NUMBER } from "../../styles/constants";

export interface CarrelMenuSubItemProps {
  item: CarrelMenuItem<any>;
}

export function CarrelMenuSubItem({ item }: CarrelMenuSubItemProps) {
  return (
    <Flex
      alignContent="center"
      alignItems={"center"}
      cursor="pointer"
      h={DROPDOWN_MENU_ITEM_HEIGHT_NUMBER}
      w="full"
      _hover={{
        backgroundColor: "primaryBgHover",
        borderRadius: "4px",
        color: "primaryTextHover",
      }}
      px="8"
    >
      <Box
        _hover={{
          backgroundColor: "primaryBgHover",
          color: "primaryTextHover",
        }}
      >
        <DropdownMenu.Item
          onSelect={async (e: Event) => {
            if (item.command) {
              await item.command(e, item.data);
            }
          }}
        >
          {item.label}
        </DropdownMenu.Item>
      </Box>
    </Flex>
  );
}
