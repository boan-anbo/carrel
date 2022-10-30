import { Box, Container, Flex } from "@chakra-ui/react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { ReactNode, useMemo } from "react";
import { TCarrelSize } from "../../../props/i-size";
import {
  BLOCK_HEADER_HEIGHT_NUMBER,
  PAGE_HEADER_HEIGHT,
  PAGE_HEADER_HEIGHT_NUMBER,
} from "../../../styles/constants";

export interface PanelProps {
  blocks: PanelBlock[];
  size: TCarrelSize;
}

export interface PanelBlock {
  title: string;
  block: ReactNode;
  initialUnfoldSize?: number;
  id: string;
}

/**
 * THis is the main panel for displaying the core panels.
 */
export function Panel({ blocks, size }: PanelProps) {
  const blockItems = blocks?.map((panelBlock, index) => (
    <Allotment.Pane key={index} minSize={BLOCK_HEADER_HEIGHT_NUMBER}>
      {panelBlock.block}
    </Allotment.Pane>
  ));
  const panelHeaderTitle = useMemo(() => {
    return blocks?.map((panelBlock) => panelBlock.title).join(" | ");
  }, [blocks]);
  
  // calculate the height of the content part of the panel
  const panelContentWithoutPageHeader = useMemo(
    () => `calc(100% - ${PAGE_HEADER_HEIGHT_NUMBER}px)`,
    []
  );

  return (
    <Container
      bg="primaryBgLight"
      p="0"
      maxW="full"
      maxH="full"
      h="full"
      w="full"
    >
      <Flex
        fontSize={size}
        alignItems={"center"}
        h={PAGE_HEADER_HEIGHT}
        w="full"
        px="4"
        bg="primaryBgHeavy"
      >
        <Box h="fit-content">{panelHeaderTitle}</Box>
      </Flex>
      <Container
        w="full"
        p="0"
        h={panelContentWithoutPageHeader}
        maxW="full"
        maxH="full"
      >
        <Allotment vertical>{blockItems}</Allotment>
      </Container>
    </Container>
  );
}
