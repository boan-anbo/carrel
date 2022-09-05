import {useSelector} from "react-redux";
import {RootState} from "../store";

export const SelectedInteractionViewer = () => {
    // get selected interaction
    const selectedInteraction = useSelector( (state: RootState) => state.appstate.selectedInteraction);

    return (
        <div>
            {selectedInteraction?.label}
        </div>
    )
}
