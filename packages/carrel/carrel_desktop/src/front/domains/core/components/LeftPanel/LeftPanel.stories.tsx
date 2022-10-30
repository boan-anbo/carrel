import type { Meta, StoryFn } from "@storybook/react";

import { Flex } from "@chakra-ui/react";
import { mockProjectDirectory } from "../../../../../../test/fixtures/mock-vars";
import { RightPanel } from "../RightPanel";
import type { LeftPanelProps } from "./LeftPanel";
import { LeftPanel } from "./LeftPanel";

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: LeftPanel,
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
const Template: StoryFn<LeftPanelProps> = (args) => (
  <Flex h='1000px'>
    <LeftPanel {...args} />
    <RightPanel />
  </Flex>
);

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  projectDirectory: mockProjectDirectory,
};
