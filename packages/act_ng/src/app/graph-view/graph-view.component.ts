import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {ClusterNode, Edge, Layout, Node} from '@swimlane/ngx-graph';
import {sampleClusters, sampleLinks, sampleNodes} from './data';
import {Subject} from 'rxjs';
import {GraphqlService} from "../services/graphql.service";
import {GraphViewService} from "./graph-view.service";

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss']
})
export class GraphViewComponent implements OnInit {
  name = 'NGX-Graph Demo';

  constructor(
    private graphQlService: GraphqlService,
    private graphViewService: GraphViewService
  ) {
  }

  nodes: Node[] = sampleNodes;
  clusters: ClusterNode[]  = sampleClusters;

  links: Edge[] = sampleLinks;

  layout: string | Layout = 'dagreCluster';
  layouts: any[] = [
    {
      label: 'Dagre',
      value: 'dagre',
    },
    {
      label: 'Dagre Cluster',
      value: 'dagreCluster',
      isClustered: true,
    },
    {
      label: 'Cola Force Directed',
      value: 'colaForceDirected',
      isClustered: true,
    },
    {
      label: 'D3 Force Directed',
      value: 'd3ForceDirected',
    },
  ];


  // line interpolation
  curveType: string = 'Bundle';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false;

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  ngOnInit() {
    this.setInterpolationType(this.curveType);

    this.graphQlService.getFullInteraction(11).subscribe((data) => {
      console.log(data);
      const {nodes, links} = this.graphViewService.getNgxGraphDataFromInteractGraph(data);
      this.nodes = nodes;
      this.links = links;

      console.log('original', sampleNodes, sampleLinks);
      console.log("convereted", this.nodes, this.links);
    });
  }

  setInterpolationType(curveType: any) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  setLayout(layoutName: string): void {
    const layout = this.layouts.find(l => l.value === layoutName);
    this.layout = layoutName;
    if (!layout.isClustered) {
      this.clusters = [];
    } else {
      this.clusters = sampleClusters;
    }
  }

  onClickHandler($event: MouseEvent) {
    console.log('click handled', $event);
  }

  onClick($event: MouseEvent) {
    console.log('click', $event);
  }
}