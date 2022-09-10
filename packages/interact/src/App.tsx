import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import "./App.css";

import {Layout, Responsive, WidthProvider} from "react-grid-layout";
import {Button} from "antd";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {SelectedTextViewer} from "./ViewComponents/ViewComponents/InteractViewComponent/SelectedTextViewer";
import {GridView, GridViewTypes} from "./Views/GridView";
import {MantineProvider} from "@mantine/core";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayout: Layout[] = [
    {i: "left_panel", x: 0, y: 0, w: 8, h: 8, static: false},
    {i: "mid_top", x: 8, y: 0, w: 8, h: 4, static: false},
    {i: "mid_center", x: 8, y: 4, w: 8, h: 4, static: false},
    {i: "mid_below", x: 0, y: 8, w: 24, h: 12, static: false},
    {i: "right_panel", x: 18, y: 0, w: 8, h: 8, static: false},
]

const defaultLayoutGrid = {
    lg: defaultLayout,
    md: defaultLayout,
    sm: defaultLayout,
    xs: defaultLayout,
    xxs: defaultLayout
};


function App() {

    const selectedPassage = useSelector((state: RootState) => state.appstate.selectedInputPassage);

    const [layout, setLayout] = useState<{ [P: string]: Layout[] }>(defaultLayoutGrid);


    function onResponsiveGridLayoutDrop(layout: ReactGridLayout.Layout[], item: ReactGridLayout.Layout, e: Event) {
        console.log(item)
    }

    function onResponsiveGridLayoutLayoutChange(currentLayout: ReactGridLayout.Layout[], allLayouts: ReactGridLayout.Layouts) {

        console.log(currentLayout)
    }

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <div className={'bg-black'}>
                <div className={'flex space-x-4'}>

                    {/*    Antd button */}
                    <Button type="primary" onClick={() => {
                        console.log("Button clicked");
                        setLayout({...defaultLayoutGrid})
                    }}>Resize</Button>
                    <SelectedTextViewer/>


                </div>
                <ResponsiveGridLayout
                    className="layout bg-black"
                    data-grid={{layout: layout}}
                    layouts={
                        layout
                    }

                    onDrop={onResponsiveGridLayoutDrop}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    cols={{lg: 24, md: 24, sm: 24, xs: 24, xxs: 24}}
                    maxRows={Infinity}
                    rowHeight={200}
                    autoSize={true}
                    onLayoutChange={onResponsiveGridLayoutLayoutChange}>


                    <div key="left_panel">
                        {/*<DistantDocumentList/>*/}
                        <GridView bg={'bg-white'} selectedView={GridViewTypes.CREATE_INTERACTION_FORM}/>
                    </div>

                    <div key="mid_top">
                        <GridView bg={'bg-pink-50'} selectedView={GridViewTypes.RECENT_INTERACTIONS}/>
                    </div>

                    <div key="mid_center" className=''>
                        <GridView bg={'bg-amber-50'} selectedView={GridViewTypes.TEXT_EDITOR}/>
                    </div>

                    <div key="mid_below">

                        <GridView bg={'bg-red-50'} selectedView={GridViewTypes.GRAPH_MULTI_VIEW}></GridView>
                    </div>

                    <div key="right_panel">
                        <GridView bg={'bg-green-50'} selectedView={GridViewTypes.INTERACTION_CARD_VIEW}></GridView>
                    </div>
                </ResponsiveGridLayout>
            </div>
        </MantineProvider>
    );
}

export default App;
