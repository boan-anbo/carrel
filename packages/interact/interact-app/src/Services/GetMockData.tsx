import Graphin, {IUserEdge, IUserNode, Utils} from "@antv/graphin";
import iconLoader from "@antv/graphin-icons";

export const getMockData: () => { nodes: IUserNode[]; edges: IUserEdge[] } = () => {


    const {nodes, edges} = Utils.mock(10).circle().graphin();

    const propEdges = edges;

    const {fontFamily, glyphs} = iconLoader();
    const icons = Graphin.registerFontFamily(iconLoader);
    const propNodes = nodes.map(node => {

        node.style = {
            icon: {
                type: 'font', // Specify the icon to be Font type
                fontFamily: fontFamily, // Specify FontFamily
                value: icons.home, // Specify the value of the icon
            }
        }
        return node;
    });

    return {nodes: propNodes, edges: propEdges};
}
