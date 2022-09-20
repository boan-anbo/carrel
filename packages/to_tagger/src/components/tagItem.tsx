import {ToApiTag} from "../dtos/to.api.models";
import {notify} from "../utils/notify";
import {shortCuts} from "../utils/registerAll";
import {Kbd} from '@mantine/core';

export function TagItem(props: { tag: ToApiTag, index: number }) {

    function notifySendTag() {
        notify(
            'success',
        )
    }

    return <div
        style={{
            width: '120px',
        }
        }
        className='bg-amber-200 space-y-2 h-full rounded-lg p-4 drop-shadow p-2 text-centerj'
        onClick={notifySendTag}>
        <div className={'h-3/12 text-center font-bold text-opacity-40'}>
            {props.tag.key}
        </div>
        <div className={'h-3/12 text-center text-opacity-10 truncate text-xs '}>
            {props.tag.value ?? 'No value'}
        </div>
        <div className={'h-3/12 text-xs truncate text-center'}>
            {props.tag.tag_string}
        </div>
        <div className={'flex h-3/12 space-x-1 justify-center'}>
            <Kbd>⌃⇧⌥ </Kbd>
            <Kbd>+</Kbd>
            <Kbd>{shortCuts[props.index] ? shortCuts[props.index].split('+').pop() : ''}</Kbd>
        </div>
    </div>;
}
