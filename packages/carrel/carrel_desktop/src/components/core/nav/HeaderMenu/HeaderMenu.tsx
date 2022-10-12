import {Alignment, Button, Navbar} from '@blueprintjs/core';
import React, {ReactElement, useMemo} from 'react';
import {MainMenuItems} from "../../../../store/slices/appstate/main-menu-items";
import {AiOutlineBuild, BiCabinet, GiEagleHead, GiLaserSparks, GiRead, SiActigraph, SiBookstack} from "react-icons/all";
import {CurrentComponent} from "../../../../store/slices/appstate/current_component";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {setCurrentComponent} from "../../../../store/slices/appstate/appstate";
import {CarrelComponent} from "../../../../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";
import {useNavigate} from "react-router-dom";
import {CarrelPageRoutes} from "../../../domains/carrel/routes/carrel-page-routes";
import {CabinetPageRoutes} from "../../../domains/cabinet/routes/cabinet-page-routes";
import clsx from "clsx";

function HeaderMenu() {

    const currentComponent: CurrentComponent = useSelector((state: RootState) => state.appstate.currentComponent);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const MainMenuItemElements: ReactElement[] = useMemo(() => {

        return MainMenuItems

            .map((component, index) => {
                // the label of the menu item
                let text;
                let icon;
                // the page that will be navigated to when the menu item is clicked
                let homePath: string;
                switch (component) {
                    case CarrelComponent.CARREL_UNSPECIFIED:
                        text = 'Carrel';
                        icon = <GiRead/>;
                        homePath = CarrelPageRoutes.home.absolutePath;
                        break;
                    case CarrelComponent.FIREFLY_KEEPER:
                        text = 'Firefly Keeper';
                        icon = <GiLaserSparks/>;
                        break;
                    case CarrelComponent.CANDOR:
                        text = 'Candor';
                        icon = <GiEagleHead/>;
                        break;
                    case CarrelComponent.CABINET:
                        text = 'Cabinet';
                        icon = <BiCabinet/>;
                        homePath = CabinetPageRoutes.archives.absolutePath;
                        break;
                    case CarrelComponent.INTERACT:
                        text = 'Interact';
                        icon = <SiActigraph/>;
                        break;
                    case CarrelComponent.WRITING_PLAN:
                        text = 'Writing Plan';
                        icon = <AiOutlineBuild/>;
                        break;
                    case CarrelComponent.STACKS:
                        text = 'Stacks';
                        icon = <SiBookstack/>;
                        break;
                }

                return (
                    <Button
                        key={index}
                        text={text}
                        icon={icon}
                        onClick={() => {
                            // set app state
                            dispatch(
                                setCurrentComponent(component)
                            )
                            // navigate to the home page of the component
                            navigate(homePath);
                        }}
                        minimal={true}
                        alignText={Alignment.LEFT}
                    />
                );
            })
    }, [])

    return (
        <div className={clsx('flex space-x-10')}>
            {MainMenuItemElements}
        </div>)
}

export default HeaderMenu;

