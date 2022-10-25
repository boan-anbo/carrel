import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import {DataTreeRoot, DataTreeRootProps} from './DataTreeRoot';
import { DataTreeConfigState, EDataTreeNodeType } from './i-data-tree-node';
import { Badge, Box } from '@chakra-ui/react';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: DataTreeRoot,
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
const Template: StoryFn<DataTreeRootProps<any>> = (args) => <DataTreeRoot {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  config: new DataTreeConfigState({
    enableFilter: true,
    useBuiltInFilter: true,
    filterFields: [['label']],
    selectionMode: 'single',
  }),
  onSelectionsChange: (selections: any) => {
    console.log("Onselections change", selections);
  },
  treeNodes: [
    {
      key: "1",
      label: "Item 1",
      type: EDataTreeNodeType.ITEM,
      subCollections: [],
      subItems: [],
      collectionIconOpen: <Box bg="red">Open</Box>,
    },
    {
      key: "I",
      type: EDataTreeNodeType.COLLECTION,
      label: "Collection I",
      order: 1,
      subItems: [
        {
          key: "I.1",
          type: EDataTreeNodeType.ITEM,
          label: <Badge colorScheme="orange">Item 1</Badge>,
          order: 1,
        },
        {
          key: "I.2",
          type: EDataTreeNodeType.ITEM,
          label: "Item I.2",
          order: 2,
        },
      ],
      subCollectionIds: [],
      subItemIds: [],
      subCollections: [
        {
          key: "I.I",
          type: EDataTreeNodeType.COLLECTION,
          label: "Collection I.I",
          order: 1,
          subItems: [
            {
              key: "I.I.1",
              type: EDataTreeNodeType.ITEM,
              label: "Item I.I.1",
              order: 1,
            },
            {
              key: "I.I.2",
              type: EDataTreeNodeType.ITEM,
              label: "Item I.I.2",

              order: 2,
            },
          ],
          subCollectionIds: [],
          subItemIds: [],
          subCollections: [
            {
              key: "I.I.I",
              type: EDataTreeNodeType.COLLECTION,
              label: "Collection I.I.I.1",
              order: 1,
              subItems: [
                {
                  key: "I.I.I.1",
                  type: EDataTreeNodeType.ITEM,
                  label: "Item I.I.I.1",
                  order: 1,
                }
              ],
              subCollections: [],
            },
          ],
        },
      ],
    },
  ],
  size: "xs",
};
