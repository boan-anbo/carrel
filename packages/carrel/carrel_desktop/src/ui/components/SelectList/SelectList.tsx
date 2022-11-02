import {Checkbox, Text, Container, Heading, HStack, VStack, Box} from '@chakra-ui/react';
import React, {useEffect, useMemo} from 'react';
import { TCarrelSize } from '../../../props/i-size';
import {SelectListItem} from './components';
import {SelectItem} from './components/SelectListItem/ISelectItem';

import styles from './SelectList.module.scss';

export interface SelectListProps<T> {
  items: SelectItem<T>[];
  listTitle?: React.ReactNode;
  selectionMode?: "single" | "multiple" | "none";
  onSelectionChanged?: (selectedItems: SelectItem<T>[]) => void;
  size?: TCarrelSize;
  showCheckbox?: boolean;
  debug?: boolean;
  showIndex?: boolean;
}


export function SelectList({
  size = "xs",
  selectionMode = "none",
  showCheckbox = true,
  debug = false,
  ...props
}: SelectListProps<any>) {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const shouldShowCheckbox = useMemo(() => {
    return selectionMode !== "none" && showCheckbox;
  }, [selectionMode, showCheckbox]);

  const shouldShowSelectAll = useMemo(() => {
    return shouldShowCheckbox && selectionMode === "multiple";
  }, [shouldShowCheckbox, selectionMode]);

  const toggleSelectAll = () => {
    if (selectionMode === "none") {
      return;
    }
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(props.items?.map((item) => item.key) ?? []);
      setSelectAll(true);
    }
    setSelectAll(!selectAll);
  };

  function updateSelection(toSelect: boolean, selectItem: SelectItem<any>) {
    if (selectionMode === "none") {
      return;
    }

    if (toSelect) {
      if (selectedItems.indexOf(selectItem.key) === -1) {
        if (selectionMode === "single") {
          setSelectedItems([selectItem.key]);
        } else {
          setSelectedItems([...selectedItems, selectItem.key]);
        }
      }
    } else {
      setSelectedItems(selectedItems.filter((key) => key !== selectItem.key));
    }
  }

  const itemCalculated = useMemo(() => {
    return props.items?.map((item, index) => (
      <HStack key={`item-${index}`} w="full">
        {props.showIndex && (
          <Box pl="2" pr="1">
            <Heading  fontSize={size}>{index + 1}</Heading>
          </Box>
        )}
        <SelectListItem
          key={item.key}
          showCheckbox={shouldShowCheckbox}
          onSelectionChange={(selectItem, toSelect) => {
            if (debug) {
              console.log(
                `SelectListItem.onSelectionChange: ${selectItem.key} ${toSelect}`
              );
            }
            updateSelection(toSelect, selectItem);
          }}
          selected={selectedItems.indexOf(item.key) !== -1}
          item={item}
        />
      </HStack>
    ));
  }, [props.items, selectedItems]);

  // Update the selected items when the items change
  useEffect(() => {
    if (props.onSelectionChanged) {
      props.onSelectionChanged(
        props.items?.filter((item) => selectedItems.indexOf(item.key) !== -1) ??
          []
      );
    }

    // check if all items are unselected, if so, update selectAll to false
    if (selectedItems.length === 0) {
      setSelectAll(false);
    }

    if (selectedItems.length === props.items?.length) {
      setSelectAll(true);
    }
  }, [selectedItems]);

  return (
    <Container maxW="full" maxH="full" w="full">
      <HStack
        fontSize={size}
        bg="primaryBg"
        px="2"
        pt="2"
        borderTopRadius="lg"
        maxW="fit-content"
        h="full"
        w="full"
      >
        {shouldShowSelectAll && (
          <Checkbox px="1" isChecked={selectAll} onChange={toggleSelectAll} />
        )}

        <Text  as='h1' fontWeight={'bold'}  size={size}>{props.listTitle}</Text>
      </HStack>
      <VStack h="full" w="full" bg="primaryBg" py="2" className={styles.list}>
        {itemCalculated}
      </VStack>
    </Container>
  );
}
