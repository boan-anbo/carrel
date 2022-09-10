import {expect, it} from 'vitest'
import {disambiguateGraph, InteractGraphEdge, InteractGraphNode} from "./extract-graph-data";

it('renders correctly', () => {

    const node1 = new InteractGraphNode({
        id: 1, uuid: undefined

    })
    const node2 = new InteractGraphNode({
        id: 2, uuid: undefined
    });

    const nodes = [node1, node2];

    const edge1 = new InteractGraphEdge({
        sourceId: 1, targetId: 2, weight: 0

    })
    const edge2 = new InteractGraphEdge({
        sourceId: 1, targetId: 2, weight: 0
    })
    const edges = [edge1, edge2];

    const disambiguatedEdges = disambiguateGraph(nodes, edges);


    expect(disambiguatedEdges.nodes.length).equals(nodes.length + 1);
    expect(disambiguatedEdges.edges.length).equals(edges.length);
    // expect(disambiguatedEdges.edges[0].target).not.equal(edge1.target);
    expect(disambiguatedEdges.nodes.length).equals(3);

})
