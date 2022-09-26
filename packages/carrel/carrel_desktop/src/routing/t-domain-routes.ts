import {IPageRoute} from "./i-page-route";
import {EStacksPages} from "../components/domains/stacks/pages/e-stacks-pages";
import {EWritingPlanPages} from "../components/domains/writing-plan/pages/e-writing-plan-pages";
import {ECabinetPages} from "../components/domains/cabinet/pages/e-cabinet-pages";
import {EInteractPages} from "../components/domains/interact/pages/e-interact-pages";
import {ECandorPages} from "../components/domains/candor/pages/e-candor-pages";
import {EFireflyKeeperPages} from "../components/domains/firefly-keeper/pages/e-firefly-keeper-pages";
import {ECarrelPages} from "../components/domains/carrel/pages/e-carrel-pages";

/// A  of routing-center for a domain
export type TCarrelPageRoutes = Record<ECarrelPages, IPageRoute>;
export type TCandorPageRoutes = Record<ECandorPages, IPageRoute>;
export type TFireflyKeeperPageRoutes = Record<EFireflyKeeperPages, IPageRoute>;

export type TInteractPageRoutes = Record<EInteractPages, IPageRoute>;

export type TCabinetPageRoutes = Record<ECabinetPages, IPageRoute>;

export type TWritingPlanPageRoutes = Record<EWritingPlanPages, IPageRoute>;

export  type TStacksPageRoutes = Record<EStacksPages, IPageRoute>;

export type TDomainPageRoutes =
    TCarrelPageRoutes
    | TCandorPageRoutes
    | TFireflyKeeperPageRoutes
    | TInteractPageRoutes
    | TCabinetPageRoutes
    | TWritingPlanPageRoutes
    | TStacksPageRoutes;
