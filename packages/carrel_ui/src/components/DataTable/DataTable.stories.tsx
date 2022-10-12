import React, { useMemo, useState } from 'react';
import type {ComponentStory, Meta, StoryFn} from '@storybook/react';

import { CarrelDataTable } from './CarrelDataTable';
import { CarrelDataTableParams } from './i-carrel-data-table-params';
import { ColumnDef, getCoreRowModel, PaginationState, RowModel, Table, TableState, Updater, useReactTable } from '@tanstack/react-table';
import { Firefly } from '../../carrel_contract/carrel/common/firefly/v2/firefly_v2_pb';
import { IndeterminateCheckbox } from './CarrelDataCheckBox';
import { CommentCell } from './CommentCell';
import {ApiStandardQuery} from '../../../../carrel/carrel_desktop/src/server-api/query_utils'
import {carrelQueries} from '../../../../carrel/carrel_desktop/src/server-api/carrel-queries'
import { CarrelDataPaginator } from './CarrelDataPaginator';
const sampleData: Firefly[] = [
  {
      "description": "Highlight",
      "light": "中國知識份子的邊緣化",
      "context": "《二十一世紀》網絡版 二○○三年六月號 總第 14 期 2003年6月30日\r\n中國知識份子的邊緣化\r\n⊙ 余英時\r\n我想借這個機會提出一個比較有趣的問題，供大家討論，這個問題──中國知識份子的邊緣\r\n化──牽涉的範圍太廣，而我自己的思考也遠遠未達成熟的地步。現在我只能寫出一個簡單\r\n的提綱，我的目的是在提出問題，因為我也沒有自信這裡的提法是否合適。文中所表示的看\r\n法都屬未定之見，尤其要聲明一句的是：我所想做的是盡量客觀地展示歷史的問題，不是下\r\n價值判斷。這裡並沒有「春秋筆法」。\r\n一 從士大夫到知識份子\r\n中國傳統的士大夫（或「士」）今天叫做知識份子。但這不僅是名稱的改變，而是實質的改\r\n變。這一改變其實便是知識份子從中心向邊緣移動。\r\n1 傳統中國的士\r\n在中國傳統社會結構中，「士」號稱「四民之首」，確是佔據著中心的位置。荀子所謂「儒\r\n者在本朝則美政，在下位則美俗」大致點破了「士」的政治的和社會文化的功能。秦漢統一\r\n帝國以後，在比較安定的時期，政治秩序和文化秩序的維持都落在「士」的身上；在比較黑\r\n暗或混亂的時期，「士」也往往負起政治批評或社會批評的任務。通過漢代的鄉舉里選和隋\r\n唐以下的科舉制度，整個官僚系統大體上是由「士」來操縱的。通過宗族、學校、鄉約、會\r\n館等社會組織，「士」成為民間社會的領導階層。無論如何，在一般社會心理中，「士」是\r\n「讀書明理」的人；他們所受的道德和知識訓練（當然以儒家經典為主）使他們成為唯一有\r\n資格治理國家和領導社會的人選。「士」的這一社會形象也許只是「神話」，也許只能證明\r\n儒家作為一種意識形態在中國文化傳統中特別成功，但這不是我所要討論的問題。我想這一\r\n形象足以說明一項基本的歷史事實：在傳統中國，「士」確是處於中心的地位。\r\n2 知識份子的出現\r\n但是進入二十世紀，中國的狀況發生了劇烈的變化，「士」已從這一中心地位退了下來，代\r\n之而起的是現代知識份子。後者雖與前者有歷史傳承的關係，然而畢竟有重要的差異。如上\r\n所述，「士」在傳統社會上是有定位的；現代知識份子則如社會學家所云，是「自由浮動\r\n的」（\"free-floating\"）。從「士」變為知識份子自然有一個過程，不能清楚地劃一條界\r\n線。不過如果我們要找一個象徵的年份，1905年（光緒三十一年）科舉制度的廢止也許是十\r\n分合適的。科舉既廢，新式學校和東西洋遊學成為教育的主流，所造就的便是現代知識份子\r\n了。清末有一則趣聞可以象徵從士到知識份子的轉變（見商衍鎏：《清代科舉考試述錄》，",
      "comment": "Page -1: Highlight Text",
      "comment_author": "Bo",
      "comment_created_at": "2021-08-22T23:52:45+05:00",
      "comment_modified_at": "2021-08-22T23:52:58+05:00",
      "location_actual": "-1",
      "location_actual_type": "pdf_page_index",
      "location_raw": "-1",
      "location_raw_type": "pdf_page_index",
      "document_title": "chn",
      "file_directory": "\\\\?\\C:\\Script\\carrel\\packages\\carrel\\carrel_core\\tests\\fixtures\\pdfs",
      "file_full_name": "chn.pdf",
      "file_extension": "pdf",
      "created_at": "2021-08-22T23:52:45+05:00",
      "modified_at": "1999-08-22T23:52:58+05:00",
      "extracted_at": "1999-10-07T02:55:00.795685700+00:00",
      "location_actual_modified_at": "1999-10-07T02:55:00.795685700+00:00",
      "document_pages": "7"
  }
]

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: CarrelDataTable,
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
const Template: ComponentStory<typeof CarrelDataTable> =(args: any) => {
  const rerender = React.useReducer(() => ({}), {})[1]
  const columns = useMemo<ColumnDef<Firefly>[]>(
    () => [
      {
        header: "Annotation",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "select",
            header: ({ table }) => (
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
            ),
            cell: ({ row }) => (
              <div className="px-1">
                <IndeterminateCheckbox
                  {...{
                    checked: row.getIsSelected(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                />
              </div>
            ),
          },
          ,
          {
            accessorKey: "light",
            cell: (props) => props.getValue(),
          },
          {
            accessorKey: "comment",
            cell: (props) => <CommentCell value={props.getValue()} />,
          },
        ],
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 100,
    });

  const query = ApiStandardQuery.fromPageIndexAndPageSize(pageIndex, pageSize);

  const dataQuery = carrelQueries.QueryFireflies(query, "mock", true);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const [rowSelection, setRowSelection] = useState({});
  // create table instance
  const table = useReactTable({
    data: dataQuery.data?.fireflies || sampleData,
    columns,
    pageCount: dataQuery.data?.responseMetadata?.resultTotalPages || -1, // use returned metadata to calculate page count
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination, // when use click a page, update the page index and page size, it will trigger a new query change and then the query change will trigger a new data fetch
    manualPagination: true,
    debugTable: true,
    enableRowSelection: true,
    enableMultiRowSelection: true,
  });

  return (
    <div>
      <CarrelDataTable {...args} table={table} />
      <CarrelDataPaginator table={table} />

      <button onClick={(e: any) => {
        setPagination({pageIndex: 0, pageSize: pageSize + 1})
      }} className={"border p-2"}>Refresh</button>
    </div>
  );
  
};

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
};
