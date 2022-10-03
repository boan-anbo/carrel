import {CarrelPageRoutes} from "../components/domains/carrel/routes/carrel-page-routes";
import {FireflyKeeperPageRoutes} from "../components/domains/firefly-keeper/routes/firefly-keeper-page-routes";
import {TDomainPageRoutes} from "./t-domain-routes";
import {CarrelComponent} from "../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";



// The single source of truth for the app's page routing-center
export const AppPageRoutes: Record<CarrelComponent, TDomainPageRoutes > = {
    [CarrelComponent.CARREL_UNSPECIFIED]: CarrelPageRoutes
    ,
    [CarrelComponent.CANDOR]: CarrelPageRoutes,
    [CarrelComponent.CABINET]: CarrelPageRoutes,
    [CarrelComponent.INTERACT]: CarrelPageRoutes,
    [CarrelComponent.FIREFLY_KEEPER]: FireflyKeeperPageRoutes,
    [CarrelComponent.WRITING_PLAN]: CarrelPageRoutes,
    [CarrelComponent.STACKS]: CarrelPageRoutes,

}
