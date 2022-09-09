import {Layout} from "@antv/graphin/lib/typings/type";
import {Interaction} from "../../../clients/grl-client/interact_db_client";
import {GraphinTreeDataWithI} from "../../../clients/interact-db-client/graph-operations";
import {Card, Col, Row} from "antd";
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
}
const options = [
    {
        key: 'load',
        icon: <TagFilled />,
        name: 'Load',
    },
    {
        key: 'delete',
        icon: <DeleteFilled />,
        name: 'Delete',
    },
    {
        key: 'expand',
        icon: <ExpandAltOutlined />,
        name: '扩散',
    },
];
const { Menu } = ContextMenu;
export function GraphTreeView(props: GraphTreeViewProps) {
    function onMenuChange(item: Item, data: any) {
        console.log(item, data);
        props.onLoadInteraction(data.interactionId);
    }

    return <Row gutter={[12, 12]}>
        <Col span={24}>
            <Card title={props.layout.title} extra={<code>{props.rootInteraction?.label ?? "Interaction"}</code>}>
                <Graphin

                    data={props.data}
                    layout={{type: props.type, ...props.layout.options}} fitView>
                    <GraphTreeViewBehavior
                        onLoadInteraction={props.onLoadInteraction}
                        onSelectInteraction={props.onSelectInteraction}
                    />
                    <ContextMenu style={{ width: '80px' }}>
                        <Menu
                            options={options} bindType={'node'} onChange={onMenuChange}/>
                    </ContextMenu>
                </Graphin>
            </Card>
        </Col>
    </Row>;
}
