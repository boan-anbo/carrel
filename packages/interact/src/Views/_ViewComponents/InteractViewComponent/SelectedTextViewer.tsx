import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {BsInputCursorText} from "react-icons/all";

export const SelectedTextViewer = () => {
    const selectedText = useSelector((state: RootState) => state.appstate.selectedInputText);
    return (
        <div className={'flex space-x-2 justify-items-center m-auto'}>
            <div className={'m-auto'} >
                <BsInputCursorText />
            </div>
            <div>
                <span className={'rounded bg-yellow-200 drop-shadow'}>
                {selectedText}
                    </span>
            </div>
        </div>
    )
}
