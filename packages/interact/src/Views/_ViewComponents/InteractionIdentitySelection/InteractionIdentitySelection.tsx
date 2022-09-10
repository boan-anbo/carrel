import {Radio} from "@mantine/core";
import {InteractionIdentity} from "../../../BackEnd/clients/grl-client/interact_db_client";

export interface InteractionIdentitySelectionProps {
    onChange: (value: InteractionIdentity) => void;
}
export function InteractionIdentitySelection(props: InteractionIdentitySelectionProps) {
    return <Radio.Group
        name={"interactionidentity"}
        label={"Interaction Identity"}
        description={"This is not necessarily the final judgment of the nature of the entity, but a convenient helper."}
        spacing={"xs"}
        size={"xs"}
        onChange={props.onChange}
        defaultValue={InteractionIdentity.Entity}
    >
        <Radio value={InteractionIdentity.Entity} label={"Entity"}/>
        <Radio value={InteractionIdentity.Act} label={"Act"}/>
        <Radio value={InteractionIdentity.Interaction} label={"Interaction"}/>
        <Radio value={InteractionIdentity.Category} label={"Category"}/>
        <Radio value={InteractionIdentity.Source} label={"Source"}/>
    </Radio.Group>;
}
