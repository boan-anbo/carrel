import Graphin, {GraphinData, IUserEdge, IUserNode} from '@antv/graphin';
import {MiniMap} from '@antv/graphin-components';
// Import icon resource files
import '@antv/graphin-icons/dist/index.css';


export interface GraphProps extends GraphinData {
    nodes: IUserNode[];
    edges: IUserEdge[];
}

// include data props of graphic user nodes
export const Graph = (pros: GraphProps) => {
    return (
        <Graphin

            data={{
                nodes: pros.nodes,
                edges: pros.edges,
            }}
            layout={{
                type: 'dagre'
            }}
        >
            {/*show labels*/}
            <MiniMap visible={true}/>
        </Graphin>
    );
};
