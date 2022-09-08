import {FilterInteractionsByLabelDocument, Interaction} from "../../clients/grl-client/interact_db_client";
import FilterInteractionMultiple from "../../db-gadgets/FilterInteractionMultiple";
import {useState} from "react";
import {InteractionList} from "../ViewComponents/InteractViewComponent/InteractionList";
import {useDispatch} from "react-redux";
import {selectInteraction} from "../../features/app-state/appStateSlice";
import FilterInteractionSingle, {SelectValue} from "../../db-gadgets/FilterInteractionSingle";
import {SearchSimple} from "../../ControlComponents/SearchSimple";
import {filterInteractions} from "../../clients/interact-db-client/filter-operations";

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
            <SearchSimple
                onChange={onFilterInteractionSingleSelect}
                onSearch={(value) => {
                    console.log(value)
                }}/>
            <InteractionList interactions={interactions} onClickInteraction={onInteractionListClickInteraction}/>
        </div>

    )
}
