import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import type {SelectListProps} from './SelectList';
import {SelectList} from './SelectList';
import { Container } from '@chakra-ui/react';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
    component: SelectList,
    parameters: {
        // Embedding Figma designs
        // The embed appears in the "Design" tab of the story
        // Learn more: https://pocka.github.io/storybook-addon-designs/?path=/docs/docs-figma-readme--page
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/...?node-id=...',
        },
    },
    argTypes: {
        items: {
            control: {
                type: 'object',
            },
        },
        listHeader: {
            control: {
                type: 'object',
            },
        },
        onSelectionChanged: {
            control: {
                type: 'object',
            },
        },
    },
};


export default meta;

// 👇 We create a "template" of how args map to rendering
const Template: StoryFn<SelectListProps<any>> = (args) => (
  <Container h='800px'>
    <SelectList {...args} />
  </Container>
);
;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
const sampleItems = [
    {
        key: "1",
        option: "Option 1 long file name that is really long",
        data: "Option 1 data",
        tooltip: "Option 1 tooltip",
    },
    {
        key: "2",
        option: "Option 2",
        data: "Option 2 data",
        tooltip: "Option 2 tooltip",
    },
    {
        key: "3",
        option: "Option 3",
        data: "Option 3 data",
    }
];

Basic.args = {
    listTitle: "Select an option",
    items: sampleItems,
};
