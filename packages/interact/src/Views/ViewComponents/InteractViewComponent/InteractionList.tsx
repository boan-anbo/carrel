import {Interaction, InteractionIdentity} from "../../../clients/grl-client/interact_db_client";
import {Text, Timeline} from "@mantine/core";
import {IconActivity, IconBuildingWarehouse, IconGitBranch, IconGrain, IconNotebook} from '@tabler/icons';
import {parseISO} from 'date-fns';
import {ReactNode} from "react";

export interface InteractionListProps {

    interactions: Interaction[];
    title?: string;
    onClickInteraction?: (interaction: Interaction) => void;
}

export function InteractionList(props: InteractionListProps) {
    function onClick(interaction: Interaction) {

    }

    function getIcon(interaction: Interaction, size: number): React.ReactNode {
        switch (interaction.identity) {
            case InteractionIdentity.Interaction:
                return <IconGrain size={size}/>;
            case InteractionIdentity.Act:
                return <IconActivity size={size}/>;
            case InteractionIdentity.Entity:
                return <IconBuildingWarehouse size={size}/>;
            case InteractionIdentity.Source:
                return <IconNotebook size={size}/>;
        }
    }

    return <>
        <h2 className={'text-center'}>{props.title}</h2>
        <Timeline active={0} bulletSize={24} lineWidth={2}>
            {props.interactions.map((interaction, index) =>
                <Timeline.Item
                    key={index}
                    className={'cursor-pointer'}
                    onClick={() => props.onClickInteraction?.(interaction)}
                    bullet={getIcon(interaction, 12)
                    } title={interaction.label}>
                    <Text color="dimmed" size="sm">
                        <Text variant="link" component="span" inherit>{interaction.sentence}</Text>
                    </Text>
                    <Text size="xs" mt={4}>

                        {parseISO(interaction.created).toUTCString()}
                    </Text>
                </Timeline.Item>
            )}
        </Timeline>
    </>;
}
