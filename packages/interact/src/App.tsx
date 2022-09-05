import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import "./App.css";

import GridLayout, {Layout, Responsive, WidthProvider} from "react-grid-layout";
import {InteractionGraphView} from "./Views/InteractionGraphView";
import {Button} from "antd";
import {useState} from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayout: Layout[] = [
    {i: "left_panel", x: 0, y: 0, w: 8, h: 4, static: false},
    {i: "mid_panel", x: 8, y: 0, w: 8, h: 4, static: false},
    {i: "right_panel", x: 16, y: 0, w: 8, h: 4, static: false},
    {i: "below_panel", x: 0, y: 5, w: 24, h: 4, static: false},
]

const defaultLayoutGrid = {
    lg: defaultLayout,
    md: defaultLayout,
    sm: defaultLayout,
    xs: defaultLayout,
    xxs: defaultLayout
};


function App() {



    const [layout, setLayout] = useState<{ [P: string]: Layout[] }>(defaultLayoutGrid);


    return (
        <div>
            <div>

                {/*    Antd button */}
                <Button type="primary" onClick={() => {
                    console.log("Button clicked");
                    setLayout({...defaultLayoutGrid})
                }}>Resize</Button>
            </div>
            <ResponsiveGridLayout
                className="layout bg-gray-300"
                data-grid={{layout: layout}}
                layouts={
                    layout
                }

                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 24, md: 24, sm: 24, xs: 24, xxs: 24}}
                maxRows={8}
                rowHeight={120}
                autoSize={true}
            >

                <div key="left_panel" className='bg-red-500'>1</div>
                <div key="mid_panel" className='bg-red-300'>

                </div>
                <div key="right_panel" className='bg-blue-200'>3</div>
                <div key="below_panel" className='bg-amber-200'>
                    <InteractionGraphView/>
                </div>
            </ResponsiveGridLayout>
        </div>
    );
}

export default App;
