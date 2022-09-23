export enum LogSource {
    CreateInteractionForm = 'CreateInteractionForm',
    FilterInteractionMultiple = 'FilterInteractionMultiple',
    GetInteractionSelectionLabel = 'GetInteractionSelectionLabel',
    SelectedInteractionDataViewer = 'SelectedInteractionDataViewer',
    CreateInteractionEntity = 'CreateInteractionEntity',
    OnFormRelationSelectedHandler = 'OnFormRelationSelectedHandler',
    CreateFormData = 'CreateFormData',
    INTERACTION_GRAPH_VIEW = 'InteractionGraphView',
    GraphMultiView = 'GraphMultiView',
    handleDoubleClickOnNode = 'handleDoubleClickOnNode',
    handleSingleClickOnNode = 'handleSingleClickOnNode',
    handleClickOnEdge = 'handleClickOnEdge',
    InteractionCardFieldItem = 'InteractionCardFieldItem',
    FetchFilteredInteractionData = 'FetchFilteredInteractionData',
    FilterInteractionSingle = 'FilterInteractionSingle',
    InteractionCardView = 'InteractionCardView',
    AppStateSlice = 'AppStateSlice',
    SearchState = 'SearchState',
    App = 'App',
    ServerService = "ServerService",
    DistantServer = "DistantServer",
    InteractServer = "InteractServer",
    InteractServerIndex = "InteractServerIndex",
    ExplorerState = "ExplorerState",
    DistantDocumentSearchViewIndex = "DistantDocumentSearchViewIndex",
    LinkInputButton = "LinkInputButton",
}

export class Logger {
    private logSource: LogSource;

    constructor(logSource: LogSource) {
        this.logSource = logSource;
    }

    success = (message: string, payloadType?: string, payload?: any) => {
        // console success emoji
        console.log('%c✅%c', 'font-size: 1.5em; color: green', 'color: black', message, payload);
        console.log(this.output(message, payload));
        if (payloadType && payload) {
            console.log(`[${payloadType}]`, payload);
        }
    }

    info = (message: string, payloadType?: string, payload?: any) => {
        // console info emoji
        console.log('%cℹ%c', 'font-size: 1.5em; color: blue', 'color: black');
        console.log(this.output(message, payload));
        if (payloadType && payload) {
            console.log(`[${payloadType}]`, payload);
        }
    }
    error = (message: string, payloadType?: string, payload?: any) => {
        console.error('%c🛑%c', 'font-size: 1.5em; color: red', 'color: black');
        console.error(this.output(message, payload));
        if (payloadType && payload) {
            console.log(`[${payloadType}]`, payload);
        }
    }

    warn = (message: string, payloadType?: string, payload?: any) => {
        console.warn('⚠');
        console.warn(this.output(message, payload));
        if (payloadType && payload) {
            console.warn(`[${payloadType}]`, payload);
        }
    }

    debug = (message: string, payloadType?: string, payload?: any) => {
        console.debug('%c🐞 DEBUG', 'font-size: 2em; color: purple');
        console.debug(this.output(message, payload));
        if (payloadType && payload) {
            console.debug(`[${payloadType}]`, payload);
        }

    }

    private output = (message: string, payload: any) => {

        return `[${this.logSource.toString()}] ${message}`;
    }

}
