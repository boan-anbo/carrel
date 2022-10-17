import {Route, Routes} from "react-router-dom";
import {appDomainRoutes} from "../../../routing/app-domain-routes";
import {ProjectManager} from "../../domains/carrel/pages/project-manage/ProjectManager";
import {ProjectBoard} from "../../domains/carrel/pages/ProjectBoard/ProjectBoard";
import {CarrelPageRoutes} from "../../domains/carrel/routes/carrel-page-routes";
import {FireflyKeeperPageRoutes} from "../../domains/firefly-keeper/routes/firefly-keeper-page-routes";
import {FireflyHouse} from "../../domains/firefly-keeper/pages/fire-fly-house/FireflyHouse";
import {CarrelComponent} from "../../../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";
import {FirefliesPage} from "../../domains/firefly-keeper/pages/fireflies/FirefliesPage";
import {CabinetPageRoutes} from "../../domains/cabinet/routes/cabinet-page-routes";
import {CabinetArchives} from "../../domains/cabinet/pages/cabinet_archives/CabinetArchives";

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
                <Route path={FireflyKeeperPageRoutes.fireflies.relativePath} element={<FirefliesPage/>}/>
            </Route>
            <Route
                path={appDomainRoutes[CarrelComponent.CABINET]}
            >
                <Route index element={<CabinetArchives/>}/>
                <Route path={CabinetPageRoutes.archives.relativePath} element={<CabinetArchives/>}/>
            </Route>


            {/*<Route path="*" element={<ProjectManager/>}/>*/}
            {/*    */}
        </Routes>
    </>;
}
