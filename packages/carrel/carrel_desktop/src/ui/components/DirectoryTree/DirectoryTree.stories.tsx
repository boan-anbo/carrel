import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import type {DirectoryTreeProps} from './DirectoryTree';
import {DirectoryTree} from './DirectoryTree';
import * as fs from 'fs';
import { GetDirectoryTreeResponse } from '../../../backend/carrel_server_client/carrel/server/fs_manager/v1/server_fs_manager_v1_pb';
import { mockProjectDirectory } from '../../../../test/fixtures/mock-vars';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: DirectoryTree,
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
const Template: StoryFn<DirectoryTreeProps> = (args) => <DirectoryTree {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  // use node fs to load "directory-tree-sample-data.json"
  root_directory: "D:\\Dropbox\\NEra\\[W] Writing Projects\\[Dissertation]\\2022_10_01 - fall_draft",
};

export const DbOnly = Template.bind({});

DbOnly.args = {
  root_directory: "D:\\Dropbox\\NEra\\[W] Writing Projects\\[Dissertation]\\2022_10_01 - fall_draft",
  fileMasks: [

    new RegExp(".*\\.db$"),
  ] as RegExp[],
};
