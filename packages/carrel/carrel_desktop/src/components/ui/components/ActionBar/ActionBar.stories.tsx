import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import type {ActionBarProps} from './ActionBar';
import {ActionBar} from './ActionBar';
import { FaceIcon } from '@radix-ui/react-icons';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: ActionBar,
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
const Template: StoryFn<ActionBarProps> = (args) => <ActionBar {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  items: [
    {
      icon: <FaceIcon />,
      label: "Icon label",
      command: () => console.log("command"),
      tooltip: "Tooltip",
    },
    {
      icon: undefined,
      label: "Label only",
      command: () => console.log("command"),
      tooltip: "Tooltip",
    },
    {
      icon: <FaceIcon />,
      label: undefined,
      command: () => console.log("command"),
    },
  ],
};
