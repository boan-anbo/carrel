import {Logger, LogSource} from "../../../utils/logger";
import {useContext, useEffect} from "react";
import {GraphinContext} from "@antv/graphin";
import {handleSingleClickOnNode} from "./HandleSingleClickOnNode";
import {handleDoubleClickOnNode} from "./HandleDoubleClickOnNode";
import {handleSingleClickOnEdge} from "./HandleClickOnEdge";
import {useSelector} from "react-redux";
import {selectInteraction} from "../../../features/app-state/appStateSlice";

export const GraphTreeViewBehavior = (props: {
    onLoadInteraction: (interactionId: number) => Promise<void>;
    onSelectInteraction: (interactionId: number) => void;
}) => {

    const {graph, apis} = useContext(GraphinContext);






    useEffect(() => {
        // 初始化聚焦到`node-1`

        apis.highlightNodeById(['0']);
        apis.focusNodeById('1');

        const handleClick = handleSingleClickOnNode(props);
        // const handleDoubleClick = handleDoubleClickOnNode(props);

        const handleClickOnEdge = handleSingleClickOnEdge(props, apis);

        // 每次点击聚焦到点击节点上
        graph.on('node:click', handleClick);
        // graph.on('node:dblclick', handleDoubleClick);
        // clicks on edge
        graph.on('edge:click', handleClickOnEdge);
        return () => {
            graph.off('node:click', handleClick);
            // graph.off('node:dblclick', handleDoubleClick);
            graph.off('edge:click', handleClickOnEdge);
        };
    }, []);
    return null;
};
