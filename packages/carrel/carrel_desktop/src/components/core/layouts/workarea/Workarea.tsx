import { Box, Container, VStack } from "@chakra-ui/react";
import { WorkareaRoutingCenter } from "../../routing-center/WorkareRoutingCenter";

export interface WorkAreaProps {}
export function Workarea() {
    return (
      <Container maxH="full" w='full' h="full" maxW="full" p='0' >
        <Box m='0' p='0' w="full" h="full">
          <WorkareaRoutingCenter />
        </Box>
      </Container>
    );
}
