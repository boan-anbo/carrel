import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import {ApolloProvider} from "@apollo/client";
import {getApolloClient} from "./utils/get-apollo-client";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ApolloProvider client={getApolloClient()}>
        <App/>
    </ApolloProvider>
);
