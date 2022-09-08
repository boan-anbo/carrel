import {useEffect, useState} from "react";
import {FilteredInteractionList} from "./InteractViews/FilteredInteractionList";
import {InteractionCardView} from "./InteractViews/InteractionCardView";
import {InteractionGraphView} from "./InteractViews/InteractionGraphView";
import {SelectedPassageViewer} from "./InteractViews/SelectedPassageViewer";
import {
    CreateOrUpdateInteractionFormView
} from "./InteractViews/CreatOrUpdateInteractionForm/CreateOrUpdateInteractionFormView";
import {SelectedInteractionDataViewer} from "./InteractViews/SelectedInteractionDataViewer";

export enum GridViewTypes {
    NONE,
    FILTERED_INTERACTION_LIST = 'List',
    SELECTED_PASSAGE_VIEWER = 'Passage',
    INTERACTION_GRAPH_VIEW = 'Graph',
    INTERACTION_CARD_VIEW = 'Card',
    CREATE_INTERACTION_FORM = 'New',
    SELECTED_INTERACTION_CARD = 'Selected Card',

}

export const GridView = (props: {
    selectedView: GridViewTypes
}) => {
    const [selectedView, setSelectedView] = useState<GridViewTypes>(GridViewTypes.FILTERED_INTERACTION_LIST);
    const allViews = [
        GridViewTypes.FILTERED_INTERACTION_LIST,
        GridViewTypes.SELECTED_PASSAGE_VIEWER,
        GridViewTypes.INTERACTION_GRAPH_VIEW,
        GridViewTypes.INTERACTION_CARD_VIEW,
        GridViewTypes.CREATE_INTERACTION_FORM,
        GridViewTypes.SELECTED_INTERACTION_CARD
    ]
    useEffect(() => {
        return () => {
            setSelectedView(props.selectedView)
        };
    }, []);

    return (
        <div>
            <div className={'flex space-x-2 px-2 justify-center text-xs pt-4'}>
                {/*    Iterate over views */}
                {allViews.map((view) => {
                    return <button
                        key={view}
                        className={selectedView === view ? 'bg-red-500 py-0.5 rounded px-2 text-white' : ''}
                        onClick={() => setSelectedView(view)}
                    >{view}</button>
                })}
            </div>

            {/*View Container*/}
            <div className={'p-4'}>
                {selectedView === GridViewTypes.FILTERED_INTERACTION_LIST && <FilteredInteractionList/>}

                {selectedView === GridViewTypes.SELECTED_INTERACTION_CARD && <SelectedInteractionDataViewer/>}

                {selectedView === GridViewTypes.SELECTED_PASSAGE_VIEWER &&
                    <div><SelectedPassageViewer></SelectedPassageViewer></div>}

                {selectedView === GridViewTypes.INTERACTION_GRAPH_VIEW && <div><InteractionGraphView/></div>}

                {selectedView === GridViewTypes.INTERACTION_CARD_VIEW && <div><InteractionCardView/></div>}

                {selectedView === GridViewTypes.CREATE_INTERACTION_FORM &&
                    <div><CreateOrUpdateInteractionFormView/></div>}
            </div>
        </div>
    )
}
