import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { TCarrelSize } from "../../props/i-size";

import { TCarrelJustify } from "../../props/i-justify";
import {
  BLOCK_ACTION_BAR_HEIGHT,
  BLOCK_HEADER_HEIGHT_NUMBER,
} from "../../styles/constants";
import styles from "./Block.module.scss";
import { BlockActions, BlockContent, BlockHeader } from "./components";

export interface BlockProps {
  bg?: string;
  title?: string;
  children?: ReactNode;
  size?: TCarrelSize;
  headerPosition?: TCarrelJustify;
  topActionBar?: ReactNode;
  topActionBarPX?: number;
  bottomActionBarPX?: number;
  bottomActionBar?: ReactNode;
  topActionBarJustify?: TCarrelJustify;
  bottomActionBarJustify?: TCarrelJustify;
  bottomActionBarPosition?: "start" | "center" | "end";
  // contentHeight need to be set in order to make the content scrollable
  contentHeight?: string;
  onClickHeader?: (id: string) => void;
  id?: string;
  blockContentPaddingTop?: number;
  blockContentPaddingBottom?: number;
}

export const Block = ({
  title = "Block title",
  children,
  headerPosition,
  bg,
  contentHeight,
  onClickHeader: onClickBlockTitle,
  id,
  topActionBar,
  topActionBarPX,
  bottomActionBarPX,
  bottomActionBar,
  topActionBarJustify,
  bottomActionBarJustify,
  bottomActionBarPosition,
  blockContentPaddingTop,
  blockContentPaddingBottom,
  ...props
}: BlockProps) => {
  const blockContentParentDivHeight = useMemo(
    () => `calc(100% - ${BLOCK_HEADER_HEIGHT_NUMBER}px)`,
    []
  );
  // calculate the height of the action bars, in order to know the actual height of the block content
  const BLOCK_ACTION_BARS_HEIGHT = useMemo(() => {
    let height = 0;
    if (topActionBar) {
      height += BLOCK_ACTION_BAR_HEIGHT;
    }
    if (bottomActionBar) {
      height += BLOCK_ACTION_BAR_HEIGHT;
    }

    return `${height}px`;
  }, [topActionBar, bottomActionBar]);

  // calculate the height of the block content based on full height minus the action bars height
  const blockContentHeight = useMemo(
    () => "calc(100% - " + BLOCK_ACTION_BARS_HEIGHT + ")",
    [BLOCK_ACTION_BARS_HEIGHT]
  );

  return (
    <Container
      bg={bg}
      maxH="full"
      px="0"
      h="full"
      maxW="full"
      className={styles.Block}
    >
      <VStack w="full" spacing="0" h="full">
        <Flex
          onClick={(e) => {
            console.log(e);
            if (onClickBlockTitle && id) {
              onClickBlockTitle(id);
            }
          }}
          h={BLOCK_HEADER_HEIGHT_NUMBER}
          justify={headerPosition}
          w="full"
        >
          <BlockHeader title={title} />
        </Flex>
        <VStack
          bg="primaryBg"
          h={blockContentParentDivHeight}
          p="0"
          gap="0"
          spacing="0"
          w="full"
        >
          {/* Top action bar */}
          {topActionBar && (
            <Flex
              w="full"
              h={BLOCK_ACTION_BAR_HEIGHT}
              justifyContent={topActionBarJustify}
              px={topActionBarPX}
              fontSize={props.size}
            >
              <BlockActions actionBar={topActionBar} />
            </Flex>
          )}

          {/* Content */}
          <Box w="full" h={blockContentHeight}>
            <BlockContent
              blockContentPaddingTop={blockContentPaddingTop}
              blockContentPaddingBottom={blockContentPaddingBottom}
              contentHeight={contentHeight}
              content={children}
            />
          </Box>
          {/* Bottom action bar */}
          {bottomActionBar && (
            <Flex
              w="full"
              h={BLOCK_ACTION_BAR_HEIGHT}
              justifyContent={bottomActionBarJustify}
              px={bottomActionBarPX}
              fontSize={props.size}
            >
              <BlockActions actionBar={bottomActionBar} />
            </Flex>
          )}
        </VStack>
      </VStack>
    </Container>
  );
};
