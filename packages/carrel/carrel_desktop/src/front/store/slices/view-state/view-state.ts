import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContainerId } from './container-id';
import { ViewId } from './view-id';
import { ViewStateAction } from './view-actions';
import { getViewDefaultName } from "./get-view-default-name";
import { v4 } from 'uuid';


const allViewContainers: ContainerId[] = [
    ContainerId.LEFT_PANEL_CONTAINER,
    ContainerId.RIGHT_PANEL_CONTAINER,
    ContainerId.WORK_AREA_CONTAINER,
];

export interface ViewState<T> {
    uuid: string;
    id: ViewId;
    title: string;
    // a state to persist between view switch.
    // For example, a position of a scroll bar, the id of an opened document, etc.
    state?: T;
    visible?: boolean;
}


export interface UpdateViewStatePayload<T> {
    action: ViewStateAction;
    container: ContainerId;
    /**
     * This is optional because ADD and REMOVE actions don't need it.
     */
    fromContainer?: ContainerId;
    // if true, the current state will be kept and the state in the payload will be ignored.
    keepState?: boolean;
    viewState?: ViewState<T>;
    removeExisting?: boolean;
}


/**
 * View state holds all states related to view settings.
 * Typical usage is to store the state of a container that shows a certain views.
 */
export interface AppViewStates {
    [ContainerId.LEFT_PANEL_CONTAINER]: ViewState<any>[]
    [ContainerId.RIGHT_PANEL_CONTAINER]: ViewState<any>[]
    /**
     * The first view in the array is the first view.
     */
    [ContainerId.WORK_AREA_CONTAINER]: ViewState<any>[]
}

const initialState: AppViewStates = {
    [ContainerId.LEFT_PANEL_CONTAINER]: [
        {
            id: ViewId.PROJECT_FILE,
            title: getViewDefaultName(ViewId.PROJECT_FILE),
            visible: true,
            uuid: v4(),
        },

        {
            id: ViewId.CORE_TAG_TREE,
            title: getViewDefaultName(ViewId.CORE_TAG_TREE),
            visible: true,
            uuid: v4(),
        },
        {
            id: ViewId.ARCHIVE_LIST,
            title: getViewDefaultName(ViewId.ARCHIVE_LIST),
            visible: true,
            uuid: v4(),
        },
    ],
    [ContainerId.RIGHT_PANEL_CONTAINER]: [
        {
            id: ViewId.INSPECTOR_BLOCK,
            title: getViewDefaultName(ViewId.INSPECTOR_BLOCK),
            visible: true,
            uuid: v4(),
        },
        {
            id: ViewId.CARD_BLOCK,
            title: getViewDefaultName(ViewId.CARD_BLOCK),
            visible: true,
            uuid: v4(),
        },
        {
            id: ViewId.ARCHIVE_FILES,
            title: getViewDefaultName(ViewId.ARCHIVE_FILES),
            visible: true,
            uuid: v4(),
        },
    ],
    [ContainerId.WORK_AREA_CONTAINER]: [
        {
            id: ViewId.EMPTY,
            title: 'Empty view',
            visible: true,
            uuid: v4(),
        },
        {
            id: ViewId.CARREL_WRITER,
            title: 'Carrel Writer',
            visible: true,
            uuid: v4(),
        }
    ],
}

export const viewStateSlice = createSlice({
    name: 'view-state',
    initialState,
    reducers: {
        updateViewStateVisibility: (state, action: PayloadAction<{ uuid: string, visible: boolean }>) => {
            const { uuid, visible } = action.payload;
            for (const container of allViewContainers) {
                const viewState = state[container].find(view => view.uuid === uuid);
                if (viewState) {
                    viewState.visible = visible;
                    return;
                }
            }
        },
        toggleViewStateVisibility: (state, action: PayloadAction<{ uuid: string }>) => {
            const { uuid } = action.payload;
            for (const container of allViewContainers) {
                const viewState = state[container].find(view => view.uuid === uuid);
                if (viewState) {
                    viewState.visible = !viewState.visible;
                    return;
                }
            }
            console.log('toggleViewStateVisibility: view state not found');
        },

        updateViewState: (state, updateAction: PayloadAction<UpdateViewStatePayload<any>>) => {
            const { action, container, fromContainer, keepState, viewState, removeExisting } = updateAction.payload;

            switch (action) {
                case ViewStateAction.ADD:
                    if (!viewState) {
                        throw new Error('viewState is required for ADD action');
                    }
                    // whether to remove the existing view state with the same id.
                    // This is used when you just need to move a view to container without worrying about where the view is currently in.
                    if (removeExisting) {
                        // go over all containers to try if the view state exists in other containers.
                        // if it does, remove it.
                        for (const c of allViewContainers) {
                            const removeIndex = state[c].findIndex((v) => v.id === viewState.id);
                            if (removeIndex !== -1) {
                                state[c].splice(removeIndex, 1);
                                break;
                            }
                        }
                    }
                    state[container].push(viewState);
                    break;
                case ViewStateAction.REMOVE:
                    if (!viewState) {
                        throw new Error('viewState is required for REMOVE action');
                    }
                    const removeIndex = state[container].findIndex((v) => v.id === viewState.id);
                    if (removeIndex === -1) {
                        throw new Error(`viewState with id ${viewState.id} is not found in ${container}`);
                    }
                    state[container].splice(removeIndex, 1);
                    break;
                case ViewStateAction.MOVE:
                    if (!fromContainer) {
                        throw new Error('fromContainer is required for MOVE action');
                    }
                    if (!viewState) {
                        throw new Error('viewState is required for MOVE action');
                    }
                    const moveIndex = state[fromContainer].findIndex((v) => v.id === viewState.id);
                    if (moveIndex === -1) {
                        throw new Error(`viewState with id ${viewState.id} is not found in ${fromContainer}`);
                    }
                    const moveViewState = state[fromContainer].splice(moveIndex, 1)[0];
                    if (!keepState) {
                        moveViewState.state = viewState.state;
                    }
                    const addIndex2 = state[container].findIndex((v) => v.order > moveViewState.order);
                    if (addIndex2 === -1) {
                        state[container].push(moveViewState);
                    } else {
                        state[container].splice(addIndex2, 0, moveViewState);
                    }
                    break;
                default:
                    throw new Error('Unknown action');
            }
        }
    },
})

export const {
    updateViewState,
    updateViewStateVisibility,
    toggleViewStateVisibility,
} = viewStateSlice.actions

export default viewStateSlice.reducer;
