import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import "./App.css";

import {Layout, Responsive, WidthProvider} from "react-grid-layout";
import {InteractionGraphView} from "./Views/InteractViews/InteractionGraphView";
import {Button} from "antd";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {SelectedPassageViewer} from "./Views/InteractViews/SelectedPassageViewer";
import {SelectedTextViewer} from "./Views/ViewComponents/InteractViewComponent/SelectedTextViewer";
import {CreateOrUpdateInteractionFormView} from "./Views/InteractViews/CreatOrUpdateInteractionForm/CreateOrUpdateInteractionFormView";
import {SelectedInteractionDataViewer} from "./Views/InteractViews/SelectedInteractionDataViewer";
import {GridView, GridViewTypes} from "./Views/GridView";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayout: Layout[] = [
    {i: "input_panel", x: 0, y: 0, w: 6, h: 8, static: false},
    {i: "left_panel", x: 6, y: 0, w: 6, h: 4, static: false},
    {i: "mid_panel", x: 12, y: 0, w: 6, h: 4, static: false},
    {i: "right_panel", x: 18, y: 0, w: 6, h: 8, static: false},
    {i: "below_panel", x: 6, y: 4, w: 12, h: 4, static: false},
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
        <div>
            <div className={'flex space-x-4'}>

                {/*    Antd button */}
                <Button type="primary" onClick={() => {
                    console.log("Button clicked");
                    setLayout({...defaultLayoutGrid})
                }}>Resize</Button>
                <SelectedTextViewer/>


            </div>
            <ResponsiveGridLayout
                className="layout bg-gray-50"
                data-grid={{layout: layout}}
                layouts={
                    layout
                }

                onDrop={onResponsiveGridLayoutDrop}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 24, md: 24, sm: 24, xs: 24, xxs: 24}}
                maxRows={8}
                rowHeight={150}
                autoSize={true}
                onLayoutChange={onResponsiveGridLayoutLayoutChange}>


                <div key="input_panel" className="bg-gray-200 overflow-y-scroll">
                    {/*<DistantDocumentList/>*/}
                    <GridView selectedView={GridViewTypes.CREATE_INTERACTION_FORM}/>
                </div>

                <div key="left_panel" className='bg-red-500'>
                </div>

                <div key="mid_panel" className='bg-red-300'>
                    <SelectedInteractionDataViewer></SelectedInteractionDataViewer>
                </div>

                <div key="right_panel" className='overflow-y-scroll'>

                    <GridView selectedView={GridViewTypes.INTERACTION_CARD_VIEW}></GridView>
                </div>

                <div key="below_panel" className='bg-amber-200'>
                    <GridView selectedView={GridViewTypes.INTERACTION_GRAPH_VIEW}></GridView>
                </div>
            </ResponsiveGridLayout>
        </div>
    );
}

export default App;
