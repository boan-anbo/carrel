import {Interaction, InteractionIdentity} from "../../../BackEnd/grl-client/interact_db_client";
import {Divider, MantineSize, Text, Timeline, Title} from "@mantine/core";
import {IconActivity, IconBuildingWarehouse, IconGrain, IconNews, IconNotebook} from '@tabler/icons';
import {parseISO} from 'date-fns';

export interface InteractionListProps {
    dividerLabel?: string;
    size?: MantineSize;
    children?: React.ReactNode;
    reverseOrder?: boolean;
    interactions: Interaction[];
    title?: string;
    onClickInteraction?: (interaction: Interaction) => void;
    showTimeline?: boolean;
}

export function InteractTimeLineList(props: InteractionListProps) {

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
        <Title className={'my-4 flex space-x-2 text-main'} order={6}>
            <div ><IconNews size={24}/></div>
            <Text>{props.title}</Text>
        </Title>

        <Divider className={'my-4'} label={props.dividerLabel && <span className={'text-opacity-50'}>{props.dividerLabel}</span>} labelPosition={'center'}/>
        <Timeline

            bulletSize={24} lineWidth={2}>

            {props.children}

            {props.interactions.map((interaction, index) =>
                <Timeline.Item


                    key={index}
                    className={'cursor-pointer'}
                    onClick={() => props.onClickInteraction?.(interaction)}
                    bullet={getIcon(interaction, 12)
                }
                    title={interaction.label}>

                    <Text color="dimmed" size={props.size}>
                        <Text size={props.size} variant="link" component="span" inherit>{
                            // use first 12 words of description
                            interaction.sentence?.split(' ').slice(0, 12).join(' ')
                        }</Text>
                    </Text>
                    <Text size={props.size} mt={4}>

                        {parseISO(interaction.created).toDateString()}
                    </Text>

                </Timeline.Item>
            )}
        </Timeline>
    </>;
}
