import {CarrelComponent} from "../../../carrel_server_client/carrel/core/shared/v1/core_shared_v1_pb";

export interface CurrentComponent {
    type: CarrelComponent
    name: string
}

export class CurrentComponentUtils {

    private static getComponentName(component: CarrelComponent): string {
        switch (component) {
            case CarrelComponent.CARREL_UNSPECIFIED:
                return "carrel"
            case CarrelComponent.FIREFLY_KEEPER:
                return "Firefly Keeper"
            case CarrelComponent.CANDOR:
                return "Candor"
            case CarrelComponent.CABINET:
                return "Cabinet"
            case CarrelComponent.INTERACT:
                return "Interact"
            case CarrelComponent.WRITING_PLAN:
                return "Writing Plan"
            case CarrelComponent.STACKS:
                return "Stacks"
        }
    }



    static getComponent(component: CarrelComponent): CurrentComponent {
        return {
            type: component,
            name: CurrentComponentUtils.getComponentName(component)
        }
    }


    static getDefaultComponent(): CurrentComponent {

        return {
            type: CarrelComponent.CARREL_UNSPECIFIED,
            name: CurrentComponentUtils.getComponentName(CarrelComponent.CARREL_UNSPECIFIED)
        }
    }
}
