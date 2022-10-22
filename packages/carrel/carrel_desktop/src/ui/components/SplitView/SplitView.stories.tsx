import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import type {SplitViewProps} from './SplitView';
import {SplitView} from './SplitView';
import { Container } from '@chakra-ui/react';
import { Block } from '../Block';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: SplitView,
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
const Template: StoryFn<SplitViewProps> = (args) => (
  <Container bg='gray.100' h='80vh' w="full" maxW="full">
    <SplitView {...args} />
  </Container>
);

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  first: <Block title="block title 1">First</Block>,
  second: <Block title="block title 2">Second</Block>,
};
