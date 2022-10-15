import { Box, Container, Flex, StackDivider, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { TCarrelJustify } from '../../../props/i-justify';
import { TCarrelSize } from '../../../props/i-size';


export interface ItemInfoProps {
  entries: ItemInfoEntry[];
  name: string;
  namePosition?: TCarrelJustify;
  size?: TCarrelSize;
  hide?: boolean;
}

export interface ItemInfoEntry {
  label: string;
  value: string;
}

/**
 * Universal information table for item.
 */
export function ItemInfo({
  name,
  entries,
  namePosition = "center",
  size = "xs",
  hide,
  ...prop
}: ItemInfoProps) {
  if (!entries) {
    return null;
  }

  if (hide) {
    return null;
  }

  const entryElements = useMemo(
    () =>
      entries.map(({ label, value }, index) => (
        <Flex w="full" justifyContent="space-around">
          <Box fontSize={size}>
            <Text fontSize={size}>{label}</Text>
          </Box>
          <Box fontSize={size}>
            <Text fontSize={size}>{value}</Text>
          </Box>
        </Flex>
      )),
    [entries]
  );

  return (
    <Container size={size} maxW="full" w="full">
      <Flex roundedTop="lg" w="full" justify={namePosition}>
        <Text fontSize={size} px="2" pt="2" bg="primaryBg" borderTopRadius="md">
          {name}
        </Text>
      </Flex>
      <VStack py="2" divider={<StackDivider />} bg="primaryBg" w="full">
        {entryElements}
      </VStack>
    </Container>
  );
}
