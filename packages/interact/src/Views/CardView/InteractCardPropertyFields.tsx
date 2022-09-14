import {Interaction} from "../../BackEnd/grl-client/interact_db_client";
import {InteractionCardFieldItem} from "./InteractCardFields/InteractionCardFieldItem";
import {BiData, BiLabel, MdDescription, MdPermIdentity, SiContentful} from "react-icons/all";
import {IconCalendar, IconCalendarOff, IconCalendarPlus, IconWorld, IconWriting} from "@tabler/icons";
import {parseDateTime} from "../../Utils/ParseDateForPicker";
import {JsonView} from "../_ViewComponents/_ControlComponents/JsonView";

export function InteractCardPropertyFields(props: { interaction: Interaction }) {
    return <>
        <div>
            <InteractionCardFieldItem
                label={"Sentence"}
                icon={<IconWriting/>}
                size={"sm"}
                interaction={props.interaction}
                fieldValue={props.interaction.sentence}/>
        </div>

        <div>
            <InteractionCardFieldItem
                label={"Label"}
                size={"sm"}
                icon={<BiLabel/>}
                interaction={props.interaction}
                fieldValue={props.interaction.label}/>
        </div>
        <div>
            <InteractionCardFieldItem
                label={"Description"}
                size={"sm"}
                icon={<MdDescription/>}
                interaction={props.interaction}
                fieldValue={props.interaction.description}/>
        </div>
        <div>
            <InteractionCardFieldItem
                label={"Content"}
                size={"sm"}
                icon={<SiContentful/>}
                interaction={props.interaction}
                fieldValue={props.interaction.content}/>
        </div>
        <div>
            <InteractionCardFieldItem
                label={"Identity"}
                size={"sm"}
                icon={<MdPermIdentity/>}
                interaction={props.interaction}
                fieldValue={props.interaction.identity}/>
        </div>
        <div>
            <InteractionCardFieldItem
                label={"Data"}
                icon={<BiData/>}
                interaction={props.interaction}
                fieldValue={props.interaction.data}/>
        </div>

        <div>
            <InteractionCardFieldItem
                label={"Start date"}
                icon={<IconCalendar/>}
                interaction={props.interaction}
                fieldValue={parseDateTime(props.interaction.start)}/>
        </div>

        <div>
            <InteractionCardFieldItem
                label={"End date"}
                icon={<IconCalendarOff/>}
                interaction={props.interaction}
                fieldValue={parseDateTime(props.interaction.end)}/>
        </div>

    </>;
}
