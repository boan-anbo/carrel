import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  StackDivider,
} from "@chakra-ui/react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { ReactNode, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getViewDefaultName } from "../../../../front/store/slices/view-state/get-view-default-name";
import { getViewById } from "../../../../front/store/slices/view-state/get-views-by-id";
import {
  toggleViewStateVisibility,
  ViewState,
} from "../../../../front/store/slices/view-state/view-state";
import { Tooltip } from "../../../components";
import { TCarrelSize } from "../../../props/i-size";
import {
  BLOCK_HEADER_HEIGHT_NUMBER,
  PAGE_HEADER_HEIGHT,
  PAGE_HEADER_HEIGHT_NUMBER,
} from "../../../styles/constants";

export interface PanelProps {
  blocks?: PanelBlock[];
  size: TCarrelSize;
}

export interface PanelBlock {
  title: string;
  block: ReactNode;
  initialUnfoldSize?: number;
  id: string;
  visible: boolean;
  uuid: string;
}

export const viewStateToPanelBlock = (viewState: ViewState<any>) => {
  return {
    id: viewState.id,
    block: getViewById(viewState.id),
    title: getViewDefaultName(viewState.id),
    visible: viewState.visible,
    uuid: viewState.uuid,
  } as PanelBlock;
};

/**
 * THis is the main panel for displaying the core panels.
 */
export function Panel({ blocks, size }: PanelProps) {
  const dispatch = useDispatch();

  const togglePanelBlockVisibility = (uuid: string) => {
    dispatch(
      toggleViewStateVisibility({
        uuid,
      })
    );
  };
  const blockItems = blocks
    ?.filter((block) => block.visible)
    .map((panelBlock, index) => (
      <Allotment.Pane key={index} minSize={BLOCK_HEADER_HEIGHT_NUMBER}>
        {panelBlock.block}
      </Allotment.Pane>
    ));
  const panelBlockTitles = useMemo(() => {
    return blocks?.map((panelBlock) => (
      <Tooltip content={`Toggle ${panelBlock.title}`}>
        <Box
        userSelect='none'
          // line through
          cursor={"pointer"}
          textDecoration={panelBlock.visible ? "none" : "line-through"}
          onClick={(_) => togglePanelBlockVisibility(panelBlock.uuid)}
        >
          {panelBlock.title}
        </Box>
      </Tooltip>
    ));
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
        <HStack h="fit-content" divider={<StackDivider />}>
          {panelBlockTitles}
        </HStack>
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
