import {TStacksPageRoutes} from "../../../../routing/t-domain-routes";
import {appDomainRoutes} from "../../../../routing/app-domain-routes";
import {EStacksPages} from "../pages/e-stacks-pages";
import {CarrelComponent} from "../../../../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export const StacksPageRoutes: TStacksPageRoutes = {
    [EStacksPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.STACKS] +  EStacksPages.Home,
        relativePath: EStacksPages.Home
    }
}
