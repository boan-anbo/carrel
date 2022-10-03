import {TCandorPageRoutes} from "../../../../routing/t-domain-routes";
import {appDomainRoutes} from "../../../../routing/app-domain-routes";
import {ECandorPages} from "../pages/e-candor-pages";
import {CarrelComponent} from "../../../../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export const CandorPageRoutes: TCandorPageRoutes = {
    [ECandorPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.CANDOR] + ECandorPages.Home,
        relativePath: ECandorPages.Home
    }
}
