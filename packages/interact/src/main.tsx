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
import {NotificationsProvider} from "@mantine/notifications";
import {SpotlightProvider} from "@mantine/spotlight";
import {spotlightActions, SpotlightControl} from "./Spotlight/spotlight";
import {IconSearch} from "@tabler/icons";


ReactDOM.render(
    <ApolloProvider client={getApolloClient()}>
        <Provider store={store}>
            <MantineProvider withGlobalStyles withNormalizeCSS>

                <SpotlightProvider
                    actions={spotlightActions}
                    searchIcon={<IconSearch size={18}/>}
                    searchPlaceholder="Search..."
                    shortcut="mod + shift + 1"
                    nothingFoundMessage="Nothing found..."
                >
                    <NotificationsProvider position={'top-right'}>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>

                        <SpotlightControl/>
                    </NotificationsProvider>

                </SpotlightProvider>
            </MantineProvider>

        </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
);
