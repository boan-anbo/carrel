import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContainerId } from './container-id';
import { ViewId } from './view-id';
import { ViewStateAction } from './view-actions';
import {getViewDefaultName} from "./get-view-default-name";


const allViewContainers: ContainerId[] = [
    ContainerId.LEFT_PANEL_CONTAINER,
    ContainerId.RIGHT_PANEL_CONTAINER,
    ContainerId.WORK_AREA_CONTAINER,
];

export interface ViewState<T> {
    id: ViewId;
    order: number;
    title: string;
    // a state to persist between view switch.
    // For example, a position of a scroll bar, the id of an opened document, etc.
    state?: T;
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

    ],
    [ContainerId.RIGHT_PANEL_CONTAINER]: [
        {
            id: ViewId.CORE_TAG_FIREFLIES,
            order: 0,
            title: getViewDefaultName(ViewId.CORE_TAG_FIREFLIES)
        },
        {
            id: ViewId.ARCHIVE_FILES,
            order: 1,
            title: getViewDefaultName(ViewId.ARCHIVE_FILES)
        },
        {
            id: ViewId.INSPECTOR_BLOCK,
            order: 2,
            title: getViewDefaultName(ViewId.INSPECTOR_BLOCK)
        }
    ],
    [ContainerId.WORK_AREA_CONTAINER]: [
        {
            id: ViewId.EMPTY,
            order: 0,
            title: 'Empty view',
        },
        {
            id: ViewId.CARREL_WRITER,
            order: 1,
            title: 'Carrel Writer',
        }
    ],
}

export const viewStateSlice = createSlice({
    name: 'view-state',
    initialState,
    reducers: {
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
                    // insert the view state to the array by the position of the order.
                    const addIndex = state[container].findIndex((v) => v.order > viewState.order);
                    if (addIndex === -1) {
                        state[container].push(viewState);
                    } else {
                        state[container].splice(addIndex, 0, viewState);
                    }

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

} = viewStateSlice.actions

export default viewStateSlice.reducer;
