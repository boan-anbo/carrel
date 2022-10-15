import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';
import { FaceIcon } from '@radix-ui/react-icons';
import type {ActionBarItemProps} from './ActionBarItem';
import {ActionBarItem} from './ActionBarItem';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: ActionBarItem,
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
const Template: StoryFn<ActionBarItemProps> = (args) => <ActionBarItem {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  item: {
    icon: <FaceIcon />,
    label: "Label",
    command: () => console.log("command"),
    tooltip: "Tooltip",
  },
};

export const IconOnly = Template.bind({});

IconOnly.args = {
  item: {
    icon: <FaceIcon />,
    label: "",
    command: () => console.log("command"),
  },
};
