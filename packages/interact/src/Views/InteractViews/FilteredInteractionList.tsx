import {Interaction} from "../../BackEnd/grl-client/interact_db_client";
import {useState} from "react";
import {InteractTimeLineList} from "../_ViewComponents/InteractionList/InteractTimeLineList";
import {useDispatch} from "react-redux";
import {selectInteraction} from "../../States/features/app-state/appStateSlice";
import {filterInteractions} from "../../BackEnd/interact-db-client/query-operations";
import {TextInput} from "../_ViewComponents/_ControlComponents/Input/TextInput";

export const FilteredInteractionList = () => {

    const [interactions, setInteractions] = useState<Interaction[]>([]);


    const dispatch = useDispatch();

    function onFilterInteractionMultipleSelect(value: string[]) {

    }

    function onFilterInteractionMultipleListFetched(interactions: Interaction[]) {
        setInteractions(interactions);

    }

    function onInteractionListClickInteraction(interaction: Interaction) {
        dispatch(selectInteraction(interaction));
    }

    async function onFilterInteractionSingleSelect(value: string) {

        console.log("onFilterInteractionSingleSelect", value)

        const results = await filterInteractions(value);
        setInteractions(results);
    }

    return (
        <div>
            <InteractTimeLineList
                title={'Quick Filter'}
                dividerLabel={'By label'}
                showTimeline={false}
                interactions={interactions} onClickInteraction={onInteractionListClickInteraction}>

            <TextInput

                placeholder={'Search interactions'}
                size={'xs'}
                onChange={onFilterInteractionSingleSelect}/>
            </InteractTimeLineList>

        </div>

    )
}
