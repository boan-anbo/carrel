import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import "./App.css";

import GridLayout, {Layout, Responsive, WidthProvider} from "react-grid-layout";
import FilterInteractions, {SelectValue} from "./db-gadgets/FilterInteractions";
import FilterInteractionSingle from "./db-gadgets/FilterInteractionSingle";

const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {

    const layout1: Layout[] = [
        {i: "left_panel", x: 0, y: 0, w: 8, h: 4, static: false},
        {i: "mid_panel", x: 8, y: 0, w: 8, h: 4, static: false},
        {i: "right_panel", x: 16, y: 0, w: 8, h: 4, static: false}
    ]


    return (
        <div>
            <ResponsiveGridLayout
                className="layout bg-gray-300"
                layouts={
                    {lg: layout1, md: layout1, sm: layout1, xs: layout1, xxs: layout1}
                }

                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 24, md: 24, sm: 24, xs: 24, xxs: 24}}
                maxRows={2}
            >

                <div key="left_panel" className='bg-red-500'>1</div>
                <div key="mid_panel" className='bg-red-300'>

                 <FilterInteractionSingle></FilterInteractionSingle>
                </div>
                <div key="right_panel" className='bg-blue-200'>3</div>
            </ResponsiveGridLayout>
        </div>
    );
}

export default App;
