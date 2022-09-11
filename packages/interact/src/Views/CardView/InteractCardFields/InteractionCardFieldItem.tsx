import {Interaction} from "../../../BackEnd/grl-client/interact_db_client";
import Tiptap from "../../_ViewComponents/TextEditorView/Tiptap";
import {Logger, LogSource} from "../../../Services/logger";
import {ReactNode, useState} from "react";

export function InteractionCardFieldItem(props: {
    fieldValue: string | undefined | null;
    interaction: Interaction,
    label: string,
    icon: JSX.Element,
    showLabel?: boolean,
    hideWhenNoValue?: boolean,
    onValueChange?: (value: string) => void
}) {
    const log = new Logger(LogSource.InteractionCardFieldItem)

    const shouldShow = props.hideWhenNoValue ? props.fieldValue !== '' : true;

    function onTiptapSave(content: string) {
        setShowEditor(false)
        if (props.onValueChange) {
            props.onValueChange(content)
        }

    }

    const [showEditor, setShowEditor] = useState(false)

    const showFields = (): ReactNode => {

        if (props.fieldValue && !showEditor) {
            return <span className={'cursor-text'} onClick={() => setShowEditor(true)}>{props.fieldValue}</span>
        }

        if (props.fieldValue && showEditor) {

            return <Tiptap initialContent={props.fieldValue} size={'small'} onSave={onTiptapSave}></Tiptap>
        }

        return <span className={'text-gray-300 font-bold'}>No value</span>
    }

    return <div> {shouldShow && <div className={'flex space-x-2 justify-items-center content-center'}>
        <div className={'my-auto'}>
            {props.icon}
        </div>

        <div>
            {props.showLabel &&
                <span>{props.label}</span>
            }
        </div>
        <div className={'pretty-label-font'}>
        </div>
        {showFields()}
    </div>
    }
    </div>
}

// default props
InteractionCardFieldItem.defaultProps = {
    showLabel: false,
    hideWhenNoValue: true
}
