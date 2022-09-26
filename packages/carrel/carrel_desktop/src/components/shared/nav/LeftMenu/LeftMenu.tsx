/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */

import * as React from "react";
import {useMemo} from "react";

import {Classes, Menu, MenuItem} from "@blueprintjs/core";
import {ExampleProps} from "@blueprintjs/docs-theme/lib/esm/components/example";
import {CurrentComponent} from "../../../../store/slices/appstate/current_component";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {CarrelComponent} from "../../../../generated/carrel/core/shared/v1/core_shared_v1_pb";

import {CarrelMenu} from "../../../domains/carrel/menu/CarrelMenu";
import {StacksMenu} from "../../../domains/stacks/menu/StacksMenu";
import {FireflyKeeperMenu} from "../../../domains/firefly-keeper/menu/FireflyKeeperMenu";


export const LeftMenu = () => {
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
                return <></>;
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


    return (
        <div className={'nav-menu'}>
            <Menu
                className={`${Classes.ELEVATION_1} ${'nav-menu-inner'}`}>
                {menuItems()}

            </Menu>
        </div>
    )
        ;
}

