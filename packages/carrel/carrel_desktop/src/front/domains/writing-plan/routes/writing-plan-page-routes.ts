import {TWritingPlanPageRoutes} from "../../../routing/t-domain-routes";
import {EWritingPlanPages} from "../pages/e-writing-plan-pages";
import {appDomainRoutes} from "../../../routing/app-domain-routes";
import {CarrelComponent} from "../../../../backend/carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export const WritingPlanPageRoutes: TWritingPlanPageRoutes = {
    [EWritingPlanPages.Home]: {
        absolutePath: appDomainRoutes[CarrelComponent.WRITING_PLAN] + "/" + EWritingPlanPages.Home,
        relativePath: EWritingPlanPages.Home
    }
}
