import {instanceOf} from "graphql/jsutils/instanceOf";

export enum LogSource {
    App = 'App',
    CreateInteractionForm = 'Create Interaction Form',
    FilterInteractionMultiple = 'Filter Interaction Multiple',
    GetInteractionSelectionLabel = 'Get Interaction Selection Label',
    SelectedInteractionDataViewer = 'Selected Interaction Data Viewer',
    CreateInteractionEntity = 'Create Interaction Entity Operation',
    OnFormRelationSelectedHandler = 'On Form Relation Selected Handler',
    CreateFormData = 'Create Form Data',
}

export class Logger {
    private logSource: LogSource;

    constructor(logSource: LogSource) {
        this.logSource = logSource;
    }

    success = (message: string, payloadType?:string, payload?: any) => {
        // console success emoji
        console.log('%c✅%c', 'font-size: 1.5em; color: green', 'color: black', message, payload);
        console.log(this.output(message, payload));
        if (payloadType && payload) {
            console.log(`[${payloadType}]`, payload);
        }
    }

    info = (message: string, payloadType?:string, payload?: any) => {
        // console info emoji
        console.log('%cℹ%c', 'font-size: 1.5em; color: blue', 'color: black');
        console.log(this.output(message, payload));
        if (payloadType && payload) {
            console.log(`[${payloadType}]`,payload);
        }
    }
    error = (message: string, payloadType?:string, payload?: any) => {
        console.error('%c🛑%c', 'font-size: 1.5em; color: red', 'color: black');
        console.error(this.output(message, payload));
        if (payloadType && payload) {
            console.log(`[${payloadType}]`,payload);
        }
    }

    warn = (message: string, payloadType?:string, payload?: any) => {
        console.warn('⚠');
        console.warn(this.output(message, payload));
        if (payloadType && payload) {
            console.warn(`[${payloadType}]`,payload);
        }
    }

    debug = (message: string, payloadType?:string, payload?: any) => {
        console.debug('%c🐞 DEBUG', 'font-size: 2em; color: purple');
        console.debug(this.output(message, payload));
        if (payloadType && payload) {
            console.debug(`[${payloadType}]`,payload);
        }

    }

    private output = (message: string, payload: any) => {

        return `[${this.logSource}] ${message}`;
    }

}
