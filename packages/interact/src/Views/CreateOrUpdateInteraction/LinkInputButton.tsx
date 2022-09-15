import {useState} from "react";
import {Button} from '@mantine/core';
import {IconLink, IconLinkOff} from "@tabler/icons";

// this is a dynamic link button shown on the create or update interaction form when there is an input selected.
// Pressing this button will link or unlink the inputs, mostly often it means adding a reference relation.

export const LinkInputButton = () => {


    const [isLinked, setIsLinked] = useState(false);

    const onLink = () => {
        // check if it already exists, if so retrieve the interaction and emit link event.

    }

    const onUnlink = () => {

    }

    const buttons = isLinked ?
        <Button
            onClick={onLink}
            leftIcon={<IconLink/>} variant='white'>Link</Button>
        :
        <Button
            onClick={onUnlink}
            leftIcon={<IconLinkOff/>} variant='white'>Unlink</Button>;
    return (
        <>
        </>);
}
