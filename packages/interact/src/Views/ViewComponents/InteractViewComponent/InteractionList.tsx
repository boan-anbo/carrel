import {Interaction} from "../../../clients/grl-client/interact_db_client";


export interface InteractionListProps {

    interactions: Interaction[];
    title?: string;
    onClickInteraction?: (interaction: Interaction) => void;
}

export function InteractionList(props: InteractionListProps) {
    function onClick(interaction: Interaction) {

    }

    return <>
        <h2 className={'text-center'}>{props.title}</h2>
        <ul className={"p-4"}>
            {props.interactions.map(interaction =>

                <li key={interaction.id}>
                    <a onClick={() => props.onClickInteraction && props.onClickInteraction(interaction)}>{interaction.id}: {interaction.label} {interaction.start}</a>
                </li>)}
        </ul>
    </>;
}
