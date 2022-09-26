import {createListenerMiddleware} from "@reduxjs/toolkit";
import {setTauriWindow} from "../tauri/window/set-tauri-window";
import {setCurrentComponent} from "./slices/appstate/appstate";
import {openWorkingProject} from "./slices/working-project-state/working-project-state";
import {getDirectoryName} from "../utils/get-directory-name";

export const listenerMiddleware = createListenerMiddleware();


listenerMiddleware.startListening(
    {
        // this listener is trigger for this action: setCurrentComponent
        actionCreator: setCurrentComponent,
        effect: async (action, listenerApi) => {
            console.log({
                action,
                listenerApi
            });


            console.log('Listener middleware is triggered!');
        }
    }
)


// TODO typing the listeners
listenerMiddleware.startListening(
    {
        // this listener is trigger for this action: setCurrentComponent
        actionCreator: openWorkingProject,
        effect: async (action, listenerApi) => {
            console.log("listenerMiddleware.startListening: openWorkingProject)",
            {
                action,
                listenerApi
            });

            const projectName = getDirectoryName(action.payload);
            // update tauri window when working folder is changed
            // setting tauri window
            console.info('Setting tauri window');
            await setTauriWindow(projectName);
        }
    }
)

