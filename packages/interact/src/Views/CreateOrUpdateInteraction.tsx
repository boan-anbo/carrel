import {useState} from "react";
import {CreateOrUpdateInteractionRequestDtoInput} from "../clients/grl-client/interact_db_client";
import {InputTextSimple} from "../ControlComponents/InputTextSimple";
import {BiLabel} from "react-icons/all";

export const CreateOrUpdateInteraction = () => {
    const [createOrUpdateInteractionDto, setCreateOrUpdateInteractionDto] = useState<CreateOrUpdateInteractionRequestDtoInput>({
        contextIds: [],
        description: "",
        end: 0,
        firstActId: 0,
        id: undefined,
        identity: undefined,
        indirectObjectIds: [],
        label: "",
        objectIds: [],
        parallelIds: [],
        propertyIds: [],
        purposeIds: [],
        referenceIds: [],
        secondActId: 0,
        settingIds: [],
        start: undefined,
        subjectIds: [],
        uuid: undefined

    })

    function onInputTextSimpleInputChange(value: string) {

    }

    function onInputTextSimpleInputEnter(value: string) {

    }

    return (
        <div>
            <InputTextSimple
                placeholder={"Label"}
                onInputChange={onInputTextSimpleInputChange}
                onInputEnter={onInputTextSimpleInputEnter}>
                <BiLabel/>
            </InputTextSimple>
        </div>
    )
}
