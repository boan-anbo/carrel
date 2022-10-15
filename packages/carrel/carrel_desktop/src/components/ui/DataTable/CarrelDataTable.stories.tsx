import type { ComponentStory, Meta } from '@storybook/react';
import React, { useMemo } from 'react';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Firefly } from '../../../carrel_server_client/carrel/common/firefly/v2/firefly_v2_pb';
import { IndeterminateCheckbox } from './CarrelDataCheckBox';
import { CarrelDataTable } from "./CarrelDataTable";
import { CarrelDataTableDisplay } from './CarrelDataTableRender';
import { Block } from '../components';


// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: CarrelDataTableDisplay,
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
const columnHelper = createColumnHelper<Firefly>();
export default meta;

interface SampleCarrelTableData {
  id: number
  column1: string
  column2: string
  complexColumn: {
    key1: string
    key2: string
  }
}
// 👇 We create a "template" of how args map to rendering
const Template: ComponentStory<typeof CarrelDataTableDisplay> =(args:any) => {

  const columns = useMemo<ColumnDef<SampleCarrelTableData>[]>(
    () => [
      {
        header: "Carrel Table",
        footer: (props) => props.column.id,
        columns: [
         
          {
            accessorKey: "column1",
            cell: (props) => props.getValue(),
          },
          {
            accessorKey: "column2",
            cell: (props) => props.getValue(),
          },
          columnHelper.accessor((row) => row.metadata, {
            id: "matadata",
            header: () => "Complex Column",
            cell: (actions) => <>Complex layout</>,
          }),
        ],
      },
    ],
    []
  );

  const [sampleData, setSampleData] = React.useState<SampleCarrelTableData[]>([
    {
      id: 1,
      column1: "Column 1",
      column2: "Column 2",
      complexColumn: {
        key1: "key1",
        key2: "key2",
      },
    },
  ]);

  if (!args.data) {
    args.data = sampleData;
  }

  return (
    <Block>
        <CarrelDataTable {...args}  columns={columns} />
    </Block>
  );

};

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {

};

export const NoData = Template.bind({});

NoData.args = {
  data: [],
};

