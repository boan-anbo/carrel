import {ToApiTag} from "../dtos/to.api.models";
import {TagItem} from "./tagItem";

export function TagsList(props: { tags: ToApiTag[] | undefined }) {
    const tagItems = props.tags?.map((tag, index) => {
        return <TagItem index={index} key={index} tag={tag}/>
    });
    return <div className={'flex space-x-4 p-4'}>
        {tagItems}

    </div>;
}
