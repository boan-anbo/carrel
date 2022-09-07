import {useEffect, useState} from "react";
import {FilteredInteractionList} from "./InteractViews/FilteredInteractionList";
import {InteractionCardView} from "./InteractViews/InteractionCardView";
import {InteractionGraphView} from "./InteractViews/InteractionGraphView";
import {SelectedPassageViewer} from "./InteractViews/SelectedPassageViewer";
import {CreateOrUpdateInteractionForm} from "./InteractViews/CreateorUpdateInteractionForm";

export enum GridViewTypes {
    NONE,
    FILTERED_INTERACTION_LIST = 'Interaction List',
    SELECTED_INTERACTION_GRAPH_VIEWER = 'Selected Interaction Graph Viewer',
    SELECTED_PASSAGE_VIEWER = 'Selected Passage Viewer',
    INTERACTION_GRAPH_VIEW = 'Interaction Graph View',
    INTERACTION_CARD_VIEW = 'Interaction Card View',
    CREATE_INTERACTION_FORM = 'Create Interaction Form',

}

export const GridView = (props: {
    selectedView: GridViewTypes
}) => {
    const [selectedView, setSelectedView] = useState<GridViewTypes>(GridViewTypes.FILTERED_INTERACTION_LIST);
    const allViews = [
        GridViewTypes.FILTERED_INTERACTION_LIST,
        GridViewTypes.SELECTED_INTERACTION_GRAPH_VIEWER,
        GridViewTypes.SELECTED_PASSAGE_VIEWER,
        GridViewTypes.INTERACTION_GRAPH_VIEW,
        GridViewTypes.INTERACTION_CARD_VIEW,
        GridViewTypes.CREATE_INTERACTION_FORM,
    ]
    useEffect(() => {
        return () => {
            setSelectedView(props.selectedView)
        };
    }, [props.selectedView]);

    return (
        <div>
            <div className={'flex space-x-4 justify-center text-xs'}>
                {/*    Iterate over views */}
                {allViews.map((view) => {
                    return <button
                        key={view}
                        className={selectedView === view ? 'bg-blue-500' : 'bg-gray-500'}
                        onClick={() => setSelectedView(view)}
                    >{view}</button>
                })}
            </div>

            {selectedView === GridViewTypes.FILTERED_INTERACTION_LIST && <FilteredInteractionList/>}

            {selectedView === GridViewTypes.SELECTED_INTERACTION_GRAPH_VIEWER && <div>SelectedInteractionGraphViewer</div>}

            {selectedView === GridViewTypes.SELECTED_PASSAGE_VIEWER && <div> <SelectedPassageViewer></SelectedPassageViewer> </div>}

            {selectedView === GridViewTypes.INTERACTION_GRAPH_VIEW && <div><InteractionGraphView/></div>}

            {selectedView === GridViewTypes.INTERACTION_CARD_VIEW && <div> <InteractionCardView/> </div>}

            {selectedView === GridViewTypes.CREATE_INTERACTION_FORM && <div><CreateOrUpdateInteractionForm/></div>}
        </div>
    )
}
