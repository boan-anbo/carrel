import {Box, Center, Container, VStack} from "@chakra-ui/react";
import {invoke} from "@tauri-apps/api";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import {Body} from "./components/core/layouts/body";
import HeaderMenu from "./components/core/nav/HeaderMenu/HeaderMenu";
import "./theme.css";
import "./App.css"
import FooterStatus from "./components/core/StatusBar/FooterStatus";
import "allotment/dist/style.css";
import { BODY_HEIGHT, FOOTER_HEIGHT, HEADER_HEIGHT } from "./styles/constants";
export interface AppProps {
}

function App() {
    useEffect(() => {
        invoke("launch_carrel_server").then((result) => {
            console.log("launch_carrel_server result: ", result);
        });
    })
    return (
        <Container h='100vh' m='0' maxW="full" maxH="full" px="0" py='0'>
            {/* Spacing needs to be 0 to avoid having space between body and header*/}
            <VStack h='100%' spacing='0' w='full'>
                <Center py='0' h={HEADER_HEIGHT} w="100%">
                    <HeaderMenu/>
                </Center>
                <Box py='0' h={BODY_HEIGHT} w={'full'}>
                    <Body></Body>
                </Box>
                <Box h={FOOTER_HEIGHT} w="full">
                    <FooterStatus/>
                </Box>
            <ToastContainer/>
            </VStack>
        </Container>
    );
}

export default App;
