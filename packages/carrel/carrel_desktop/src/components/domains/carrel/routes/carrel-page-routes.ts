import {appDomainRoutes} from "../../../../routing/app-domain-routes";
import {CarrelComponent} from "../../../../generated/carrel/core/shared/v1/core_shared_v1_pb";
import {TCarrelPageRoutes} from "../../../../routing/t-domain-routes";
import {ECarrelPages} from "../pages/e-carrel-pages";


export const CarrelPageRoutes: TCarrelPageRoutes = {
    [ECarrelPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.CARREL_UNSPECIFIED] + ECarrelPages.Home,
        relativePath: ECarrelPages.Home
    },
    [ECarrelPages.BOARD]: {
        absolutePath: appDomainRoutes[CarrelComponent.CARREL_UNSPECIFIED] + ECarrelPages.BOARD,
        relativePath: ECarrelPages.BOARD
    }
}


