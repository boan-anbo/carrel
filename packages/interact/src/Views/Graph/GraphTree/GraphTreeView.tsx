import React, {useContext, useEffect} from 'react';
import {Behaviors, GraphinContext, GraphinTreeData, Utils} from '@antv/graphin';
import {getTreeGraph, GraphinTreeDataWithI} from "../../../BackEnd/interact-db-client/graph-operations";
import {Logger, LogSource} from "../../../Services/logger";
import {getFullInteractionById} from "../../../BackEnd/interact-db-client/filter-operations";
import {Interaction} from "../../../BackEnd/grl-client/interact_db_client";
import {Layout} from "@antv/graphin/lib/typings/type";
import FilterInteractionSingle from "../../_ViewComponents/Selectors/FilterInteractionSingle";
import {SelectValue} from "../../_ViewComponents/_ControlComponents/Select/SelectValue";
import {GraphTreeCanvas} from "./GraphTreeCanvas";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {addGraphHistory} from "../../../States/features/graph-state/graphStateSlice";
import {selectInteraction} from "../../../States/features/app-state/appStateSlice";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import {Breadcrumbs, Container, SimpleGrid, ThemeIcon} from '@mantine/core';
import {PRIMARY_COL_HEIGHT} from "../../../MainViews/PRIMARY_COL_HEIGHT";
import {Anchor} from "antd";
import {Text} from '@mantine/core';
import {IconArrowRight, IconArrowsRight, IconGraph} from "@tabler/icons";
import {Button} from '@mantine/core';

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
let layouts = [

    {
        type: 'dendrogram' as layoutType,
        options: {
            direction: 'LR', // H / V / LR / RL / TB / BT
            nodeSep: 100,
            rankSep: 250,
        },
        title: '生态树布局',
    },

] as Layout[];


const directions: string[] = [
    'V',
    'H',
    'LR',
    'RL',
    'TB',
    'BT',

]
export default (props: {
    style?: React.CSSProperties,
}) => {
    const log = new Logger(LogSource.GraphMultiView);
    const {graph, apis} = useContext(GraphinContext);

    const [defaultLayout, setDefaultLayout] = React.useState<Layout>(layouts[0]);
    const [currentLayout, setCurrentLayout] = React.useState(layouts[0]);

    const [graphData, setGraphData] = React.useState<GraphinTreeDataWithI>(data);

    const switchDirection = (direction: 'V' | 'H' | 'LR' | 'RL' | 'TB' | 'BT') => {

        const firstLayout = layouts[0];
        const newLayout = {
            ...firstLayout,
                options: {
                    ...firstLayout.options,
                    direction,
                },
            };
        log.debug("New layout is " + JSON.stringify(newLayout));
        setDefaultLayout(newLayout);
        refreshLayout();
    }
    // current selected interaction
    const selectedInteraction = useSelector((state: RootState) => state.appstate.selectedInteraction);
    useEffect(() => {

        // currentRootInteraction(graphData.interactionId)

        if (selectedInteraction) {
            const parseInteractionId = parseInt(selectedInteraction.id);
            // if is number
            if (parseInteractionId) {
                loadGraphData(selectedInteraction.id);
            }
        }

        return () => {
        };
    }, [selectedInteraction]);

    // use graph state to store the current root interaction redux state
    const graphHistory = useSelector((state: RootState) => state.graphstate.graphHistory);


    const dispatch = useDispatch();

    const [rootInteraction, setRootInteraction] = React.useState<Interaction | null>(null);

    const loadGraphData = async (interactionId: number, addToBrowseHistory = true) => {

        if (!interactionId) {
            return;
        }
        const result = await getTreeGraph(interactionId);
        log.info("Loaded Graph Data from DistantServerCardIndex", 'loaded graph', result);
        setGraphData(result);
        if (addToBrowseHistory) {
            dispatch(addGraphHistory(result));
        }

    }

    const currentRootInteraction = async (interactionId: number) => {
        if (!(interactionId > 0)) {
            return;
        }
        log.debug("Loaded root Interaction Data from DistantServerCardIndex", 'loaded interaction', interactionId);
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
        setCurrentLayout(defaultLayout);
    }

    async function onGraphTreeViewSelectInteraction(interactionId: number) {
        const fullInteraction = await getFullInteractionById(interactionId);
        log.info("Selected Interaction", 'selected interaction', fullInteraction);
        if (fullInteraction) {
            dispatch(selectInteraction(fullInteraction));
        }
    }

    function getElements() {
        const last5Elements = graphHistory.slice(Math.max(graphHistory.length - 5, 0));
        return last5Elements.map((historyItem, index) => {
                return <Anchor className={'text-xs'} key={index}>

                    <div className={'flex space-x-2'}>
                        <ThemeIcon size={'sm'} variant={'outline'} color={'cyan'}>
                            <IconGraph size={15}/>
                        </ThemeIcon>

                        <Text onClick={() => loadGraphData(historyItem.interactionId, false)} variant={'link'}>
                            {historyItem?.style?.label?.value ?? historyItem.id}
                        </Text>
                    </div>
                </Anchor>
            }
        )
    }

    //         <span
    //             onClick={() => {
    //                 loadGraphData(graph.interactionId, false);
    //             }}
    //             className={graph.interactionId.toString() == rootInteraction?.id ? 'b2-active' : 'b2'}>{graph.style?.label?.value ?? graph.interactionId.toString()}</span>);
    // }

    return (
        <Container style={{width: '100vw'}} my="md">
            <SimpleGrid cols={1} spacing="md" breakpoints={[{maxWidth: 'xl', cols: 1}]}>
                <FilterInteractionSingle style={{width: '100%'}} placeholder={'Open interact'}
                                         onSingleSelectionChange={onSelectInteractionToLoad}/>
                <div className={'flex'}>
                    {directions.map((direction, index) => {
                        return <Button
                            onClick={() => {
                                switchDirection(direction as 'V' | 'H' | 'LR' | 'RL' | 'TB' | 'BT');
                                refreshLayout();
                            }}
                            key={index}
                                       variant={'white'}>
                            {direction}
                        </Button>
                    })
                    }
                </div>
                {<GraphTreeCanvas
                    style={{width: '100%', height: '60vh'}}
                    onLoadInteraction={loadGraphData}
                    key={currentLayout.type}
                    layout={currentLayout}
                    rootInteraction={rootInteraction}
                    data={graphData}
                    type={type} onSelectInteraction={onGraphTreeViewSelectInteraction}/>
                }
                <Breadcrumbs separator={<IconArrowRight color={'teal'}/>}>
                    {getElements()}

                </Breadcrumbs>
            </SimpleGrid>
        </Container>
    );
};
