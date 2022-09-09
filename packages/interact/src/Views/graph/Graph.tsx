import Graphin from '@antv/graphin';
import {MiniMap} from '@antv/graphin-components';
// Import icon resource files
import '@antv/graphin-icons/dist/index.css';
import {IGraphProps} from "./IGraphProps";


// include data props of graphic user nodes
export const Graph = (pros: IGraphProps) => {
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
