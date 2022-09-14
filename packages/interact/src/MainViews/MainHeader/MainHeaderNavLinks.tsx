import {MainHeaderLinkProps} from "./MainHeaderLinkProps";
import {RoutingViewLinks} from "../../Routing/RoutingViewLinks";

export const MainHeaderNavLinks: MainHeaderLinkProps = {
    mainLinks: [
        {label: 'Graph', link: RoutingViewLinks.GRAPH_VIEW},
        {label: 'Grid', link: RoutingViewLinks.GRID_VIEW},
        {label: 'Home', link: RoutingViewLinks.HOME},
        {label: 'Create', link: RoutingViewLinks.CREATE},
        {label: 'Server', link: RoutingViewLinks.SERVER},
        {label: 'Distant', link: RoutingViewLinks.DISTANT},
    ],
    userLinks: [
        {label: 'Login', link: '/login'},
        {label: 'Register', link: '/register'},
    ]
};
