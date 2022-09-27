import {TCabinetPageRoutes} from "../../../../routing/t-domain-routes";
import {appDomainRoutes} from "../../../../routing/app-domain-routes";
import {CarrelComponent} from "../../../../../../carrel_server_client/generated/carrel/core/shared/v1/core_shared_v1_pb";
import {ECabinetPages} from "../pages/e-cabinet-pages";

export const CabinetPageRoutes: TCabinetPageRoutes = {
    [ECabinetPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.CABINET] + ECabinetPages.Home,
        relativePath: ECabinetPages.Home
    }
}
