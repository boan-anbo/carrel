import {Interaction, Relation} from "../../../BackEnd/grl-client/interact_db_client";
import {FilterByEntityRelation} from "../../_ViewComponents/Selectors/FilterComponents/FilterByEntityRelation";
import {List, MantineSize, Text, ThemeIcon, Title} from "@mantine/core";
import {IconCircleCheck, IconHierarchy, IconRelationOneToMany} from "@tabler/icons";

export function InteractionCardRelationFieldItem<T extends Relation>(props: {
    onClickRelation?: (relation: T) => void,
    relationData: T [] | undefined | null;
    interaction: Interaction,
    label: string,
    icon: JSX.Element,
    showLabel?: boolean,
    hideWhenNoValue?: boolean
    placeholder?: string,
    filterByEntityRelation?: FilterByEntityRelation
    relationCount?: number
    size?: MantineSize | undefined

}) {


    const shouldShow: boolean = (props?.hideWhenNoValue && props?.relationData && (props?.relationData?.length > 0)) ?? false;

    return <div className={''}>
        {shouldShow &&
            <div>
                <Title className={'drop-shadow'} size={'h6'}>
                    {props.label}
                </Title>
                <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                        <IconHierarchy className={'text-red-500'} size={17}/>
                    }
                >
                    {props.relationData?.map((relation, index) => {
                        return <List.Item>
                            <Text onClick={() => props.onClickRelation && props.onClickRelation(relation)}> {relation.linkedInteraction?.label} </Text>
                        </List.Item>
                    })}
                </List>
            </div>}
    </div>
}

// default props
InteractionCardRelationFieldItem.defaultProps = {
    showLabel: false,
    hideWhenNoValue: true,
    relationCount: 0
}
