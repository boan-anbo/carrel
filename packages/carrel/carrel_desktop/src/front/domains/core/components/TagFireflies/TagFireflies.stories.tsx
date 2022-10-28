import type { Meta, StoryFn } from "@storybook/react";

import { Container, HStack } from "@chakra-ui/react";
import { mockProjectDirectory } from "../../../../../../test/fixtures/mock-vars";
import type { TagFirefliesProps } from "./TagFireflies";
import { TagFireflies } from "./TagFireflies";
import { TagTree } from "../TagTree";

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: TagFireflies,
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
const Template: StoryFn<TagFirefliesProps> = (args) => (
  <Container maxW="full" w="full">
    <HStack>
      <TagTree />
      <TagFireflies {...args} />
    </HStack>
  </Container>
);

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
};
