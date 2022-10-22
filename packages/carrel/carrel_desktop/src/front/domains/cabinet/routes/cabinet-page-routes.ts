import {TCabinetPageRoutes} from "../../../routing/t-domain-routes";
import {appDomainRoutes} from "../../../routing/app-domain-routes";
import {ECabinetPages} from "../pages/e-cabinet-pages";
import {CarrelComponent} from "../../../../backend/carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export const CabinetPageRoutes: TCabinetPageRoutes = {
    [ECabinetPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.CABINET] + ECabinetPages.Home,
        relativePath: ECabinetPages.Home
    },
    [ECabinetPages.Archives]: {
        absolutePath: appDomainRoutes[CarrelComponent.CABINET] + ECabinetPages.Archives,
        relativePath: ECabinetPages.Archives

    }
}
