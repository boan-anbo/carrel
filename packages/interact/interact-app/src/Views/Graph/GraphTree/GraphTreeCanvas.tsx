import {Layout} from "@antv/graphin/lib/typings/type";
import {Interaction} from "../../../BackEnd/grl-client/interact_db_client";
import {GraphinTreeDataWithI} from "../../../BackEnd/interact-db-client/graph-operations";
import {Card} from "antd";
import Graphin from "@antv/graphin";
import React from "react";
import {GraphTreeViewBehavior} from "./GraphTreeViewBehavior";
import {ContextMenu} from "@antv/graphin-components";
import {DeleteFilled, ExpandAltOutlined, TagFilled} from "@ant-design/icons";
import {Item} from "@antv/graphin-components/lib/ContextMenu/Menu";

interface GraphTreeViewProps {
    layout: Layout;
    rootInteraction: Interaction | null;
    data: GraphinTreeDataWithI;
    type: string | undefined;
    onLoadInteraction: (interactionId: number) => Promise<void>;
    onSelectInteraction: (interactionId: number) => void;
    style?: React.CSSProperties;
}

const options = [
    {
        key: 'load',
        icon: <TagFilled/>,
        name: 'Load',
    },
    {
        key: 'delete',
        icon: <DeleteFilled/>,
        name: 'Delete',
    },
    {
        key: 'expand',
        icon: <ExpandAltOutlined/>,
        name: '扩散',
    },
];
const {Menu} = ContextMenu;

export function GraphTreeCanvas(props: GraphTreeViewProps) {
    function onMenuChange(item: Item, data: any) {
        console.log(item, data);
        props.onLoadInteraction(data.interactionId);
    }

    return <Card
        title={props.layout.title} extra={<code>{props.rootInteraction?.label ?? "Interaction"}</code>}>
        <Graphin
            animateCfg={{
                duration: 5,
                easing: 'easeLinear',
                onFrame: undefined,
            }}

            defaultEdge={{
                // @ts-ignore
                "type": 'cubic-horizontal',
            }}
            style={props.style}
            data={props.data}
            layout={{type: props.type, ...props.layout.options}} fitView>
            <GraphTreeViewBehavior
                onLoadInteraction={props.onLoadInteraction}
                onSelectInteraction={props.onSelectInteraction}
            />
            <ContextMenu style={{width: '80px'}}>
                <Menu
                    options={options} bindType={'node'} onChange={onMenuChange}/>
            </ContextMenu>
        </Graphin>
    </Card>
}
