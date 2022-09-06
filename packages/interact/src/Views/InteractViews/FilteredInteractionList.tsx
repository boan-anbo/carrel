import {Interaction} from "../../clients/grl-client/interact_db_client";
import FilterInteractionMultiple from "../../db-gadgets/FilterInteractionMultiple";
import {useState} from "react";
import {InteractionList} from "../ViewComponents/InteractViewComponent/InteractionList";
import {useDispatch} from "react-redux";
import {selectInteraction} from "../../features/app-state/appStateSlice";

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

    return (
        <div>
            <FilterInteractionMultiple onListFetched={onFilterInteractionMultipleListFetched}
                                       onSelect={onFilterInteractionMultipleSelect}
                                       placeholder={'Search Interaction'}/>
            {interactions && <InteractionList
                onClickInteraction= {onInteractionListClickInteraction} title={'find interactions'} interactions={interactions}/>}
        </div>

    )
}
