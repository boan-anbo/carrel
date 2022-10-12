import {lightTheme} from '../src/styles/light.css';
import '../src/index.css';
import React from 'react';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <Provider theme={defaultTheme}>
      <div className={lightTheme}>
        <Story />
      </div>
    </Provider>
  ),
];
