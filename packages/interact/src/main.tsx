import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import {ApolloProvider} from "@apollo/client";
import {getApolloClient} from "./utils/get-apollo-client";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ApolloProvider client={getApolloClient()}>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <App/>
        </DevSupport>
    </ApolloProvider>
);
