import {createConnectTransport, createGrpcWebTransport, createPromiseClient} from "@bufbuild/connect-web";
import {useEffect, useState} from "react";
import "./App.css";
import {ScaffoldNewProjectService} from "./generated_clients/carrel_scaffold/v1/scaffold_connectweb";

const transport = createGrpcWebTransport({
    baseUrl: "http://127.0.0.1:8081",
});

const client = createPromiseClient(ScaffoldNewProjectService, transport);

function App() {

    const [result, setResult] = useState("Click the button to invoke Rust");

    const load = async () => {
        client.scaffoldNewProject({
            projectName: "test",
            projectParentDir: "tmp",
        }).then((response) => {
            console.log(response);
        });
    }

    useEffect(() => {

        load()
    }, []);


    return (
        <div>{result}</div>
    )
}

export default App;
