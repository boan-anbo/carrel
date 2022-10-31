import {CarrelWriter} from "../../../domains/core/components/CarrelWriter/CarrelWriter";
import {ViewId} from "./view-id";
import {ArchiveList} from "../../../domains/cabinet/pages/cabinet_archives/ArchiveList";
import {TagFireflies} from "../../../domains/core/components/TagFireflies";
import {InspectorBlock} from "../../../domains/core/components/InspectorBlock";
import ArchiveFiles from "../../../domains/cabinet/pages/cabinet_archives/ArchiveFiles";

export const getViewById = (viewId: ViewId) => {
    switch (viewId) {
        case ViewId.CORE_TAG_TREE:
            break;
        case ViewId.ARCHIVE_LIST:
            return <ArchiveList/>;
        case ViewId.CARD_BLOCK:
            return <TagFireflies/>;
        case ViewId.INSPECTOR_BLOCK:
            return <InspectorBlock/>;
        case ViewId.CORE_TAG_FIREFLIES:
            return <TagFireflies/>;
        case ViewId.ARCHIVE_FILES:
            return <ArchiveFiles/>;
        case ViewId.CARREL_WRITER:
            return <CarrelWriter/>;
        case ViewId.EMPTY:
            return <>Empty page</>;
        default:
            return <div>View not found</div>;
    }
};
