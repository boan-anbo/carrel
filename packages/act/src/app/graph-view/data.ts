import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';

export const sampleNodes: Node[] = [
  {
    id: 'first',
    label: 'A'
  }, {
    id: 'second',
    label: 'B'
  }, {
    id: 'c1',
    label: 'C1'
  }, {
    id: 'c2',
    label: 'C2'
  }
];

export const sampleClusters: ClusterNode[] = [
  // {
  //   id: 'third',
  //   label: 'C',
  //   childNodeIds: ['c1', 'c2']
  // }
]

export const sampleLinks: Edge[] = [
  {
    id: 'a',
    source: 'first',
    target: 'second',
    label: 'is parent of'
  }, {
    id: 'b',
    source: 'first',
    target: 'c1',
    label: 'custom label'
  }, {
    id: 'c',
    source: 'first',
    target: 'c1',
    label: 'custom label'
  }, {
    id: 'd',
    source: 'first',
    target: 'c2',
    label: 'custom label'
  }
];
