import {TCandorPageRoutes} from "../../../../routing/t-domain-routes";
import {appDomainRoutes} from "../../../../routing/app-domain-routes";
import {CarrelComponent} from "../../../../generated/carrel/core/shared/v1/core_shared_v1_pb";
import {ECandorPages} from "../pages/e-candor-pages";

export const CandorPageRoutes: TCandorPageRoutes = {
    [ECandorPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.CANDOR] + ECandorPages.Home,
        relativePath: ECandorPages.Home
    }
}
