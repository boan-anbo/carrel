import { ChakraProvider } from "@chakra-ui/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "allotment/dist/style.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../src/App";
import store from "../src/front/store/store";
import { carrelTheme } from "../src/ui/styles/theme";
import styles from "../src/App.module.scss";

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
  (Story: any) => (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={carrelTheme}>
            <Tooltip.Provider>
              <Story className={styles.App} />
            </Tooltip.Provider>
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  ),
];
