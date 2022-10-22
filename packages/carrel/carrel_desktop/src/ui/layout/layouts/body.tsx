import {Workarea} from "./workarea/Workarea";
import {Inspector} from "../inspector/inspector";
import {Box, Container, Flex} from "@chakra-ui/react";
import {LeftMenu} from "../nav/LeftMenu/LeftMenu";

function RightInspector() {
    return <Container maxW='full' px='0' h='full'>
        <Inspector/>
    </Container>;
}

export function Body() {
    return (
        <Container p="0" maxW="full" maxH='full' h='full'>
            <Flex gap='0' h='full'>
                <Box w="100px" bg={"primaryBg"}>
                    <LeftMenu/>
                </Box> 
                <Box w="full">
                    <Workarea/>
                </Box>

                {/* <Box w="400px">
                    <RightInspector/>
                </Box> */}
            </Flex>
        </Container>
    );
}
