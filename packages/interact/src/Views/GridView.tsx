import {useState} from "react";
import {FilteredInteractionList} from "./InteractViews/FilteredInteractionList";

export enum GridViewTypes {
    NONE,
    FILTERED_INTERACTION_LIST = 'Interaction List',
    SELECTED_INTERACTION_GRAPH_VIEWER = 'Selected Interaction Graph Viewer',
    SELECTED_PASSAGE_VIEWER  = 'Selected Passage Viewer',
    INTERACTION_GRAPH_VIEW = 'Interaction Graph View',

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
    ]
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
            {selectedView === GridViewTypes.SELECTED_INTERACTION_GRAPH_VIEWER &&
                <div>SelectedInteractionGraphViewer</div>}
            {selectedView === GridViewTypes.SELECTED_PASSAGE_VIEWER && <div>SelectedPassageViewer</div>}
            {selectedView === GridViewTypes.INTERACTION_GRAPH_VIEW && <div>InteractionGraphView</div>}
        </div>
    )
}
