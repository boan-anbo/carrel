import {createGrpcWebTransport, createPromiseClient} from "@bufbuild/connect-web";
import {useEffect, useState} from "react";
import "./App.css";
import "./theme.css";
import {Header} from "./components/core/layouts/header/Header";
import {Footer} from "./components/core/layouts/footer/footer";
import {Body} from "./components/core/layouts/body";
import {invoke} from "@tauri-apps/api";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";

const queryClient = new QueryClient();

function App() {
    useEffect(() => {
        invoke("launch_carrel_server").then((result) => {
            console.log("launch_carrel_server result: ", result);
        });
    })
    return (
        <QueryClientProvider client={queryClient}>
        <div className={'layout-container'}>
            <Header />
            <Body></Body>
            <Footer/>
        </div>
            <ToastContainer />
        </QueryClientProvider>
    )
}

export default App;
