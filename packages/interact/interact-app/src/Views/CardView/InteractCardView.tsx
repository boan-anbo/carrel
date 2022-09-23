import FilterInteractionSingle from "../_ViewComponents/Selectors/FilterInteractionSingle";
import {useEffect, useState} from "react";
import {Interaction, Relation,} from "../../BackEnd/grl-client/interact_db_client";
import {getFullInteractionById} from "../../BackEnd/interact-db-client/query-operations";
import {notify} from "../../Services/toast/notify";
import {useDispatch} from "react-redux";
import {selectInteraction} from "../../States/features/app-state/appStateSlice";
import {Logger, LogSource} from "../../Services/logger";
import {InteractCardRelationFields} from "./InteractCardRelationFields";
import {InteractCardPropertyFields} from "./InteractCardPropertyFields";
import {BsCalendarDate} from "react-icons/all";
import {Text} from '@mantine/core';
import {parseDateForPicker, parseDateTime} from "../../Utils/ParseDateForPicker";

interface InteractionCardViewProps {
    interaction?: Interaction
}

const log = new Logger(LogSource.InteractionCardView)

export function InteractCardView(props: InteractionCardViewProps) {


    const [interaction, setInteraction] = useState<Interaction | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {

        if (props.interaction) {
            setInteraction(props.interaction);
        }
    }, [props.interaction]);


    function onInteractionCardRelationFieldItemClickRelation(relation: Relation) {
        log.info('onInteractionCardRelationFieldItemClickRelation', 'relation', relation)
        dispatch(
            selectInteraction(relation.linkedInteraction as Interaction)
        )
    }

    return <div className={'px-4'} onMouseDown={e => e.stopPropagation()}>

        <FilterInteractionSingle
            placeholder={'Search interaction'}
            style={{width: '100%'}}
            onSingleSelectionChange={async (e) => {
                if (e.value) {
                    const interaction = await getFullInteractionById(parseInt(e.value as string));
                    setInteraction(interaction);
                } else {
                    notify('No interaction found', 'check server', 'error');
                }
            }}
        />
        {interaction &&
            <div>
                <div className={"space-x-0 space-y-4 my-2"}>
                    <InteractCardPropertyFields interaction={interaction}/>

                    <InteractCardRelationFields interaction={interaction}
                                                onClickRelation={onInteractionCardRelationFieldItemClickRelation}/>

                </div>
            </div>
        }
    </div>
        ;
}
