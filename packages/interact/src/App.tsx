import "./App.css";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {GridViewBoard} from "./GridViewBoard";
import {Route, Routes, useNavigate} from "react-router-dom";
import GraphMultiView from "./Views/Graph/GraphMulti/GraphMultiView";
import {MainHeader, NavLinkProps} from "./MainViews/MainHeader";
import {MainFooter} from "./MainViews/Footer";
import {MainNavBar} from "./MainViews/NavBar";
import {CreateView} from "./CreateView";


function DashBoard() {
    return null;
}

enum ViewLinks {
    GRAPH_VIEW = '/graph',
    DASHBOARD = '/dashboard',
    CREATE = '/',
    GRID_VIEW = '/grid',
    HOME = '/home',

}

function App() {

    const selectedPassage = useSelector((state: RootState) => state.appstate.selectedInputPassage);

    let navigate = useNavigate();

    const onNavLinks = (link: NavLinkProps) => {

        navigate(link.link);
        console.log(link)
    }

    return (
        <div>
            <MainHeader
                onNavLinks={onNavLinks} links={
                {
                    mainLinks: [
                        {label: 'Graph', link: ViewLinks.GRAPH_VIEW},
                        {label: 'Grid', link: ViewLinks.GRID_VIEW},
                        {label: 'Home', link: ViewLinks.HOME},
                        {label: 'Create', link: ViewLinks.CREATE},
                    ],
                    userLinks: [
                        {label: 'Login', link: '/login'},
                        {label: 'Register', link: '/register'},
                    ]
                }
            }/>
            <div className={'flex'}>
                <MainNavBar/>
                <Routes>
                    <Route path={ViewLinks.DASHBOARD} element={<DashBoard/>}/>
                    <Route path={ViewLinks.GRAPH_VIEW} element={<GraphMultiView />}/>
                    <Route path={ViewLinks.GRID_VIEW} element={<GridViewBoard/>}/>
                    <Route path={ViewLinks.CREATE} element={<CreateView/>}/>
                </Routes>
            </div>
            <MainFooter/>

        </div>
    );
}

export default App;
