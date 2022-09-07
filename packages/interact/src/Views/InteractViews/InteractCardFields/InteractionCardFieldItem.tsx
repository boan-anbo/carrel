import {Interaction} from "../../../clients/grl-client/interact_db_client";

export function InteractionCardFieldItem(props: {
    fieldValue: string | undefined | null;
    interaction: Interaction,
    label: string,
    icon: JSX.Element,
    showLabel?: boolean,
    hideWhenNoValue?: boolean
}) {

    const shouldShow = props.hideWhenNoValue ? props.fieldValue !== '' : true;

    return <div>
        {shouldShow && <div className={'flex space-x-2 justify-items-center content-center'}>
            <div className={'my-auto'}>
                {props.icon}
            </div>

            <div>
                {props.showLabel &&
                    <span>{props.label}</span>


                }
            </div>
            <div className={'pretty-label-font'}>
                {props.fieldValue ? <span>{props.fieldValue}</span> : <span className={'text-gray-300 font-bold'}>No value</span>}
            </div>
        </div> }
    </div>
}

// default props
InteractionCardFieldItem.defaultProps = {
    showLabel: false,
    hideWhenNoValue: true
}
