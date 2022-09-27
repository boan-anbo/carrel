import {Route, Routes} from "react-router-dom";
import {appDomainRoutes} from "../../../routing/app-domain-routes";
import {CarrelComponent} from "../../../../../carrel_server_client/generated/carrel/core/shared/v1/core_shared_v1_pb";
import {ProjectManager} from "../../domains/carrel/pages/project-manage/ProjectManager";
import {ProjectBoard} from "../../domains/carrel/pages/project-board";
import {CarrelPageRoutes} from "../../domains/carrel/routes/carrel-page-routes";
import {FireflyKeeperPageRoutes} from "../../domains/firefly-keeper/routes/firefly-keeper-page-routes";
import {FireflyHouse} from "../../domains/firefly-keeper/pages/fire-fly-house/FireflyHouse";

export function WorkareaRoutingCenter() {
    return <>
        <Routes>
            {/* Carrel routes */}
            <Route
                path={appDomainRoutes[CarrelComponent.CARREL_UNSPECIFIED]}
            >
                <Route index element={<ProjectManager/>}/>
                <Route path={CarrelPageRoutes.home.relativePath} element={<ProjectManager/>}/>
                <Route path={CarrelPageRoutes.board.relativePath} element={<ProjectBoard/>}/>
            </Route>

            {/* Firefly routes */}
            <Route
                path={appDomainRoutes[CarrelComponent.FIREFLY_KEEPER]}
            >
                <Route index element={<FireflyHouse/>}/>
                <Route path={FireflyKeeperPageRoutes.home.relativePath} element={<FireflyHouse/>}/>
            </Route>

            {/*<Route path="*" element={<ProjectManager/>}/>*/}
            {/*    */}
        </Routes>
    </>;
}
