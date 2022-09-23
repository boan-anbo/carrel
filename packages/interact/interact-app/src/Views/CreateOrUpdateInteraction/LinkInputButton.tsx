import {useEffect, useState} from "react";
import {Button, ActionIcon} from '@mantine/core';
import {IconLink, IconLinkOff} from "@tabler/icons";
import {Passage} from "../../BackEnd/distant_api";
import {Interaction} from "../../BackEnd/grl-client/interact_db_client";
import {passageToDocument} from "../Distant/DistantUtils/pssage-to-document";
import {getFullInteractionByUri} from "../../BackEnd/interact-db-client/query-operations";
import {createOrUpdateInteraction} from "../../BackEnd/interact-db-client/create-interaction-entity";
import {Logger, LogSource} from "../../Services/logger";

// this is a dynamic link button shown on the create or update interaction form when there is an input selected.
// Pressing this button will link or unlink the inputs, mostly often it means adding a reference relation.

const log = new Logger(LogSource.LinkInputButton)
export const LinkInputButton = (props: {
    passage: Passage | null,
    onReferenceInputChange: (document: Interaction | null) => void,
}) => {

    const [isLinked, setIsLinked] = useState(false);

    const [passage, setPassage] = useState<Passage | null>(null);

    // existing or newly created interaction ready to be emitted to the upper level.
    const [referenceInteraction, setReferenceInteraction] = useState<Interaction | null>(null);

    const createPassageReference = async (passage: Passage) => {

        // creating linked reference
        log.info('creating linked reference')
        const {document} = passage;

        let documentInteractionToEmit: Interaction | null = null
        if (document) {
            const documentDto = passageToDocument(passage);

            // check if document with the same uri already exists
            if (!documentDto.uri) {
                return;
            }
            const existingDocumentWithUri = await getFullInteractionByUri(documentDto.uri);
            log.info('existing document with uri', 'existing document', existingDocumentWithUri)
            if (existingDocumentWithUri) {
                documentInteractionToEmit = existingDocumentWithUri;
                log.info("retrived document interaction", 'document interaction', existingDocumentWithUri)
            } else {
                // else, create a new interaction and return it.
                documentInteractionToEmit = await createOrUpdateInteraction(documentDto);
                log.info("created new document interaction", "document interaction", documentInteractionToEmit)
            }
        }

        setReferenceInteraction(documentInteractionToEmit);

        if (!documentInteractionToEmit) {
            log.error("unable to emit document interact")
            return;
        }

        props.onReferenceInputChange(documentInteractionToEmit)

    }


    useEffect(() => {
        if (props.passage) {
            setPassage(props.passage);
        }
    }, [props.passage]);


    const onLink = async () => {
        // check if it already exists, if so retrieve the interaction and emit link event.
        if (!passage) {
            return;
        }
        await createPassageReference(passage)
        setIsLinked(true);
    }

    const onUnlink = () => {
        props.onReferenceInputChange(null)
        setIsLinked(false)
    }

    const buttons = isLinked ?
        <ActionIcon
            onClick={onUnlink}
            size={'xs'}
            color={'pink'}
        >
            <IconLinkOff/>
        </ActionIcon>
        :
        <ActionIcon
            onClick={onLink}
            size={'xs'}
            color={'lime'}
        >
            <IconLink/>
        </ActionIcon>
    return (
        <div className='text-xs justify-center space-x-2 flex'>
            {buttons}
            <button>
                {props.passage?.document.title.split(' ').slice(0, 9).join(' ')}
            </button>
        </div>);
}
