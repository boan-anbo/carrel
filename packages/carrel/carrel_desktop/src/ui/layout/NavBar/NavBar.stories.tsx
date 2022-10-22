import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import type {NavBarProps} from './NavBar';
import {NavBar} from './NavBar';
import { NavBarItem } from '../NavBarItem/NavBarItem';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: NavBar,
  parameters: {
    // Embedding Figma designs
    // The embed appears in the "Design" tab of the story
    // Learn more: https://pocka.github.io/storybook-addon-designs/?path=/docs/docs-figma-readme--page
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...?node-id=...',
    },
  },
  subcomponents: {
    NavBarItem,
  }
};

export default meta;

// 👇 We create a "template" of how args map to rendering
const Template: StoryFn<NavBarProps> = (args) => <NavBar {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  title: 'Carrel',
  menuBarItems: [
    <div><NavBarItem>Car111rel</NavBarItem></div>,
    <div><NavBarItem>Cabinet</NavBarItem></div>,
  ]
};
