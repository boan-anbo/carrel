import React from "react";
import type { Meta, StoryFn } from "@storybook/react";

import type { PanelProps } from "./Panel";
import { Panel } from "./Panel";
import { Block } from "../../../components";
import { Box } from "@chakra-ui/react";
import { v4 } from "uuid";
import { ProjectFileBlock } from "../../../../front/domains/core/components/ProjectFileBlock";
import { ArchiveFileBlock } from "../../../../front/domains/core/components/ArchiveFileBlock";
import { TagBlock } from "../../../../front/domains/core/components/TagBlock";
import { CardBlock } from "../../../../front/domains/core/components/CardBlock";
import { InspectorBlock } from "../../../../front/domains/core/components/InspectorBlock";
import { TagTree } from "../../../../front/domains/core/components/TagTree/TagTree";

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: Panel,
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
const Template: StoryFn<PanelProps> = (args) => (
  <Box h="800px" w="600px">
    <Panel {...args} />
  </Box>
);

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  size: "xs",
  blocks: [
    {
      id: v4(),
      title: "Block 1",
      block: "Test content",
    },
    {
      id: v4(),
      title: "Block 2",
      block: "Test content",
    },
  ],
};

export const RightPanel = Template.bind({});

// Story args
RightPanel.args = {
  size: "xs",
  blocks: [
    {
      id: "inspector-block",
      block: <TagTree />,
      title: "Inspector",
    }
  ],
};
  
