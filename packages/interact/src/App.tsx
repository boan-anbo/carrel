import "./App.css";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {GridViewBoard} from "./MainViews/GridViewBoard";
import {Route, Routes, useNavigate} from "react-router-dom";
import GraphMultiView from "./Views/Graph/GraphTree/GraphTreeView";
import {MainHeader, NavLinkProps} from "./MainViews/MainHeader/MainHeader";
import {MainFooter} from "./MainViews/Footer";
import {MainNavBar} from "./MainViews/NavBar";
import {MainView} from "./MainViews/MainView";
import {RoutingViewLinks} from "./Routing/RoutingViewLinks";
import {Logger, LogSource} from "./Services/logger";
import DistantServerCardIndex from "./Views/Server/DistantServer/DistantServerCardIndex";
import {DistantDataEntryViewIndex} from "./Views/DistantDataEntryView/DistantDataEntryViewIndex";
import {ServerCardsIndex} from "./Views/Server/ServerCardsIndex";


function DashBoard() {
    return null;
}

const log = new Logger(LogSource.App)

function App() {

    let navigate = useNavigate();

    const onNavLinks = (link: NavLinkProps) => {
        navigate(link.link);
        log.info('Navigating to ' + link.link);
    }

    return (
        <>
            <MainHeader
                onNavLinks={onNavLinks}
            />
            <div className={'flex'}>
                <MainNavBar/>
                <Routes>
                    <Route path={RoutingViewLinks.DASHBOARD} element={<DashBoard/>}/>
                    <Route path={RoutingViewLinks.GRAPH_VIEW} element={<GraphMultiView />}/>
                    <Route path={RoutingViewLinks.GRID_VIEW} element={<GridViewBoard/>}/>
                    <Route path={RoutingViewLinks.HOME} element={<MainView/>}/>
                    <Route path={RoutingViewLinks.SERVER} element={<ServerCardsIndex/>}/>
                    <Route path={RoutingViewLinks.DISTANT} element={<DistantDataEntryViewIndex/>}/>
                </Routes>
            </div>
            <MainFooter/>

        </>
    );
}

export default App;
