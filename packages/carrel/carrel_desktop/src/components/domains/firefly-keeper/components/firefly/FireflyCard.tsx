import {Tag} from "../../../../../carrel_server_client/carrel/common/tag/v1/tag_v1_pb";
import {Firefly} from "../../../../../carrel_server_client/carrel/common/firefly/v1/firefly_v1_pb";

export const Firefly = (props: { firefly: Firefly}) => {

    return (
        <div className={'firefly-container'}>
            <div className={'firefly-header'}>
                {props.tag.key}
            </div>
            <div className={'firefly-body'}>
                {props.tag.value}
            </div>
            <div className={'firefly-footer'}>
                {props.tag.snippet?.snippet}
            </div>
        </div>
    )
}
