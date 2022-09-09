import {useEffect, useState} from "react";
import {FilteredInteractionList} from "../Views/InteractViews/FilteredInteractionList";
import {InteractionCardView} from "../Views/InteractViews/InteractionCardView";
import {InteractionGraphView} from "../Views/InteractViews/InteractionGraphView";
import {SelectedPassageViewer} from "../Views/InteractViews/SelectedPassageViewer";
import {
    CreateOrUpdateInteractionFormView
} from "../Views/InteractViews/CreatOrUpdateInteractionForm/CreateOrUpdateInteractionFormView";
import {SelectedInteractionDataViewer} from "../Views/InteractViews/SelectedInteractionDataViewer";
import {RecentInteractionsList} from "../Views/InteractViews/RecentInteractions/RecentInteractionsList";
import GraphMultiView from "../Views/graph/GraphMulti/GraphMultiView";

export enum GridViewTypes {
    NONE,
    FILTERED_INTERACTION_LIST = 'List',
    SELECTED_PASSAGE_VIEWER = 'Passage',
    INTERACTION_GRAPH_VIEW = 'Graph',
    INTERACTION_CARD_VIEW = 'Card',
    CREATE_INTERACTION_FORM = 'New',
    SELECTED_INTERACTION_CARD = 'Selected Card',
    RECENT_INTERACTIONS = 'Recent',
    GRAPH_MULTI_VIEW = 'Multi Graph',

}

export const GridView = (props: {
    selectedView: GridViewTypes
}) => {
    const [selectedView, setSelectedView] = useState<GridViewTypes>(GridViewTypes.FILTERED_INTERACTION_LIST);
    const allViews = [
        GridViewTypes.RECENT_INTERACTIONS,
        GridViewTypes.FILTERED_INTERACTION_LIST,
        GridViewTypes.SELECTED_PASSAGE_VIEWER,
        GridViewTypes.INTERACTION_GRAPH_VIEW,
        GridViewTypes.INTERACTION_CARD_VIEW,
        GridViewTypes.CREATE_INTERACTION_FORM,
        GridViewTypes.SELECTED_INTERACTION_CARD,
        GridViewTypes.GRAPH_MULTI_VIEW,
    ]
    useEffect(() => {
        setSelectedView(props.selectedView)
    }, [props.selectedView]);

    return (
        <div style={{height: '100%'}} onMouseDown={e => e.stopPropagation()}>
            <div style={{maxHeight: '10%'}} className={'flex space-x-2 px-2 justify-center text-xs pt-4'}>
                {/*    Iterate over views */}
                {allViews.map((view) => {
                    return <button
                        key={view}
                        className={selectedView === view ? 'b1-active' : 'b1'}
                        onClick={() => setSelectedView(view)}
                    >{view}</button>
                })}
            </div>

            {/*View Container*/}
            <div style={{height: '90%'}} className={'p-4  overflow-y-scroll'}>
                {selectedView === GridViewTypes.RECENT_INTERACTIONS && <RecentInteractionsList/>}
                {selectedView === GridViewTypes.FILTERED_INTERACTION_LIST && <FilteredInteractionList/>}
                {selectedView === GridViewTypes.SELECTED_INTERACTION_CARD && <SelectedInteractionDataViewer/>}
                {selectedView === GridViewTypes.GRAPH_MULTI_VIEW && <GraphMultiView/>}
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