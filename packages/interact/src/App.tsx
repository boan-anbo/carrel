import "./App.css";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {SelectedTextViewer} from "./Views/_ViewComponents/InteractViewComponent/SelectedTextViewer";
import {GridViewBoard} from "./GridViewBoard";
import {LinkProps, Route, Routes, useNavigate} from "react-router-dom";
import GraphMultiView from "./Views/Graph/GraphMulti/GraphMultiView";
import {MainView, NavLinkProps} from "./MainView";


function App() {

    const selectedPassage = useSelector((state: RootState) => state.appstate.selectedInputPassage);

    let navigate = useNavigate();

    const onNavLinks = (link: NavLinkProps) => {

        navigate(link.link);
        console.log(link)
    }

    return (
        <div>
            <MainView onNavLinks={onNavLinks} links={
                {
                    mainLinks: [
                        {label: 'Graph', link: '/graph'},
                        {label: 'Grid', link: '/grid'},
                    ],
                    userLinks: [
                        {label: 'Login', link: '/login'},
                        {label: 'Register', link: '/register'},
                    ]
                }
            }/>
            <Routes>
                <Route path={"/graph"} element={<GraphMultiView/>}/>
                <Route path={"/grid"} element={<GridViewBoard/>}/>
            </Routes>
        </div>
    );
}

export default App;
