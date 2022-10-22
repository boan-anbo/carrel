import { Box, Container, VStack } from "@chakra-ui/react";
import { Allotment } from "allotment";
import { Panel, PanelBlock } from "../../components/Panel/Panel";
import { WorkareaRoutingCenter } from "../../routing-center/WorkareRoutingCenter";

export interface WorkAreaProps {}
export function Workarea() {
  const leftPanelBlocks: PanelBlock[] = [
    {
      title: "Files",
      block: <div>Files</div>,
      id: "files",
    },
  ];

  return (
    <Container maxH="full" w="full" h="full" maxW="full" p="0">
      <Allotment>
        {/* Left panel area */}
        <Allotment.Pane snap minSize={200} preferredSize={200}>
          {/* The boxes are here to provide scrollable area*/}
          <Panel size='xs' blocks={leftPanelBlocks}></Panel>
        </Allotment.Pane>

        {/* Center */}
        <Allotment.Pane>
          <WorkareaRoutingCenter />
        </Allotment.Pane>
        {/* Right panel */}
        <Allotment.Pane preferredSize={200} snap minSize={200}>
          {<Panel></Panel>}
        </Allotment.Pane>
      </Allotment>
    </Container>
  );
}
