import React, { useMemo } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./CarrelMenu.module.scss";
import { Button } from "@chakra-ui/react";

export enum CarrelMenuItemType {
  Item = "item",
  Separator = "separator",
}

export interface CarrelMenuItem<T> {
  type: CarrelMenuItemType;
  label?: string;
  subItems?: CarrelMenuItem<any>[];
  command?: (e: Event, data: T) => void;
  data?: T;
}

export interface MenuItemProps {
  rootItem: CarrelMenuItem<any>;
}

export function CarrelMenu({ rootItem }: MenuItemProps) {
  const items = useMemo(() => {
    return rootItem.subItems?.map((subItem) => {
      switch (subItem.type) {
        case CarrelMenuItemType.Item:
          return (
            <DropdownMenu.DropdownMenuItem
              onSelect={(e) => subItem.command?.(e, subItem.data)}
            >
              {subItem.label}
            </DropdownMenu.DropdownMenuItem>
          );
        case CarrelMenuItemType.Separator:
          return <DropdownMenu.Separator className={styles.Separator} />;
      }
    });
  }, [rootItem.subItems]);

  return (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger>{rootItem.label}</DropdownMenu.Trigger>
      <DropdownMenu.Content>{items}</DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
