import './ActionItem.css'
// for an action item
import {ReactElement} from "react";

export const ActionItem = (props: {
    description: string,
    actions: ReactElement,
}) => {
    return (
        <div className={'action-item-container'}>
            <div className={'action-item-description'}>
                {props.description}
            </div>
            <div className={'action-item-actions'}>
                {props.actions}
            </div>
        </div>
    )
}
