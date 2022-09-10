import React, {useContext, useEffect} from 'react';
import {Behaviors, GraphinContext, GraphinTreeData, IG6GraphEvent, Utils} from '@antv/graphin';
import {getTreeGraph, GraphinTreeDataWithI} from "../../../BackEnd/clients/interact-db-client/graph-operations";
import {Logger, LogSource} from "../../../Services/logger";
import {getFullInteractionById} from "../../../BackEnd/clients/interact-db-client/filter-operations";
import {Interaction} from "../../../BackEnd/clients/grl-client/interact_db_client";
import {Layout} from "@antv/graphin/lib/typings/type";
import FilterInteractionSingle from "../../ViewComponents/FilterControls/FilterInteractionSingle";
import {SelectValue} from "../../ViewComponents/FilterControls/FilterComponents/SelectValue";
import {INode, NodeConfig} from '@antv/g6';
import {GraphTreeView} from "./GraphTreeView";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {addGraphHistory} from "../../../States/features/graph-state/graphStateSlice";
import {selectInteraction} from "../../../States/features/app-state/appStateSlice";

const {TreeCollapse} = Behaviors;
const data = Utils.mock(5).tree().graphinTree() as GraphinTreeDataWithI;

const walk = (node: GraphinTreeData, callback: (node: GraphinTreeData) => void) => {
    callback(node);
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            walk(child, callback);
        });
    }
};

walk(data, node => {
    node.style = {
        label: {
            value: node.id,
        },
    };
});

type layoutType = 'dendrogram' | 'mindmap'
const layouts = [

    {
        type: 'dendrogram' as layoutType,
        options: {
            direction: 'V', // H / V / LR / RL / TB / BT
            nodeSep: 40,
            rankSep: 100,
        },
        title: '生态树布局',
    },

] as Layout[];

export default () => {
    const log = new Logger(LogSource.GraphMultiView);
    const {graph, apis} = useContext(GraphinContext);

    const [layout, setLayout] = React.useState(layouts[0]);

    const [graphData, setGraphData] = React.useState<GraphinTreeDataWithI>(data);

    useEffect(() => {

        currentRootInteraction(graphData.interactionId)
        return () => {
        };
    }, []);

    // use graph state to store the current root interaction redux state
    const graphHistory = useSelector((state: RootState) => state.graphstate.graphHistory);

    const dispatch = useDispatch();

    const [rootInteraction, setRootInteraction] = React.useState<Interaction | null>(null);

    const loadGraphData = async (interactionId: number, addToBrowseHistory = true) => {

        if (!interactionId) {
            return;
        }
        const result = await getTreeGraph(interactionId);
        log.info("Loaded Graph Data from Server", 'loaded graph', result);
        setGraphData(result);
        if (addToBrowseHistory) {
            dispatch(addGraphHistory(result));
        }

    }

    const currentRootInteraction = async (interactionId: number) => {
        if (!(interactionId > 0)) {
            return;
        }
        log.debug("Loaded root Interaction Data from Server", 'loaded interaction', interactionId);
        const interactionFull = await getFullInteractionById(interactionId);
        setRootInteraction(interactionFull);
    }

    const {type} = layouts[0];

    function onSelectInteractionToLoad(selection: SelectValue<Interaction>) {
        log.info("Selected Interaction", 'selected interaction', selection);
        if (selection.value) {

            const interactionId = parseInt(selection.value, 10);
            if (interactionId > 0) {
                loadGraphData(interactionId);
            }
        }
        refreshLayout();
    }

    function refreshLayout() {
        setLayout(layouts[0]);
    }

    async function onGraphTreeViewSelectInteraction(interactionId: number) {
        const fullInteraction = await getFullInteractionById(interactionId);
        log.info("Selected Interaction", 'selected interaction', fullInteraction);
        if (fullInteraction) {
            dispatch(selectInteraction(fullInteraction));
        }
    }

    return (
        <div>
            <div className={'w-50p m-2'}>
                <FilterInteractionSingle style={{width: '100%'}} placeholder={'Open interact'}
                                         onSelect={onSelectInteractionToLoad}/>
            </div>
            <div >
                {<GraphTreeView
                    style={{height: '1200px'}}
                    onLoadInteraction={loadGraphData}
                    key={layout.type}
                    layout={layout}
                    rootInteraction={rootInteraction}
                    data={graphData}
                    type={type} onSelectInteraction={onGraphTreeViewSelectInteraction}/>
                }
            </div>
            <div>
                Browse History{graphHistory.map(graph => <span
                onClick={() => {
                    loadGraphData(graph.interactionId, false);
                }}
                className={graph.interactionId.toString() == rootInteraction?.id ? 'b2-active' : 'b2'}>{graph.style?.label?.value ?? graph.interactionId.toString()}</span>)}
            </div>
        </div>
    );
};
