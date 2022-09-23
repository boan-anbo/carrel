import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Interaction, useGetInteractionFullQuery} from "../../BackEnd/grl-client/interact_db_client";
import {InteractCardView} from "../CardView/InteractCardView";
import {Logger, LogSource} from "../../Services/logger";
import {Button, LoadingOverlay, Title} from "@mantine/core";
import {goBackToLastInteraction} from "../../States/features/app-state/appStateSlice";
import {IconRefresh} from "@tabler/icons";
import {TitleBlock} from "../../Layouts/TitleBlock";

export const SelectedInteractionDataViewer = () => {
    const log = new Logger(LogSource.SelectedInteractionDataViewer)
    // const [fullInteraction, setFullInteraction] = useState<Interaction | null>(null);
    const selectedInteraction = useSelector((state: RootState) => state.appstate.selectedInteraction);

    const {data, loading, error, refetch} = useGetInteractionFullQuery({
        variables: {
            id: selectedInteraction?.id
        }
    });

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}
        </div>
    }

    // const loadFullInteraction = async () => {
    //     if (!selectedInteraction) {
    //         setFullInteraction(null);
    //         return;
    //     }
    //     log.debug("loadFullInteraction", 'selected interaction', selectedInteraction)
    //     const fullInteraction = await getFullInteractionById(selectedInteraction?.id ?? 0);
    //     console.log(fullInteraction);
    //     setFullInteraction(fullInteraction);
    // }

    // useEffect(() => {
    //     loadFullInteraction();
    // }, [selectedInteraction]);
    if (data) {
        log.info("SelectedInteractionDataViewer", "data", data)
    }


    function onButtonClick() {
        goBackToLastInteraction()
    }

    return (
        <div onClick={e => e.stopPropagation()}>
            {/* Reload button */}
            {data && <div
                onClick={e => e.stopPropagation()}
            >
                {/*<div>*/}
                {/*    /!*    Mantine button to go back *!/*/}
                {/*    <Button variant='white'*/}
                {/*            leftIcon={<IconArrowLeft/>}*/}
                {/*            onClick={onButtonClick}*/}
                {/*    >*/}
                {/*        Go back*/}
                {/*    </Button>*/}
                {/*</div>*/}

                <Button
                    loading={loading}

                    variant={'white'}>
                    <IconRefresh onClick={() => refetch()}/>
                </Button>
                {/*    User html table */}
                {/*loading overlay*/}
                <LoadingOverlay visible={loading}/>
                {!loading && <InteractCardView interaction={data.interactionFull.interaction as Interaction}/>
                }

            </div>}
            {!selectedInteraction && <div>No interaction selected</div>}
        </div>
    )
}
