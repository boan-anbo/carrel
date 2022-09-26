import {createGrpcWebTransport, createPromiseClient} from "@bufbuild/connect-web";
import {useState} from "react";
import "./App.css";
import {Header} from "./components/shared/layouts/header/Header";
import {Footer} from "./components/shared/layouts/footer/footer";
import {Body} from "./components/shared/layouts/body";


function App() {
    return (
        <div className={'layout-container'}>
            <Header />
            <Body></Body>
            <Footer/>
        </div>
    )
}

export default App;
