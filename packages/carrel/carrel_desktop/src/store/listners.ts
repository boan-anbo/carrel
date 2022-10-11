import {createListenerMiddleware} from "@reduxjs/toolkit";
import {setTauriWindow} from "../tauri/window/set-tauri-window";
import {setCurrentComponent} from "./slices/appstate/appstate";
import {getDirectoryName} from "../utils/get-directory-name";
import {setWorkingProject} from "./slices/working-project-state/working-project-state";
import {PlainMessage} from "@bufbuild/protobuf/dist/types/message";
import {ProjectInfo} from "../carrel_server_client/carrel/core/project_manager/v1/project_manager_v1_pb";

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
        actionCreator: setWorkingProject,
        effect: async (action, listenerApi) => {
            console.log("listenerMiddleware.startListening: openWorkingProject)",
            {
                action,
                listenerApi
            });

            if (action.payload) {

                const projectInfo = action.payload as PlainMessage<ProjectInfo>;
                // update tauri window when working folder is changed
                // setting tauri window
                console.info('Setting tauri window');
                await setTauriWindow(projectInfo.name);
            }

        }
    }
)

