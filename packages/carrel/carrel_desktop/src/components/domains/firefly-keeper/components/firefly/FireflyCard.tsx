import {Firefly} from "../../../../../carrel_server_client/carrel/common/firefly/v1/firefly_v1_pb";
import './FireflyCard.css';

export const FireflyCard = (props: { firefly: Firefly }) => {

    return (
        <>
            <div className={'firefly-container'}>
                <div className={'firefly-header'}>
                    {props.firefly.title}
                </div>
                <div className={'firefly-body'}>
                    <div className={'firefly-context'}>
                        {props.firefly.snippet?.context?.context}
                    </div>
                </div>
                <div className={'firefly-footer'}>

                    {props.firefly.snippet?.file?.fileFullPath}
                </div>
            </div>
        </>
    )
}
