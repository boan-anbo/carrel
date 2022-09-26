import './ValueFieldDisplay.css'
// for an action item
import {ReactElement} from "react";

export const ValueFIeldDisplay = (props: {
    field: string,
    value: string,
}) => {
    return (
        <div  className={'field-value-container'}>
            <div className={'field'}>
                {props.field}
            </div>
            <div className={'value'}>
                {props.value}
            </div>
        </div>
    )
}
