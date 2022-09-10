import {NestedPopover} from "./NestedPopover";
import './NestedPopover.css'
import {useState} from "react";
import {Button} from "antd";

export const SelectTextAction = () => {
    const [defaultOpen, setDefaultOpen] = useState(false)

    function openHandler(setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
        setOpen(true)

    }

    return (
        <div onMouseDown={e => e.stopPropagation()}>

            <Button type="primary" onClick={() => {
                setDefaultOpen(!defaultOpen)
            }}>Select Text</Button>


            <NestedPopover
                open={defaultOpen}

                render={({close, labelId, descriptionId}) => (
                    <div>
                        Popover
                    </div>
                )}

            >
                <div></div>
            </NestedPopover>
        </div>
    )
}
