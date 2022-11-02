import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import {CarrelMenuItem, CarrelMenuItemType, MenuItemProps} from './CarrelMenu';
import {CarrelMenu} from './CarrelMenu';
import { Button } from '@chakra-ui/react';

// Learn how to write stories:
// https://web.docs.shopify.io/docs/guides/storybook/how-to-write-story-files
const meta: Meta = {
  component: CarrelMenu,
  parameters: {
    // Embedding Figma designs
    // The embed appears in the "Design" tab of the story
    // Learn more: https://pocka.github.io/storybook-addon-designs/?path=/docs/docs-figma-readme--page
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...?node-id=...',
    },
  },
};

export default meta;

// 👇 We create a "template" of how args map to rendering
const Template: StoryFn<MenuItemProps> = (args) => <CarrelMenu {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  rootItem: {
    type: CarrelMenuItemType.Item,
    subItems: [
      {
        type: CarrelMenuItemType.Item,
        label: 'New directory',
        command: (e: Event, data) => {
          alert('Open directory: ' + data);
        },
        data: 'data',
        shortcut: 'Ctrl+Shift+N',
      },
      {
        type: CarrelMenuItemType.Separator,
      },
      {
        type: CarrelMenuItemType.Item,
        label: 'Open',
      }
    
    ] as CarrelMenuItem<any>[],
    label: "Menu",
  }
};
