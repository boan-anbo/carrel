import {DistantPassageInputEditor} from "./DistantPassageInputEditor";
import {useSelector} from "react-redux";
import {RootState} from "../store";

export const SelectedPassage = () => {
    const selectedPassage = useSelector((state: RootState) => state.appstate.selectedInputPassage);
    return (
        <div>
            {selectedPassage && <DistantPassageInputEditor passage={selectedPassage} index={0}/>}
            {!selectedPassage && <div>No passage selected</div>}
        </div>
    )
}
