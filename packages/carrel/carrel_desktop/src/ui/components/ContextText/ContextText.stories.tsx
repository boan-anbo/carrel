import type { Meta, StoryFn } from "@storybook/react";

import type { ContextTextProps } from "./ContextText";
import { ContextText } from "./ContextText";

// Learn how to write stories:
// https://web.docs.shopify.io/docs/guides/storybook/how-to-write-story-files
const meta: Meta = {
  component: ContextText,
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
const Template: StoryFn<ContextTextProps> = (args) => <ContextText {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  context: `NOTES AND DISCUSSIONS 315 organization is dynamically constituted in tim ative, realizing no doubt the vagueness of th physiological hypothesis to inflate its frail fabri be sympathetic. Every psychologist who has at ness has come up against this problem. And w recognition of the problem of the gross phenomen unconscious inference, apperception, attention, instinct, purpose, drive, conation, and now insig one bit further along. When one considers the book as a whole, one s from assurance at the beginning to incertitude are but little polemical, and I have nothing bu candor in thinking aloud and in exposing hypo This is Gestalt psychology as psychology and find this spirit in the earlier chapters where th dummy antagonists. That, I think, is Gestalt there are really two such different Gestalt psycho double personality has been received with such m Harvard University EDWIN G. BORING 14"There they stood ranged along the hill-sides! . slug-horn to my lips I set and blew." Poetical quota but the picture that I have in mind is given by the Childe Roland to the Dark Tower Came. SOME DETERMINING FACTORS IN MAZE-PERFORMANCE As a result of experiments on animal learning a great deal of attention has been paid to the establishment of the conditions which underlie efficient maze- performance. The conditions are complex and writers have tended to emphasize one condition or another without-so it seems to the present writer-gaining a satisfactory picture of the various interrelationships involved.' Among the factors which determine efficient maze-performance it is possible to distinguish at least three primary variables: 'knowledge,' 'reward,' and 'drive.' There is also a secondary variable, 'reward-value,'2 which is dependent upon all three of these. Let us then examine these variables and see how they are related to maze-performance and to each other. Knowledge is a requisite for efficient maze-performance. The rat must 'know' the maze if he is to traverse it rapidly and with a minimum of errors. And here we should note that the usual 'learning' experiment deals only with this relationship, measuring knowledge in terms of maze-performance. Blod- 'Professor Tolman has referred to the present analysis in a paper read at The Ninth International Congress of Psychology at New Haven, September 6, 1929. See E. C. Tolman, Maze-performance as a function of motivation and of reward as well as of knowledge of maze-paths, Proc. IX Internat. Cong. Psychol., 1929, 439f. 2The term 'reward-value' has been used with a slightly more limited meaning by Katherine A. Williams. This content downloaded from 128.36.7.166 on Sun, 10 Jul 2022 00:42:43 UTC`,
};
