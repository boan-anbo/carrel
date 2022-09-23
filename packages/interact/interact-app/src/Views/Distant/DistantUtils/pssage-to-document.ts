import {Passage} from "../../../BackEnd/distant_api";
import {
    CreateOrUpdateInteractionForm
} from "../../CreateOrUpdateInteraction/FormComponents/CreateOrUpdateInteractionForm";
import {InteractionIdentity} from "../../../BackEnd/grl-client/interact_db_client";
import {v4} from "uuid";

export const passageToDocument = (passage: Passage) => {
    const {document} = passage;
    const documentDto = CreateOrUpdateInteractionForm.fromInput({
        content: `${document.pages}\n${document.creators}\n${document.publication_date}\n`,
        data: null,
        dataType: null,
        description: document.description,
        end: null,
        identity: InteractionIdentity.Source,
        label: document.title,
        sentence: "",
        start: null,
        uri: document.source_id.length > 0 ? document.source_id : v4(),
    })

    let documentDto1 = documentDto;
    return documentDto1;

}
