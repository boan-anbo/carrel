import { Container } from "@chakra-ui/react";
import { Allotment } from "allotment";
import { LeftPanel } from "../../../../front/domains/core/components/LeftPanel";
import { RightPanel } from "../../../../front/domains/core/components/RightPanel";
import { WorkareaRoutingCenter } from "../../routing-center/WorkareRoutingCenter";

export interface WorkAreaProps {}
export function Workarea() {
  return (
    <Container maxH="full" w="full" h="full" maxW="full" p="0">
      <Allotment>
        {/* Left panel area */}
        <Allotment.Pane snap minSize={300} preferredSize={200}>
          {/* The boxes are here to provide scrollable area*/}
          <LeftPanel />
        </Allotment.Pane>

        {/* Center */}
        <Allotment.Pane>
          <WorkareaRoutingCenter />
        </Allotment.Pane>
        {/* Right panel */}
        <Allotment.Pane preferredSize={500} snap minSize={200}>
          <RightPanel />
        </Allotment.Pane>
      </Allotment>
    </Container>
  );
}
