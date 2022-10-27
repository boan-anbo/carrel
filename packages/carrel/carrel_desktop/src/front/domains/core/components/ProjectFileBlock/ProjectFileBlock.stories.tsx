import React from "react";
import type { Meta, StoryFn } from "@storybook/react";

import type { ProjectFileBlockProps } from "./ProjectFileBlock";
import { ProjectFileBlock } from "./ProjectFileBlock";
import { mockProjectDirectory } from "../../../../../../test/fixtures/mock-vars";
import { Block } from "../../../../../ui/components";

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: ProjectFileBlock,
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
const InBlockTemplate: StoryFn<ProjectFileBlockProps> = (args) => (
  <Block>
    <ProjectFileBlock {...args} />
  </Block>
);

// 👇 Each story then reuses that template
export const Basic = InBlockTemplate.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  directory: mockProjectDirectory,
};

const NoBlockTemplate: StoryFn<ProjectFileBlockProps> = (args) => (
  <ProjectFileBlock {...args} />
);

export const NoBlock = NoBlockTemplate.bind({});
NoBlock.args = {
  directory: mockProjectDirectory,
};
