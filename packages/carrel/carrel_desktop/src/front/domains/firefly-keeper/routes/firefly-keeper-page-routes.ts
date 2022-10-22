import {appDomainRoutes} from "../../../routing/app-domain-routes";
import {EFireflyKeeperPages} from "../pages/e-firefly-keeper-pages";
import {TFireflyKeeperPageRoutes} from "../../../routing/t-domain-routes";
import {CarrelComponent} from "../../../../backend/carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export const FireflyKeeperPageRoutes: TFireflyKeeperPageRoutes = {
    [EFireflyKeeperPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.FIREFLY_KEEPER]  + EFireflyKeeperPages.Home,
        relativePath: EFireflyKeeperPages.Home
    },
    [EFireflyKeeperPages.Fireflies]: {
        absolutePath: appDomainRoutes[CarrelComponent.FIREFLY_KEEPER]  + EFireflyKeeperPages.Fireflies,
        relativePath: EFireflyKeeperPages.Fireflies
    }
}
