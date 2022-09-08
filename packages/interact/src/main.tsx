import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import {ApolloProvider} from "@apollo/client";
import {getApolloClient} from "./utils/get-apollo-client";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {Provider} from 'react-redux'
import {store} from "./store";
import {BrowserTracing} from "@sentry/tracing";
import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://63b354a9759d4033ac57d0d4122edec7@o1400094.ingest.sentry.io/6728422",
    integrations: [new BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ApolloProvider client={getApolloClient()}>
        <Provider store={store}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <App/>

            </DevSupport>
        </Provider>
    </ApolloProvider>
);
