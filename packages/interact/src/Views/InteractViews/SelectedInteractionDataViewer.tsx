import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Interaction} from "../../BackEnd/grl-client/interact_db_client";
import {useEffect, useState} from "react";
import {InteractionCardView} from "../CardView/InteractionCardView";
import {getFullInteractionById} from "../../BackEnd/interact-db-client/filter-operations";
import {Logger, LogSource} from "../../Services/logger";
import {Button} from "@mantine/core";
import {goBackToLastInteraction} from "../../States/features/app-state/appStateSlice";
import {IconArrowLeft} from "@tabler/icons";

export const SelectedInteractionDataViewer = () => {
    const log = new Logger(LogSource.SelectedInteractionDataViewer)
    const [fullInteraction, setFullInteraction] = useState<Interaction | null>(null);
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


    function onButtonClick() {
        goBackToLastInteraction()
    }

    return (
        <div onClick={e => e.stopPropagation()}>
            {/* Reload button */}
            {fullInteraction && <div
                onClick={e => e.stopPropagation()}
            >
                <div>
                    {/*    Mantine button to go back */}
                    <Button variant='white'
                            leftIcon={<IconArrowLeft/>}
                            onClick={onButtonClick}
                    >
                        Go back
                    </Button>
                </div>
                <h2>Interaction data</h2>
                {/*    User html table */}
                <InteractionCardView interaction={fullInteraction}/>


            </div>}
            {!selectedInteraction && <div>No interaction selected</div>}
        </div>
    )
}
