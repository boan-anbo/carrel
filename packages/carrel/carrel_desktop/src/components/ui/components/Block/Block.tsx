import { Box, Container, Flex, HStack, VStack } from '@chakra-ui/react';
import clsx from 'clsx';
import { ReactNode, useMemo } from 'react';
import { BLOCK_HEADER_HEIGHT } from '../../../../styles/constants';
import { TCarrelJustify } from '../../../props/i-justify';
import { TCarrelSize } from '../../../props/i-size';
import { ActionBar } from '../ActionBar/ActionBar';

import styles from './Block.module.scss';
import { BlockActions, BlockContent, BlockHeader } from './components';

export interface BlockProps {
  bg?: string;
  title?: string;
  children?: ReactNode;
  size?: TCarrelSize;
  headerPosition?: TCarrelJustify;
  topActionBar?: ReactNode;
  topActionBarPX?: number;
  bottomActionBar?: ReactNode;
  topActionBarJustify?: TCarrelJustify;
  bottomActionBarPosition?: "start" | "center" | "end";
  // contentHeight need to be set in order to make the content scrollable
  contentHeight?: string;
}

export const Block = ({ title = "Block title", children, headerPosition, bg, contentHeight, ...props }: BlockProps) => {
  return (
    <Container
      bg={bg}
      maxH="full"
      px="0"
      h="full"
      maxW="full"
      className={styles.Block}
    >
      <VStack spacing="0" h="full">
        <Flex  h={BLOCK_HEADER_HEIGHT} justify={headerPosition} w="full">
          <BlockHeader title={title} />
        </Flex>
        <VStack bg="primaryBg" h="full" w="full">
          {/* Top action bar */}
          <Flex
            w="full"
            justifyContent={props.topActionBarJustify}
            px={
              props.topActionBarPX
            }
            pt="4"
            fontSize={props.size}
          >
            <BlockActions actionBar={props.topActionBar} />
          </Flex>
          {/* Content */}
          <Box  w="full" h="full">
            <BlockContent contentHeight={contentHeight} content={children} />
          </Box>
          {/* Bottom action bar */}
          <Box
            w="full"
            justifyContent={props.bottomActionBarPosition}
            px="4"
            pb="4"
          >
            <BlockActions actionBar={props.bottomActionBar} />
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
}

