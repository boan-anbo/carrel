import './PageSection.css'
import {ReactNode} from "react";

export const PageSection = (props: {
    [x: string]: ReactNode
    sectionTitle: string,
}) => {
    return (
        <div className={'page-section'}>
            <div className={'page-section-title'}>
                {props.sectionTitle}
            </div>

            <div className={'page-section-content'}>
                {props.children}
            </div>
        </div>
    )
}
