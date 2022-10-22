import {TInteractPageRoutes} from "../../../routing/t-domain-routes";
import {appDomainRoutes} from "../../../routing/app-domain-routes";
import {EInteractPages} from "../pages/e-interact-pages";
import {CarrelComponent} from "../../../../backend/carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export const InteractPageRoutes: TInteractPageRoutes = {
    [EInteractPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.INTERACT]  + EInteractPages.Home,
        relativePath: EInteractPages.Home
    }

}
