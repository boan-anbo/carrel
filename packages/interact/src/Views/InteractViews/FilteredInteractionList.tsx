import {Interaction} from "../../BackEnd/clients/grl-client/interact_db_client";
import {useState} from "react";
import {InteractionList} from "../_ViewComponents/InteractionList/InteractionList";
import {useDispatch} from "react-redux";
import {selectInteraction} from "../../States/features/app-state/appStateSlice";
import {filterInteractions} from "../../BackEnd/clients/interact-db-client/filter-operations";
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
            <TextInput

                onChange={onFilterInteractionSingleSelect}/>
            <InteractionList interactions={interactions} onClickInteraction={onInteractionListClickInteraction}/>
        </div>

    )
}
