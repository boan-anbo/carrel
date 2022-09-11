import {GraphinContext} from '@antv/graphin';
import {ContextMenu} from '@antv/graphin-components';
import {message} from 'antd';
import {DeleteFilled, ExpandAltOutlined, TagFilled} from '@ant-design/icons';
import {useContext} from "react";

// Do not forget to import CSS

const { Menu } = ContextMenu;

const options = [
    {
        key: 'tag',
        icon: <TagFilled />,
        name: '打标',
    },
    {
        key: 'delete',
        icon: <DeleteFilled />,
        name: '删除',
    },
    {
        key: 'expand',
        icon: <ExpandAltOutlined />,
        name: '扩散',
    },
];

const CanvasMenu = () => {
    const { graph, contextmenu } = useContext(GraphinContext);

    const context = contextmenu.canvas;

    const handleDownload = () => {
        graph.downloadFullImage('canvas-contextmenu');
        context.handleClose();
    };
    const handleClear = () => {
        message.info(`清除画布成功`);
        context.handleClose();
    };
    const handleStopLayout = () => {
        message.info(`停止布局成功`);
        context.handleClose();
    };

    return (
        <Menu bindType="canvas">
            <Menu.Item onClick={handleClear}>清除画布</Menu.Item>
            <Menu.Item onClick={handleStopLayout}>停止布局</Menu.Item>
            <Menu.Item onClick={handleDownload}>下载画布</Menu.Item>
        </Menu>
    );
};

export default CanvasMenu;
