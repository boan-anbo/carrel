import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./front/store/store";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, Container, HStack } from "@chakra-ui/react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Tooltip from "@radix-ui/react-tooltip";
import { notify } from "./front/services/notify/notify";
import { ToastContainer } from "react-toastify";
import {carrelTheme} from "./ui/styles/theme";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => {
      console.log(e);
      // @ts-ignore
      notify.error(e.message as unknown as string);
    },
  }),
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={carrelTheme}>
    <React.StrictMode>
      {/*  Add redux provider */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Tooltip.Provider>
              <App  />
            </Tooltip.Provider>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
    <ToastContainer />
  </ChakraProvider>
);
