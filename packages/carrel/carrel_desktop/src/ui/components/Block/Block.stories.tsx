import type { Meta, StoryFn } from '@storybook/react';

import { Container, Icon } from '@chakra-ui/react';
import { FaAddressBook, FaAdjust, FaAppStoreIos, FaAudible } from "react-icons/fa";
import { ActionBar } from '../ActionBar';
import type { BlockProps } from './Block';
import { Block } from './Block';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: Block,
  parameters: {
    // Embedding Figma designs
    // The embed appears in the "Design" tab of the story
    // Learn more: https://pocka.github.io/storybook-addon-designs/?path=/docs/docs-figma-readme--page
    design: {
      type: "figma",
      url: "https://www.figma.com/file/...?node-id=...",
    },
  },
};

export default meta;

// 👇 We create a "template" of how args map to rendering
const Template: StoryFn<BlockProps> = (args) => (
  <Container>
    <Block {...args} />
  </Container>
);

;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});
// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  title: "Block title",
  children: "Block content",
  headerPosition: "left",
  topActionBar: (
    <ActionBar
      size="xs"
      items={[
        {
          label: "Block Action",
          icon: <Icon as={FaAudible} />,
          tooltip: "Block Action tooltip",
          command: () => console.log("Block Action command"),
        },
        {
          label: undefined,
          icon: <Icon as={FaAdjust} />,
          tooltip: "Block Action icon tooltip",
          command: () => console.log("Block Action icon command"),
        },
        {
          label: undefined,
          icon: <Icon as={FaAppStoreIos} />,
          tooltip: "Block Action icon tooltip",
          command: () => console.log("Block Action icon command"),
        },
      ]}
    />
  ),
  bottomActionBar: (
    <ActionBar
      items={[
        {
          label: "Block bottom action",
          tooltip: "Block bottom action tooltip",
          icon: <Icon as={FaAppStoreIos} />,
          command: () => console.log("Block bottom action command"),
        },
        {
          label: undefined,
          icon: <Icon as={FaAddressBook} />,
          tooltip: "Block bottom action icon tooltip",
          command: () => console.log("Block bottom action icon command"),
        },
      ]}
    />
  ),
};
