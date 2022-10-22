import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import type {BlockActionsProps} from './BlockActions';
import {BlockActions} from './BlockActions';
import { ActionBar } from '../../../ActionBar/ActionBar';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: BlockActions,
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
const Template: StoryFn<BlockActionsProps> = (args) => <BlockActions {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  actionBar: <ActionBar items={[
    {
      label: 'Action 1',
      icon: 'add',
      tooltip: 'Action 1 tooltip',
      command: () => console.log('Action 1'),
    },
    {
      label: 'Action 2',
      icon: 'add',
      tooltip: 'Action 2 tooltip',

      command: () => console.log('Action 2'),
    },
    
  ]} />,
};
