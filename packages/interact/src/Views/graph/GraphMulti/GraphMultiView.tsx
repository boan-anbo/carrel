import React, {useEffect} from 'react';
import Graphin, {Behaviors, GraphinTreeData, Utils} from '@antv/graphin';
import {Card, Col, Row} from 'antd';

const {TreeCollapse} = Behaviors;
const data = Utils.mock(2000).tree().graphinTree();

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

const layouts = [

    {
        type: 'dendrogram',
        options: {
            direction: 'TB', // H / V / LR / RL / TB / BT
            nodeSep: 40,
            rankSep: 100,
        },
        title: '生态树布局',
    },

];

export default () => {
    useEffect(() => {
        return () => {
            console.log('data', data)
        };
    }, [data]);

    return (
        <div>
            <Row gutter={[12, 12]}>
                {layouts.map(item => {
                    const {type, options, title} = item;
                    const desc = <code>{`type:${type}`}</code>;
                    return (
                        <Col span={24} key={type}>
                            <Card title={title} extra={desc}>
                                <Graphin
                                    data={data}
                                    layout={{type, ...options}} fitView>
                                    <TreeCollapse/>
                                </Graphin>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};
