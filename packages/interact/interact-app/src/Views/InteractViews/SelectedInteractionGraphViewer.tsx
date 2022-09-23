import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {InteractionGraphView} from "./InteractionGraphView";

export const SelectedInteractionGraphViewer = () => {
    // get selected interaction
    const selectedInteraction = useSelector((state: RootState) => state.appstate.selectedInteraction);

    return (
        <div>
            {selectedInteraction && <InteractionGraphView id={selectedInteraction.id}/>}
            {!selectedInteraction && <div>No interaction selected</div>}
        </div>
    )
}
