import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { carrelTheme } from "../src/styles/theme";
import { Provider } from "react-redux";
import store from "../src/store/store";
import { BrowserRouter } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";
import "allotment/dist/style.css";

import { notify } from "../src/notify/notify";
import { ToastContainer } from "react-toastify";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme: carrelTheme,
  },
};

const queryClient = new QueryClient();
export const decorators = [
  (Story) => (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={carrelTheme}>
            <Tooltip.Provider>
              <Story />
            </Tooltip.Provider>
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  ),
];
