import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import {Provider} from "react-redux";
import store from "./store/store";
import {BrowserRouter} from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>

        {/*  Add redux provider */}
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
