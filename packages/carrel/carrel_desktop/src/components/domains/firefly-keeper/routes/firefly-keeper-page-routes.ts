import {appDomainRoutes} from "../../../../routing/app-domain-routes";
import {CarrelComponent} from "../../../../generated/carrel/core/shared/v1/core_shared_v1_pb";
import {EFireflyKeeperPages} from "../pages/e-firefly-keeper-pages";
import {TFireflyKeeperPageRoutes} from "../../../../routing/t-domain-routes";

export const FireflyKeeperPageRoutes: TFireflyKeeperPageRoutes = {
    [EFireflyKeeperPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.FIREFLY_KEEPER]  + EFireflyKeeperPages.Home,
        relativePath: EFireflyKeeperPages.Home
    }
}
