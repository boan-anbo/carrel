import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/store";
import {BrowserRouter} from "react-router-dom"
import {ChakraProvider, Container, HStack} from '@chakra-ui/react'
import {carrelTheme} from './styles/theme'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as Tooltip from "@radix-ui/react-tooltip";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ChakraProvider theme={carrelTheme}>
        <React.StrictMode>
            {/*  Add redux provider */}
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Tooltip.Provider>
                            <DevSupport ComponentPreviews={ComponentPreviews}
                                        useInitialHook={useInitial}
                            >
                                <App/>
                            </DevSupport>
                        </Tooltip.Provider>
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        </React.StrictMode>
    </ChakraProvider>
);
