import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import "./App.css";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {SelectedTextViewer} from "./Views/_ViewComponents/InteractViewComponent/SelectedTextViewer";
import {GridViewBoard} from "./GridViewBoard";
import {Route, Routes} from "react-router-dom";
import GraphMultiView from "./Views/Graph/GraphMulti/GraphMultiView";


function App() {

    const selectedPassage = useSelector((state: RootState) => state.appstate.selectedInputPassage);


    return (
        <div className={'bg-black'}>

            <div className={'flex space-x-4'}>

                <SelectedTextViewer/>


            </div>
            <Routes>
                <Route path={"/"} element={<GridViewBoard/>}/>
                <Route path={"/graph"} element={<GraphMultiView />}/>
                <Route path={"/grid/:gridview"} element={<GridViewBoard />}/>
            </Routes>
        </div>
    );
}

export default App;
