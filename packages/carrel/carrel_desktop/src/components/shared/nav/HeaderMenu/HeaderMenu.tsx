import {Alignment, Button, Navbar} from '@blueprintjs/core';
import React, {ReactElement, useMemo} from 'react';
import {MainMenuItems} from "../../../../store/slices/appstate/main-menu-items";
import {AiOutlineBuild, BiCabinet, GiEagleHead, GiLaserSparks, GiRead, SiActigraph, SiBookstack} from "react-icons/all";
import {CurrentComponent} from "../../../../store/slices/appstate/current_component";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {setCurrentComponent} from "../../../../store/slices/appstate/appstate";
import {CarrelComponent} from "../../../../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

function HeaderMenu() {

    const currentComponent: CurrentComponent = useSelector((state: RootState) => state.appstate.currentComponent);

    const dispatch = useDispatch();

    const MainMenuItemElements: ReactElement[] = useMemo(() => {

        return MainMenuItems

            .map((component, index) => {
                let text;
                let icon;
                switch (component) {
                    case CarrelComponent.CARREL_UNSPECIFIED:
                        text = 'carrel';
                        icon = <GiRead/>;
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
                            dispatch(
                                setCurrentComponent(component)
                            )
                        }}
                        minimal={true}
                        alignText={Alignment.LEFT}
                    />
                );
            })
    }, [])

    return (
        <Navbar className={''}>
            <Navbar.Group className={'flex w-full'} align={Alignment.LEFT}>
                <Navbar.Heading className={'w-2/12'}>{currentComponent.name}</Navbar.Heading>

                <Navbar.Divider/>

                <Navbar.Group>

                    <div className={''}>
                        {MainMenuItemElements}
                    </div>

                </Navbar.Group>
            </Navbar.Group>
        </Navbar>);
}

export default HeaderMenu;
