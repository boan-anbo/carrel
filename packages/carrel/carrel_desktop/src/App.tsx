import {createGrpcWebTransport, createPromiseClient} from "@bufbuild/connect-web";
import {useEffect, useState} from "react";
import "./App.css";
import {Header} from "./components/shared/layouts/header/Header";
import {Footer} from "./components/shared/layouts/footer/footer";
import {Body} from "./components/shared/layouts/body";
import {invoke} from "@tauri-apps/api";


function App() {
    useEffect(() => {
        invoke("launch_carrel_server").then((result) => {
            console.log("launch_carrel_server result: ", result);
        });
    })
    return (
        <div className={'layout-container'}>
            <Header />
            <Body></Body>
            <Footer/>
        </div>
    )
}

export default App;
