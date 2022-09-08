import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Interaction} from "../../clients/grl-client/interact_db_client";
import {useEffect, useState} from "react";
import {InteractionCardView} from "./InteractionCardView";
import {getFullInteractionById} from "../../clients/interact-db-client/filter-operations";
import {Logger, LogSource} from "../../utils/logger";

export const SelectedInteractionDataViewer = () => {
    const log = new Logger(LogSource.SelectedInteractionDataViewer)
    const [fullInteraction, setFullInteraction] = useState<Interaction | null>(null);
    // get selected interaction
    const selectedInteraction = useSelector((state: RootState) => state.appstate.selectedInteraction);


    const loadFullInteraction = async () => {
        if (!selectedInteraction) {
            setFullInteraction(null);
            return;
        }
        log.debug("loadFullInteraction", 'selected interaction', selectedInteraction)
        const fullInteraction = await getFullInteractionById(selectedInteraction?.id ?? 0);
        console.log(fullInteraction);
        setFullInteraction(fullInteraction);
    }

    useEffect(() => {
            loadFullInteraction();
    }, [selectedInteraction]);



    return (
        <div onClick={e => e.stopPropagation()}>
            {/* Reload button */}
            {fullInteraction && <div
                onClick={e => e.stopPropagation()}
            >
                <h2>Interaction data</h2>
                {/*    User html table */}
                <InteractionCardView  interaction={fullInteraction}/>


            </div>}
            {!selectedInteraction && <div>No interaction selected</div>}
        </div>
    )
}
