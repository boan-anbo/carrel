import {IUserEdge, IUserNode} from "@antv/graphin";
import {useState} from "react";
import {Graph} from "./Graph";
import {extractGraphData} from "./extract-graph-data";
import {useGetInteractionFullQuery} from "../grl-client/interact_db_client";

export function GraphComponent(props: { id: number }) {

    if (!props.id) {
        return <div>No id is provided for the graph</div>
    }

    const [nodes, setNodes] = useState<IUserNode[]>([]);
    const [edges, setEdges] = useState<IUserEdge[]>([]);

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
    const load = () => {
        if (graph) {
            console.log(graph);
            // @ts-ignore
            const {nodes, edges} = extractGraphData(graph);
            setEdges(edges);
            setNodes(nodes);
            console.log(nodes);
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => {
                    load();
                }}>Load
                </button>
            </div>
            <div style={{
                width: "100vw",
                height: "80vh"
            }}>
            <Graph edges={edges} nodes={nodes}  />
                </div>
        </div>
    )
}

