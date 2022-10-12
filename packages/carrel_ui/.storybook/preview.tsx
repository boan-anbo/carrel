import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import "../src/index.scss";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const queryClient = new QueryClient();
export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];
