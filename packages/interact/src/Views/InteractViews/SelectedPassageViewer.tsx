import {DistantPassageInputEditor} from "./DistantPassageInputEditor";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const SelectedPassageViewer = () => {
    const {selectedPassage} = useSelector((state: RootState) => {
                return {
                    selectedPassage: state.appstate.selectedInputPassage,
                }
            }
        )
    ;
    return (
        <div>
            {selectedPassage != null && <DistantPassageInputEditor passage={selectedPassage} index={0}/>}
            {/*{!selectedPassage && <div>No passage selected</div>}*/}
        </div>
    )
}
