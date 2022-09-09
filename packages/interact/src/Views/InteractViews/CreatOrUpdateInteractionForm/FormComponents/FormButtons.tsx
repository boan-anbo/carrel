import {FormMode} from "./EFormMode";

export function FormButtons(props: { mode: FormMode, onClick: () => void, onClick1: () => void }) {
    return <div className={"flex space-x-2"}>
        {/* conditional */}
        <button className={props.mode === FormMode.UPDATE ? "b2-active" : "b2"}
                onClick={props.onClick}>Edit
        </button>
        <button className={props.mode === FormMode.CREATE ? "b2-active" : "b2"}
                onClick={props.onClick1}>New
        </button>
    </div>;
}
