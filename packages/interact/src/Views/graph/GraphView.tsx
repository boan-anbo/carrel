import {IUserEdge, IUserNode} from "@antv/graphin";
import {useState} from "react";
import {Graph} from "./Graph";
import {extractGraphData} from "./extract-graph-data";
import {useGetInteractionFullQuery} from "../../clients/grl-client/interact_db_client";

export function GraphView(props: { id: number }) {


    if (!props.id) {
        return <div>No id is provided for the graph</div>
    }

    const [nodes, setNodes] = useState<IUserNode[]>([]);
    const [edges, setEdges] = useState<IUserEdge[]>([]);
    const [showRawInteraction, setShowRawInteraction] = useState<boolean>(false);

    // get data from apollo client
    const {data, loading, error} = useGetInteractionFullQuery(
        {
            variables: {
                id: props.id
            }
        }
    )
    const graph = data?.interactionFull.graph;

    if (loading) {
        return <div>Loading...</div>
    }

    console.log('Loaded data', data);


    const load = () => {
        console.log("Loading raw  graph");
        if (graph) {
            console.log("Raw  graph", graph);
            // @ts-ignore
            const {nodes, edges} = extractGraphData(graph);
            console.log("Extracted nodes", nodes);
            setEdges(edges);
            setNodes(nodes);
            console.log(nodes);
        } else {
            console.log("No graph data");
        }
    }


    return (
        <div>
            <div>
                <button onClick={() => {
                    load();
                }}>Load
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setShowRawInteraction(!showRawInteraction);
                    }}>Show raw interaction
                </button>
            </div>
            <div
                onMouseDown={e => e.stopPropagation()}
                style={{
                    width: "100%",
                    height: "100%",
                }}>
                <Graph

                    edges={edges} nodes={nodes}/>

                {showRawInteraction && <pre>{JSON.stringify({
                    nodes,
                    edges
                })}</pre>}
            </div>

        </div>
    )
}

