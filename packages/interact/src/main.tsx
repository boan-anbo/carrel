import React from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import "./style.css";
import {ApolloProvider} from "@apollo/client";
import {getApolloClient} from "./utils/get-apollo-client";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {Provider} from 'react-redux'
import {store} from "./store";


ReactDOM.render(
    <ApolloProvider client={getApolloClient()}>
        <Provider store={store}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <App/>

            </DevSupport>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
);
