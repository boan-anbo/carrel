import {TInteractPageRoutes} from "../../../../routing/t-domain-routes";
import {appDomainRoutes} from "../../../../routing/app-domain-routes";
import {CarrelComponent} from "../../../../../../carrel_server_client/generated/carrel/core/shared/v1/core_shared_v1_pb";
import {EInteractPages} from "../pages/e-interact-pages";

export const InteractPageRoutes: TInteractPageRoutes = {
    [EInteractPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.INTERACT]  + EInteractPages.Home,
        relativePath: EInteractPages.Home
    }

}
