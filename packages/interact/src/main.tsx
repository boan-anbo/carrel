import React from "react";
import ReactDOM from 'react-dom'
import App from "./App";
import "./style.css";
import {ApolloProvider} from "@apollo/client";
import {getApolloClient} from "./Services/get-apollo-client";
import {Provider} from 'react-redux'
import {store} from "./store";
import {MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <ApolloProvider client={getApolloClient()}>
        <Provider store={store}>
            <MantineProvider withGlobalStyles withNormalizeCSS>

                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </MantineProvider>

        </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
);
