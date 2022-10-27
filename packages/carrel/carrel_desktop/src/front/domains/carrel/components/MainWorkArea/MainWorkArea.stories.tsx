import { Box, Flex } from "@chakra-ui/react";
import type { Meta, StoryFn } from "@storybook/react";
import { mockProjectDirectory } from "../../../../../../test/fixtures/mock-vars";
import { LeftPanel } from "../../../core/components/LeftPanel/LeftPanel";
import { ProjectFileBlock } from "../../../core/components/ProjectFileBlock";

import {
  EMainWorkAreaPage,
  MainWorkArea,
  MainWorkAreaProps,
} from "./MainWorkArea";

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: MainWorkArea,
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
const TemplateWithProjectFile: StoryFn<MainWorkAreaProps> = (args) => (
  <Flex w="full" h='900px'>
    <Box w="30%">
      <ProjectFileBlock directory={mockProjectDirectory} />
    </Box>
    <Box w="full">
      <MainWorkArea {...args} />
    </Box>
  </Flex>
);

// 👇 Each story then reuses that template
export const Basic = TemplateWithProjectFile.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  firstViewPage: EMainWorkAreaPage.CARREL_WRITER,
  secondViewPage: EMainWorkAreaPage.CARREL_WRITER,
};
