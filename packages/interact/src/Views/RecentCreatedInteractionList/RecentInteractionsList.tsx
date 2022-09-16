import {useState} from "react";
import {Interaction, useGetRecentInteractionsQuery} from "../../BackEnd/grl-client/interact_db_client";
import {useDispatch} from "react-redux";
import {selectInteraction} from "../../States/features/app-state/appStateSlice";
import {InteractTimeLineList} from "../_ViewComponents/InteractionList/InteractTimeLineList";
import {MantineSize} from "@mantine/core";

export const RecentInteractionsList = (props: {
    size?: MantineSize;
}) => {

    const {data, loading, error, refetch} = useGetRecentInteractionsQuery();

    const dispatch = useDispatch();

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}
        </div>
    }

    const interactions = data?.interactions?.nodes as Interaction[] ?? [];

    function onClick(interaction: Interaction): void {
        dispatch(selectInteraction(interaction));
    }

    async function onRefresh() {
        await refetch();
    }

    return (
        <div onClick={e => e.stopPropagation()}>
            <InteractTimeLineList
                onRefresh={onRefresh}
                title={'Recent Interactions'}
                dividerLabel={'By created date'}
                size={props.size} onClickInteraction={onClick} interactions={interactions}/>
        </div>
    )
}
