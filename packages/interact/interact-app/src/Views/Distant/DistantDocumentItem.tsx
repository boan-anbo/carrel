import {Passage} from "../../BackEnd/distant_api";
import {FiFile} from "react-icons/all";
import './DistantDocumentItem.css'
import {DistantPassageText} from "./DistantPassageText";
import {Group, Paper, Stack, Title, Button, Text} from '@mantine/core';
import {IconArrowDown} from "@tabler/icons";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export function DistantDocumentView(props: { passage: Passage, index: number, onTextSelected?: (text: string) => void }) {
    // on text selected callback
    const selectedPassage = useSelector((state: RootState) => state.explorerstate.selectedInputPassage);

    const {passage, index} = props;
    return (

        <Paper shadow={'md'} withBorder my={8} p={'md'} onMouseDown={(e: any) => e.stopPropagation()} className={passage.uuid === selectedPassage?.uuid ? 'bg-yellow-300' : 'bg-gray-50 bg-opacity-50'}

        >

            <Paper shadow={'xs'}  p={'md'} className='flex text-xs bg-gray-100 bg-opacity-50 pb-2'>
                <Text weight={'bold'}>{index}</Text>


                <Text pl={4} variant={'link'} align={'left'}>
                    {passage.description}
                </Text>
                <Text color={'dimmed'}>
                    {passage.location}
                </Text>
            </Paper>
            {/*Change style for em tag*/}
            <DistantPassageText passage={passage}/>
        </Paper>
    );

}
