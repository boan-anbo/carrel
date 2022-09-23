import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import "./App.css";
import {_indexGrids} from "./components/_indexGrids";
import {registerAllTaggerHotkeys} from "./utils/registerAll";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", {name}));
    }

    useEffect(() => {
        registerAllTaggerHotkeys();
    }, []);

    return (
        <div style={{
                height: '100vh',
                width: '100vw',
            }}
             className="bg-gray-400"
        >
            <_indexGrids />
        </div>
    );
}

export default App;
