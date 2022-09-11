import {useEffect, useState} from "react";
import {Interaction, useGetRecentInteractionsQuery} from "../../BackEnd/grl-client/interact_db_client";
import {useDispatch, useSelector} from "react-redux";
import {InteractionList} from "../_ViewComponents/InteractionList/InteractionList";
import {RootState} from "../../store";

export const RecentViewedInteractionList = () => {

    const selectedInteractions = useSelector((state: RootState) => state.appstate.selectedInteractionHistory);


    function onInteractionListClickInteraction(interaction: Interaction) {

    }

    return (
        <div onClick={e => e.stopPropagation()}>
            <InteractionList

                onClickInteraction={onInteractionListClickInteraction} interactions={selectedInteractions}/>
        </div>
    )
}
