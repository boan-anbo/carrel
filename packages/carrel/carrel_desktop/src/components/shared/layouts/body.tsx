import {Workarea} from "./workarea/Workarea";
import {LeftNav} from "./leftnav/LeftNav";
import {Inspector} from "../inspector/inspector";

function RightInspector() {
    return <div className={'layout-right-inspector'}>
        <Inspector />
        </div>;
}

export function Body() {
    return <div className={'layout-body'}>

        <LeftNav />
        <Workarea/>

        <RightInspector/>
    </div>;
}
