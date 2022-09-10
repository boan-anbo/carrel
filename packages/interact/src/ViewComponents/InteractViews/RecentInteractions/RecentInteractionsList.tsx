import {useState} from "react";
import {Interaction, useGetRecentInteractionsQuery} from "../../../BackEnd/clients/grl-client/interact_db_client";
import {useDispatch} from "react-redux";
import {selectInteraction} from "../../../States/features/app-state/appStateSlice";
import {InteractionList} from "../../ViewComponents/InteractViewComponent/InteractionList";

export const RecentInteractionsList = () => {
    const [recentInteractions, setRecentInteractions] = useState<Interaction[]>([]);

    const {data, loading, error} = useGetRecentInteractionsQuery();

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

    return (
        <div onClick={e => e.stopPropagation()}>
            <InteractionList onClickInteraction={onClick} interactions={interactions}/>

        </div>
    )
}
