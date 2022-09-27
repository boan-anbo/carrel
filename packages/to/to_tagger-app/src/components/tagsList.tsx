import {TagItem} from "./tagItem";
import {Tag} from "../carrel_server_client/carrel/common/tag/v1/tag_v1_pb";

export function TagsList(props: { tags: Tag[] | undefined }) {
    const tagItems = props.tags?.map((tag, index) => {
        return <TagItem index={index} key={index} tag={tag}/>
    });
    return <div className={'flex space-x-4 p-4'}>
        {tagItems}

    </div>;
}
