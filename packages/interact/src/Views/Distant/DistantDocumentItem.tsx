import {Passage} from "../../BackEnd/clients/distant_api";
import {FiFile} from "react-icons/all";
import './DistantDocumentItem.css'
import {DistantPassageText} from "./DistantPassageText";

export function DistantDocumentView(props: { passage: Passage, index: number, onTextSelected?: (text: string) => void }) {
    // on text selected callback

    const {passage, index} = props;
    return (

        <div onMouseDown={e => e.stopPropagation()} className={'p-4 rounded bg-red-100 drop-shadow m-2'}>

            <div>
                <div className='flex text-xs pb-2'>
                    <div className={'text-yellow-700 drop-shadow text-lg font-bold mr-2'}>{index + 1}</div>

                    <div>
                        <FiFile className={' inline-block mr-2'}/>
                        {passage.description}
                        <span className={''}>
                        {', ' + passage.location}
                            </span>
                    </div>
                </div>
                {/*Change style for em tag*/}
                <DistantPassageText passage={passage}/>
            </div>
        </div>
    );

}
