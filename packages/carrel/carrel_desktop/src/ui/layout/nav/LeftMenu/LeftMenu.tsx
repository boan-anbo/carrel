import * as React from "react";
import { useMemo } from "react";

import { useSelector } from "react-redux";
import { CurrentComponent } from "../../../../front/store/slices/appstate/current_component";
import { RootState } from "../../../../front/store/store";

import { Box, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react";
import { CarrelComponent } from "../../../../backend/carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";
import { CabinetMenu } from "../../../../front/domains/cabinet/menu/CabinetMenu";
import { CarrelMenu } from "../../../../front/domains/carrel/menu/CarrelMenu";
import { FireflyKeeperMenu } from "../../../../front/domains/firefly-keeper/menu/FireflyKeeperMenu";
import { StacksMenu } from "../../../../front/domains/stacks/menu/StacksMenu";

export interface LeftMenuProps {

    children?: React.ReactNode;
}

export const LeftMenu = (props: LeftMenuProps) => {
    // conditional rendering of the left menu according to the current component
    const menuItems = () => useMemo(() => {
        switch (currentComponent.type) {
            case CarrelComponent.CARREL_UNSPECIFIED:
                return <CarrelMenu/>;
            case CarrelComponent.FIREFLY_KEEPER:
                return <FireflyKeeperMenu/>;
            case CarrelComponent.CANDOR:
                return <></>;
            case CarrelComponent.CABINET:
                return <CabinetMenu/>
            case CarrelComponent.INTERACT:
                return <></>;
            case CarrelComponent.WRITING_PLAN:
                return <></>;
            case CarrelComponent.STACKS:
                return <StacksMenu/>;
            default:
                return <CarrelMenu/>;
        }
    }, [currentComponent]);

    // this needs to come after the useMemo() call per React hooks rules
    const currentComponent: CurrentComponent = useSelector((state: RootState) => state.appstate.currentComponent);

    const { isOpen, onOpen, onClose } = useDisclosure();
    return <VStack h='full'>{menuItems()}</VStack>;
}
